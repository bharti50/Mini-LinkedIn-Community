'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  _id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [userEmail, setUserEmail] = useState('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      const user = JSON.parse(userData);
      setUserEmail(user.email);
      fetchUserPosts(user.userId);
    }
  }, []);

  const fetchUserPosts = async (userId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/user/${userId}`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching user posts:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleDelete = async (postId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
      }
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const startEditing = (post: Post) => {
    setEditingPostId(post._id);
    setEditContent(post.content);
  };

  const handleUpdate = async (postId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (res.ok) {
        setEditingPostId(null);
        fetchUserPosts(posts[0].userId);
      }
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">Email:</p>
        <p className="text-gray-800 mb-2">{userEmail}</p>
      </div>

      <h2 className="text-xl font-bold mb-4">My Posts</h2>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="border p-4 rounded shadow bg-white">
              {editingPostId === post._id ? (
                <>
                  <textarea
                    className="w-full p-2 border mb-2 rounded"
                    rows={3}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(post._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingPostId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-900">{post.content}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Posted on {new Date(post.createdAt).toLocaleString()}
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => startEditing(post)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}