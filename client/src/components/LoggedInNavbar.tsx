'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoggedInNavbar() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const { username } = JSON.parse(userData);
      setUsername(username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 text-white flex items-center justify-between px-6 py-3 shadow-md rounded-lg mb-6">
      <div className="text-xl font-semibold cursor-pointer" onClick={() => router.push('/feed')}>
        MiniLinkedIn
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm hidden sm:block">Hi, {username}</span>
        <button
          onClick={() => router.push('/profile')}
          className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
        >
          Profile
        </button>
        <button
          onClick={() => router.push('/create-post')}
          className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
        >
          Create Post
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}