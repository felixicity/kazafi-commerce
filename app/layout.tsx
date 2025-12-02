import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunito_sans = Nunito_Sans({
      subsets: ["latin"],
});

export const metadata: Metadata = {
      title: {
            template: "%s | Kazafi",
            default: "Kazafi",
      },
      description: "Home for the best indoor furniture",
};

export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <html lang="en">
                  <body className={`${nunito_sans.className} antialiased`}>{children}</body>
            </html>
      );
}
