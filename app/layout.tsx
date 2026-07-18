import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";

import { Header } from "@/app/components/Header";
import { JhumarDecor } from "@/app/components/JhumarDecor";
import { MobileBottomNav } from "@/app/components/MobileBottomNav";
import { SiteFooter } from "@/app/components/SiteFooter";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Antique Bharat | Preserving India's Living Heritage",
  description: "Preserving India's Living Heritage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cinzel.variable} h-full`}>
      <body className="min-h-full">
        <JhumarDecor />
        <Header />
        {children}
        <SiteFooter />
        <MobileBottomNav />
      </body>
    </html>
  );
}
