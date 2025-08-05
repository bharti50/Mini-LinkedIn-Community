 // controllers/postController.js
import Post from '../models/post.js';

// Create Post
export const createPost = async (req, res) => {
  try {
    console.log(" req.user:", req.user); 
    console.log(" req.body:", req.body); 

    const newPost = new Post({
      user: req.user.id,
      username:req.body.username,  
      content: req.body.content,
      image: req.body.image || '',
    });

    const savedPost = await newPost.save();
    console.log("Saved Post:",savedPost);
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err.message);  
    res.status(500).json({ error: 'Error creating post' });
  }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username email profilePic') // userId → user
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.user.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

    post.content = req.body.content || post.content;
    post.image = req.body.image || post.image;

    const updated = await post.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating post' });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.user.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting post' });
  }
};