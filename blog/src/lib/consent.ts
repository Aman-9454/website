// Consent is stored on the visitor's device only. Nothing from it is sent to a server.
export const CONSENT_KEY = "asauvia-consent";
// Bump this when the cookie policy changes, so visitors are asked again.
export const CONSENT_VERSION = 1;
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export type ConsentChoice = {
  analytics: boolean;
  advertising: boolean;
  ts: number;
  v: number;
};

/** The stored choice, or null if there is none, it has expired, or the policy version changed. */
export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const choice = JSON.parse(raw) as ConsentChoice;
    if (choice.v !== CONSENT_VERSION) return null;
    if (Date.now() - choice.ts > MAX_AGE_MS) return null;
    if (typeof choice.analytics !== "boolean" || typeof choice.advertising !== "boolean") return null;
    return choice;
  } catch {
    // Private browsing or blocked storage: treat the visitor as not yet asked.
    return null;
  }
}

export function writeConsent(analytics: boolean, advertising: boolean): ConsentChoice {
  const choice: ConsentChoice = { analytics, advertising, ts: Date.now(), v: CONSENT_VERSION };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
  } catch {
    // The choice still applies for this page view even if it cannot be stored.
  }
  return choice;
}

/** Google Consent Mode: tell Google's tags what the visitor has chosen. Safe to call before gtag loads. */
export function updateGoogleConsent(choice: ConsentChoice) {
  if (typeof window.gtag !== "function") return;
  const ads = choice.advertising ? "granted" : "denied";
  window.gtag("consent", "update", {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  });
}

/** Removes the analytics cookies this site may have set, when a visitor withdraws consent. */
export function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (name && name.startsWith("_ga")) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}
