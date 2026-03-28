import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zahnärzte Parkstrasse Othmarschen",
  metadataBase: new URL("https://www.zahnarzt-othmarschen.de"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <Script
          src="https://praxis-analytics.jonne-schwegmann.com/script.js"
          data-website-id="01234bb6-9bf1-430c-a7dd-2348ad6f5429"
          strategy="afterInteractive"
        />
        {/* KEIN meta-refresh hier — das ist im Root-Layout und würde ALLE Seiten betreffen! */}
      </head>
      <body
        className={`${cormorant.variable} ${workSans.variable} antialiased papier-textur`}
      >
        {children}
      </body>
    </html>
  );
}
