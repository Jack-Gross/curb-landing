import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CURB — Park closer. Pay less. Skip the search.",
  description:
    "CURB is the marketplace for residential driveway parking. Find a spot by the hour or day, or list your driveway and earn passive income.",
  openGraph: {
    title: "CURB — Park closer. Pay less. Skip the search.",
    description:
      "The marketplace for residential driveway parking. Beta launching in San Luis Obispo, Summer 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
