import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kalkulator THR",
  description: "Atur anggaran berbagi kebahagiaan dengan bijak dan berkah.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kalkulator THR",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff9eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} ${notoSerif.variable} antialiased bg-surface-dim font-body text-on-surface min-h-screen flex flex-col items-center overflow-x-hidden`}
      >
        <div className="w-full max-w-md min-h-screen bg-surface flex flex-col relative shadow-2xl sm:border-x border-outline-variant/30">
          {children}
        </div>
      </body>
    </html>
  );
}
