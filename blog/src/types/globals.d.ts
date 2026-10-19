// Google's tag and consent functions, set up by the inline script in src/app/layout.tsx.
export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
