import type { Metadata } from "next";
import "./globals.css";

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: "Bluecurity",
  description: "An educational security app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
