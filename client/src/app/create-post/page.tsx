'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user || !JSON.parse(user).token) {
      router.push('/login');
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const res = await fetch('http://localhost:5000/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`, 
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert('Post created successfully!');
      router.push('/feed');
    } else {
      alert('Failed to create post.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-32"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}