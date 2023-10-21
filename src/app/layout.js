import { siteConfig } from "@/config/site";
import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import Script from "next/script";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  category: "technology",
  keywords: [
    "Agile",
    "Planning",
    "Poker",
    "Planning Poker",
    "Scrum Poker",
    "Estimation",
    "Timeboxing",
    "Scrum",
  ],
  authors: [
    {
      name: "khushbuT24",
      url: "https://github.com/khushbuT24",
    },
    {
      name: "ajayreddy-8374",
      url: "https://github.com/ajayreddy-8374",
    },
    {
      name: "avinashcodelabs",
      url: "https://github.com/avinashcodelabs",
    },
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.jpg`],
    creator: "@agilepokerplan",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/manifest.json`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-7Z1TDZ6CSW" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-7Z1TDZ6CSW');
        `}
      </Script>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
