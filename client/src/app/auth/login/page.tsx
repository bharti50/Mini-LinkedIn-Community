'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();

      localStorage.setItem('user', JSON.stringify(data.user));

      router.push('/feed');
    } else {
      const errData = await res.json();
      setError(errData.message || 'Login failed');
    }
  };

  return (
    <main className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-black text-center">
          Login
        </h1>
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</div>
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-6 p-2 border border-pink-300 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border border-pink-300 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-black py-2 rounded"
        >
          Login
        </button>
      </form>
    </main>
  );
}