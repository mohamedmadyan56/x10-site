import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/context/LocaleContext";
import ClientLayout from "@/components/ClientLayout";

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
      <body>
        <LocaleProvider>
          <ClientLayout>{children}</ClientLayout>
        </LocaleProvider>
      </body>
    </html>
  );
}
