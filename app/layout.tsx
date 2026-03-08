import type { Metadata } from "next";
import { Inter, Caesar_Dressing } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caesarDressing = Caesar_Dressing({
  variable: "--font-title",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPIKE — Hit your mark.",
  description: "A daily guessing game for show people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${caesarDressing.variable} font-sans antialiased bg-[#0a0a0c] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
