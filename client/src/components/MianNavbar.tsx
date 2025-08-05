'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function MainNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const linkClasses = (path: string) =>
    `px-4 py-2 rounded-md text-sm font-medium ${
      pathname === path ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
    }`;

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  return (
    <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">MiniLinkedIn</div>
        <div className="space-x-4">
          <Link href="/feed" className={linkClasses('/feed')}>
            Feed
          </Link>
          <Link href="/create-post" className={linkClasses('/create-post')}>
            Create Post
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}