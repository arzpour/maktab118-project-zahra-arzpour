import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ToastifyProvider from "@/providers/toastify.provider";
import TanstackProvider from "@/providers/tanstack.provider";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/providers/redux.provider";

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
      <body className={`${vazir.variable} antialiased`}>
        <ToastifyProvider>
          <ToastContainer />
          <ReduxProvider>
            <TanstackProvider>{children}</TanstackProvider>
          </ReduxProvider>
        </ToastifyProvider>
      </body>
    </html>
  );
}
