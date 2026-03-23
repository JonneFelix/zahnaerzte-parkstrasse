import "./globals.css";

/* Minimales Root-Layout — nur für die Redirect-Seite auf /
   Das eigentliche Layout mit Header/Footer ist in [locale]/layout.tsx */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <meta httpEquiv="refresh" content="0;url=/de/" />
      </head>
      <body>{children}</body>
    </html>
  );
}
