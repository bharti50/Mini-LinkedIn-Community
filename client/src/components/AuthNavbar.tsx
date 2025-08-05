'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthNavbar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `px-4 py-2 rounded-md text-sm font-medium ${
      pathname === path ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">MiniLinkedIn</div>
        <div className="space-x-4">
          <Link href="/" className={linkClasses('/')}>
            Home
          </Link>
          <Link href="/auth/login" className={linkClasses('/auth/login')}>
            Login
          </Link>
          <Link href="/auth/register" className={linkClasses('/auth/register')}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}