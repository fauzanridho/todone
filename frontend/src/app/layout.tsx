import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReduxProvider } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TodoNe! - Aplikasi Manajemen Tugas',
  description: 'Aplikasi todo sederhana dengan Next.js dan Redux',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}