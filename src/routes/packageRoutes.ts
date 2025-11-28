import express from 'express'
import {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
  uploadPackageImage,
} from '../controllers/packageController.js'
import { protect, adminOnly } from '../middleware/auth.js'
import { upload, handleMulterError } from '../middleware/upload.js'

const router = express.Router()

router.get('/', getPackages)
router.get('/:id', getPackageById)
router.post('/', protect, adminOnly, createPackage)
router.post('/upload-image', protect, adminOnly, upload.single('image'), handleMulterError, uploadPackageImage)
router.put('/:id', protect, adminOnly, updatePackage)
router.delete('/:id', protect, adminOnly, deletePackage)

export default router




