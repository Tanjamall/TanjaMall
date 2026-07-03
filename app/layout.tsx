import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { TrackingPixels } from "@/components/storefront/tracking-pixels";
import { getStoreSettings } from "@/lib/storefront/data";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "TanjaMall",
  description: "Cash-on-delivery ecommerce store for Tanger."
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getStoreSettings();

  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body>
        <TrackingPixels settings={settings} />
        {children}
      </body>
    </html>
  );
}
