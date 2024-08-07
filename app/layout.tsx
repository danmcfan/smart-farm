import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import 'mapbox-gl/dist/mapbox-gl.css';

import Navbar from './components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Farm",
  description: "Smart Farm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
