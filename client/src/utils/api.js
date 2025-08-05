import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export const createPost = async (postData) => {
  const res = await API.post('/posts', postData);
  return res.data;
};

export const fetchPosts = async () => {
  const res = await API.get('/posts');
  return res.data;
};

export const deletePost = async (id) => {
  const res = await API.delete(`/posts/${id}`);
  return res.data;
};

export const updatePost = async (id, postData) => {
  const res = await API.put(`/posts/${id}`, postData);
  return res.data;
};