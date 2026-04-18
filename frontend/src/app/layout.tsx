import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "SURI Beauty 수리 - Mỹ Phẩm Cao Cấp Hàn Quốc",
  description:
    "SURI 수리 - Thương hiệu mỹ phẩm cao cấp phong cách Hàn Quốc. Khám phá vẻ đẹp tự nhiên của bạn với serum, kem dưỡng, son môi và nước hoa cao cấp.",
  keywords: "mỹ phẩm, skincare, makeup, chăm sóc da, trang điểm, serum, kem dưỡng, k-beauty, hàn quốc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
