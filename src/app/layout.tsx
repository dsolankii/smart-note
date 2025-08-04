// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono  = Roboto_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Smart Note-taking App',
  description: 'Write, refine, and store notes with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body
        className="min-h-screen flex flex-col
                   bg-gradient-to-br from-slate-50 to-slate-200
                   dark:from-gray-900 dark:to-gray-950 text-gray-900
                   dark:text-gray-100 transition-colors duration-300"
      >
        {/* top bar */}
        <Navbar />

        {/* give pages full width/height — no centering here */}
        <main className="flex-1 p-4">{children}</main>
      </body>
    </html>
  );
}
