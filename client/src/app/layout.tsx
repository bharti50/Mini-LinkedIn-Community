import './globals.css';
import AuthNavbar from '@/components/AuthNavbar'; 
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mini LinkedIn',
  description: 'A Mini LinkedIn-like Community App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-grey-50 text-gray-900">
        <AuthNavbar /> {/*  changed component */}
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}