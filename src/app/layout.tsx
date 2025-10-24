import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScrollWrapper } from "@/components/SmoothScrollWrapper";
import { BaianoModeProvider } from "@/contexts/BaianoModeContext";
import BaianoButton from "@/components/BaianoButton";
import BaianoEffects from "@/components/BaianoEffects";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salvador Bloggers - Modelos & Influenciadores",
  description: "Conheça os principais bloggers e influenciadores de moda de Salvador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link 
          href="https://fonts.cdnfonts.com/css/pp-neue-montreal" 
          rel="stylesheet" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BaianoModeProvider>
          <SmoothScrollWrapper>
            {children}
          </SmoothScrollWrapper>
          <BaianoButton />
          <BaianoEffects />
        </BaianoModeProvider>
      </body>
    </html>
  );
}
