import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const vazir = localFont({
  src: "./fonts/Vazir-Medium.woff",
  variable: "--font-vazir",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "عطاری بوته",
  description:
    "فروش انواع گیاهان دارویی، ادویه ها>، روغن ها، عصاره ها، دمنوش ها و چای ها",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={`${vazir.variable} antialiased`}>{children}</body>
    </html>
  );
}
