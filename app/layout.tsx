import type { Metadata } from "next";
import { Cairo, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "X10 — منصة إدارة الفروع متعددة المستأجرين",
  description: "X10 يربط فروعك، صلاحياتك، ومستخدميك في نظام واحد آمن.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} ${sora.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
