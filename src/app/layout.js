import GlobalHeader from "@/components/header";
import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import Script from "next/script";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Agile Poker Planner",
  description:
    "Collaboratively estimate and prioritize work stories with the Agile Poker Planner app.",
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
      <body className={roboto.className}>
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}
