import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/context/LocaleContext";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "X10 — من أول تسجيل إلى تشغيل يومي بثقة",
  description: "X10 منصة متكاملة لإدارة أعمالك",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="min-h-full antialiased bg-dark-bg text-text-light">
        <LocaleProvider>
          <ClientLayout>{children}</ClientLayout>
        </LocaleProvider>
      </body>
    </html>
  );
}
