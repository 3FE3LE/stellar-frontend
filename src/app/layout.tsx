import type { Metadata } from "next";
import './globals.css';

import localFont from 'next/font/local';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <Link prefetch href="/">
              <h1 className="text-2xl font-bold">StellarStay Hotels</h1>
            </Link>
            <ThemeToggler />
          </header>
          <nav className="bg-blue-500 p-4 ">
            <ul className="flex space-x-4">
              <li>
                <Link
                  prefetch
                  href="/reservations/search"
                  className="text-white hover:underline"
                >
                  Search Reservations
                </Link>
              </li>
              <li>
                <Link
                  prefetch
                  href="/reservations"
                  className="text-white hover:underline"
                >
                  Reservation Status
                </Link>
              </li>
            </ul>
          </nav>
          <main className="container mx-auto p-4">
            {children}
            <Toaster />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
