import type { Metadata } from "next";
import { AppChrome } from "@/components/AppChrome";
import "./globals.css";

function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: "Product design portfolio",
  description: "Product design portfolio — work experiences & projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-tv-bg text-tv-text antialiased font-sans">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
