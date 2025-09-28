"use client"; // Because our provider needs to be in a client component tree

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserDataProvider } from "@/lib/hooks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// We can remove the 'export const metadata' as it's better handled
// in a server component layout, but for simplicity here it's okay.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* Basic viewport meta tag is important for PWA responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* We wrap the entire application's children with the provider */}
        <UserDataProvider>
          {children}
        </UserDataProvider>
      </body>
    </html>
  );
}
