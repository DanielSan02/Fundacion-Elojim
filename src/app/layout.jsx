"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={`${geistSans.variable} ${geistMono.variable} h-full`}>
        <SessionProvider>
          {/* <NavBar/> */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
