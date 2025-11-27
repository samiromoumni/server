import express from 'express'
import {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
} from '../controllers/galleryController.js'
import { protect, adminOnly } from '../middleware/auth.js'
import { upload, handleMulterError } from '../middleware/upload.js'

const router = express.Router()

router.get('/', getGalleryImages)
router.post('/', protect, adminOnly, upload.single('image'), handleMulterError, uploadGalleryImage)
router.delete('/:id', protect, adminOnly, deleteGalleryImage)

export default router


