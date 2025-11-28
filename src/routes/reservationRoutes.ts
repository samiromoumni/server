import express from 'express';
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route - create reservation
router.post('/', createReservation);

// Admin routes - require authentication
router.get('/', authenticate, isAdmin, getReservations);
router.get('/:id', authenticate, isAdmin, getReservationById);
router.put('/:id', authenticate, isAdmin, updateReservation);
router.delete('/:id', authenticate, isAdmin, deleteReservation);

export default router;


