// routes/user.js
import express from 'express';
import { getUserById, updateUser } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// GET user profile
router.get('/:id', verifyToken, getUserById);

// PUT: Update user profile
router.put('/:id', verifyToken, updateUser);

export default router;