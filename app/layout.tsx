import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
