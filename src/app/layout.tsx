import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { JsonLd } from "@/components/json-ld/JsonLd";
import { AD_CLIENT, SITE_DESCRIPTION, SITE_NAME } from "@/utils/constants";
import { organizationJsonLd, siteUrl, websiteJsonLd } from "@/utils/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} - ${SITE_DESCRIPTION}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Glaj News publishes politics, sport, business, entertainment, and eyewitness stories from Nigeria and abroad.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: siteUrl() }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "news",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl(),
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_DESCRIPTION}`,
    description: "Politics, sport, business, entertainment, and eyewitness news from Glaj News.",
    images: [{ url: "/image/logo.svg", alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ${SITE_DESCRIPTION}`,
    description: "Politics, sport, business, entertainment, and eyewitness news from Glaj News.",
    images: ["/image/logo.svg"],
  },
  icons: { icon: "/image/logo.svg", apple: "/image/logo.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`} crossOrigin="anonymous" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
