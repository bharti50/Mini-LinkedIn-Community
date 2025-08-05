'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoggedInNavbar from '../../components/LoggedInNavbar'; 
import { createPost, fetchPosts, deletePost, updatePost } from '../../utils/api';

interface Post {
  _id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      loadPosts();
    }
  }, []);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const handlePost = async () => {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    const { token, userId } = JSON.parse(userData);

    try {
      await createPost({ userId, content: newPost, token });
      setNewPost('');
      loadPosts();
    } catch (err) {
      console.error('Post creation failed:', err);
    }
  };

  const handleDelete = async (postId: string) => {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    const { token } = JSON.parse(userData);

    try {
      await deletePost(postId, token);
      loadPosts();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPostId(post._id);
    setEditingContent(post.content);
  };

  const handleUpdate = async () => {
    const userData = localStorage.getItem('user');
    if (!userData || !editingPostId) return;

    const { token } = JSON.parse(userData);

    try {
      await updatePost(editingPostId, { content: editingContent }, token);
      setEditingPostId(null);
      setEditingContent('');
      loadPosts();
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  return (
    <div className="max-w-20xl mx-auto mt-4 p-4 bg-pink-100 min-h-screen">
      <LoggedInNavbar />

      <div className="mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full p-4 border rounded mb-2 bg-white text-black"
          rows={3}
          placeholder="What's on your mind?"
        />
        <button
          onClick={handlePost}
          className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="border rounded p-4 shadow-sm bg-white">
            {editingPostId === post._id ? (
              <>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="w-full p-2 border rounded mb-2 bg-black text-white"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
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
                <p className="text-grey-800">{post.content}</p>
                <p className="text-sm text-grey-500 mt-1">
                  Posted on: {new Date(post.createdAt).toLocaleString()}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}