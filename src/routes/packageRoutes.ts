import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', (_req, res) => {
  res.json([]);
});

router.get('/:id', (_req, res) => {
  res.status(404).json({ error: 'Package not found' });
});

// Admin routes
router.post('/', protect, adminOnly, (_req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

router.put('/:id', protect, adminOnly, (_req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

router.delete('/:id', protect, adminOnly, (_req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

export default router;

