// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import postRoutes from './routes/post.js';
import authRoutes from './routes/auth.js'; 

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// Default route to test API status
app.get('/', (req, res) => {
  res.send('API is working');
});

// Mount both routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes); 

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  })
  .catch((err) => console.error(err));