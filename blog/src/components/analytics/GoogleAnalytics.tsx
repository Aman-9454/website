"use client";

import Script from "next/script";
import { useConsent } from "@/components/consent/ConsentProvider";

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Loads Google Analytics only after the visitor has accepted analytics cookies.
 * Renders nothing when no measurement ID is configured, so the site is unchanged until it is set.
 */
export function GoogleAnalytics() {
  const { consent } = useConsent();
  if (!MEASUREMENT_ID || !consent?.analytics) return null;

  return (
    <>
      <Script id="ga-loader" src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.gtag('js', new Date());window.gtag('config', '${MEASUREMENT_ID}', { send_page_view: true });`}
      </Script>
    </>
  );
}
