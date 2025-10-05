import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Store",
  description: "Generated my store app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        {children}
      </body>
    </html>
  );
}
