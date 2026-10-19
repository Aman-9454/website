"use client";

import { useConsent } from "./ConsentProvider";

/** Reopens the cookie banner so a visitor can change their choice. */
export function CookieSettingsButton() {
  const { openSettings } = useConsent();
  return (
    <button
      type="button"
      onClick={openSettings}
      className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      Cookie settings
    </button>
  );
}
