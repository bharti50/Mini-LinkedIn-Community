// routes/post.js
import express from 'express';
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from '../controllers/postController.js';

const router = express.Router();

router.post('/create', createPost);
router.get('/', getAllPosts);

router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;