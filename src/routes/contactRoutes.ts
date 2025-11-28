import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public route - create contact message
router.post('/', (_req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// Admin routes
router.get('/', protect, adminOnly, (_req, res) => {
  res.json([]);
});

export default router;

