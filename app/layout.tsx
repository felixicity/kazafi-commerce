import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
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
                  <body className={`${inter.className} antialiased`}>{children}</body>
            </html>
      );
}
