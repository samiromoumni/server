import express from 'express'
import {
  sendContactMessage,
  getContactMessages,
  getContactMessage,
  updateContactMessageStatus,
  deleteContactMessage,
} from '../controllers/contactController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// Public route - anyone can send a contact message
router.post('/', sendContactMessage)

// Admin routes - require authentication
router.get('/', protect, adminOnly, getContactMessages)
router.get('/:id', protect, adminOnly, getContactMessage)
router.patch('/:id/status', protect, adminOnly, updateContactMessageStatus)
router.delete('/:id', protect, adminOnly, deleteContactMessage)

export default router




