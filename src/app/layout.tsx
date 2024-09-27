import type { Metadata } from "next";
import './globals.css';

import localFont from 'next/font/local';

import { ThemeProvider, ThemeToggler } from '@/components';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "StellarStay Hotels",
  description: "Dynamic Pricing System for StellarStay Hotels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">StellarStay Hotels</h1>
          </header>
          <nav className="bg-blue-500 p-4 flex justify-between">
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-white hover:underline">
                  Search Reservations
                </a>
              </li>
              <li>
                <a href="/reservations" className="text-white hover:underline">
                  Reservation Status
                </a>
              </li>
            </ul>
            <ThemeToggler />
          </nav>
          <main className="container mx-auto p-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
