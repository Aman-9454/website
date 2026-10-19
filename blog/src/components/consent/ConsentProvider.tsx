"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { clearAnalyticsCookies, CONSENT_KEY, readConsent, updateGoogleConsent, writeConsent, type ConsentChoice } from "@/lib/consent";

type ConsentContextValue = {
  /** null until the visitor has chosen (or after the choice expires). */
  consent: ConsentChoice | null;
  /** True while the banner should be visible: first visit, or the visitor opened Cookie settings. */
  bannerOpen: boolean;
  save: (analytics: boolean, advertising: boolean) => void;
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);
const CHANGE_EVENT = "asauvia-consent-change";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// The raw stored string is the snapshot: it only changes when the choice changes, so React can compare it cheaply.
function getSnapshot() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const [settingsRequested, setSettingsRequested] = useState(false);

  // Parsed from the same snapshot, so it only changes when the stored choice does.
  const consent = useMemo(() => (raw === null ? null : readConsent()), [raw]);

  const save = useCallback(
    (analytics: boolean, advertising: boolean) => {
      const previous = readConsent();
      const choice = writeConsent(analytics, advertising);
      if (!analytics) clearAnalyticsCookies();
      updateGoogleConsent(choice);
      setSettingsRequested(false);
      window.dispatchEvent(new Event(CHANGE_EVENT));
      // Google's scripts have already loaded if analytics was on, so withdrawing needs a fresh page.
      if (previous?.analytics && !analytics) window.location.reload();
    },
    [],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      bannerOpen: consent === null || settingsRequested,
      save,
      openSettings: () => setSettingsRequested(true),
    }),
    [consent, settingsRequested, save],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useConsent must be used inside ConsentProvider");
  return context;
}
