import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Product design portfolio",
  description: "Product design portfolio — work experiences & projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <body className="min-h-screen bg-black text-neutral-200 antialiased font-sans pt-20">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
