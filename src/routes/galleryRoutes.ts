import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', (_req, res) => {
  res.json([]);
});

// Admin routes
router.post('/', protect, adminOnly, (_req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

router.delete('/:id', protect, adminOnly, (_req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

export default router;

