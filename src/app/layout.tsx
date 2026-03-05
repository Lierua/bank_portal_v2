import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const tasaOrbiter = localFont({
  src: [
    {
      path: "./fonts/TASAOrbiter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/TASAOrbiter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/TASAOrbiter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/TASAOrbiter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-tasa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Låneklar",
  description: "Bank Portal af låneklar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
    ${geistSans.variable}
    ${geistMono.variable}
    ${tasaOrbiter.variable}
    antialiased
  `}
      >
        {children}
      </body>
    </html>
  );
}
