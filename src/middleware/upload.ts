import multer from 'multer'

const storage = multer.memoryStorage()

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Seules les images sont autorisées'))
    }
  },
})

// Error handler for multer
export const handleMulterError = (err: any, _req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Le fichier est trop grand (max 10MB)' })
    }
    return res.status(400).json({ message: err.message })
  }
  if (err) {
    return res.status(400).json({ message: err.message || 'Erreur lors de l\'upload du fichier' })
  }
  next()
}

