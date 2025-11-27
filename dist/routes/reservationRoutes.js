import express from 'express';
import { createReservation, getReservations, getReservationById, updateReservation, } from '../controllers/reservationController.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = express.Router();
router.post('/', createReservation);
router.get('/', protect, adminOnly, getReservations);
router.get('/:id', protect, adminOnly, getReservationById);
router.put('/:id', protect, adminOnly, updateReservation);
export default router;
//# sourceMappingURL=reservationRoutes.js.map