import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Assure-toi que le chemin d'import est correct selon ton projet
import QueryProvider from "../providers/QueriesProvider"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeonCrypto",
  description: "AI Powered Crypto Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* CORRECTION ICI : 
        On ajoute 'suppressHydrationWarning' pour ignorer les attributs 
        injectés par les extensions navigateur (comme ColorZilla/Grammarly).
      */}
      <body className={inter.className} suppressHydrationWarning={true}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}