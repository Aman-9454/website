import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { getSearchItems } from "@/lib/posts";
import { SiteFooter } from "@/components/SiteFooter";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CtaClickTracker } from "@/components/analytics/CtaClickTracker";
import Script from "next/script";
import { homeTitle, SITE_URL, site } from "@/lib/site";
import "./globals.css";

const sans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Wordmark only (header/footer logo text), as on the main site.
const wordmark = Cormorant_Garamond({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: "600",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: false,
});

// Matches the page background so mobile browser chrome blends with the header.
export const viewport: Viewport = {
  themeColor: "#fafaf9",
};

// AdSense account for the site verification tag. Set in .env.local or the host's environment.
const adsenseAccount = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

// Search Console and Bing Webmaster verification tokens. Each is omitted from the page until its variable is set.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeTitle,
    template: `%s | ${site.blogName}`,
  },
  description: site.description,
  applicationName: site.blogName,
  authors: [{ name: site.brandName, url: site.mainUrl }],
  publisher: site.brandName,
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    siteName: site.blogName,
    locale: "en_US",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(adsenseAccount && { other: { "google-adsense-account": adsenseAccount } }),
  ...((googleVerification || bingVerification) && {
    verification: {
      ...(googleVerification && { google: googleVerification }),
      ...(bingVerification && { other: { "msvalidate.01": bingVerification } }),
    },
  }),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${wordmark.variable} ${mono.variable}`}>
      <body className="noise-overlay flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        {/* Consent defaults must run before any Google tag, so every Google signal starts as denied. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.gtag = function gtag() { window.dataLayer.push(arguments); };
window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });`}
        </Script>
        <ConsentProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <SiteHeader searchItems={getSearchItems()} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ConsentBanner />
        <GoogleAnalytics />
        <CtaClickTracker />
        </ConsentProvider>
      </body>
    </html>
  );
}
