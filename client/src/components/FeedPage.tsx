'use client';

import React from 'react';

const posts = [
  {
    id: 1,
    author: 'Bharti Nautiyal',
    content: 'Excited to join this awesome platform! ',
    createdAt: '2 hours ago',
  },
  {
    id: 2,
    author: 'Rahul',
    content: 'Exploring React + Next.js full stack development!',
    createdAt: '5 hours ago',
  },
];

export default function FeedPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Public Feed</h1>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
        >
          <h2 className="font-semibold text-lg">{post.author}</h2>
          <p className="text-gray-700 mt-2">{post.content}</p>
          <p className="text-sm text-gray-400 mt-1">{post.createdAt}</p>
        </div>
      ))}
    </div>
  );
}