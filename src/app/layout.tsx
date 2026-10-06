import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import company from "@/data/company";
import { navigation } from "@/data/navigation";
import "./globals.css";

const sans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Wordmark only (header/footer logo text).
const wordmark = Cormorant_Garamond({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: "600",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  // Only small labels use it — not worth competing with the headline font for bandwidth.
  preload: false,
});

// Matches the page background so mobile browser chrome blends with the header.
export const viewport: Viewport = {
  themeColor: "#fafaf9",
};

const defaultTitle = `${company.brandName} | AI Software Development & Engineering Company`;

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(`https://${company.domain}`),
  title: {
    default: defaultTitle,
    template: `%s | ${company.brandName}`,
  },
  description: company.description,
  applicationName: company.brandName,
  authors: [{ name: company.brandName, url: `https://${company.domain}` }],
  creator: company.brandName,
  publisher: company.brandName,
  category: "technology",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  // Site-wide only — each page's own url/title/description come from pageMetadata().
  openGraph: {
    type: "website",
    siteName: company.brandName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...((googleVerification || bingVerification) && {
    verification: {
      ...(googleVerification && { google: googleVerification }),
      ...(bingVerification && { other: { "msvalidate.01": bingVerification } }),
    },
  }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${wordmark.variable} ${mono.variable}`}>
      <body className="noise-overlay flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <SkipLink />
        <Header brandName={company.brandName} navItems={navigation.primary} email={company.email} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
