import express from 'express'
import { login, getMe } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// GET /api/auth - Show available auth endpoints
router.get('/', (_req, res) => {
  res.json({
    message: 'Authentication endpoints',
    endpoints: {
      login: 'POST /api/auth/login',
      me: 'GET /api/auth/me (requires authentication)',
    },
  })
})

router.post('/login', login)
router.get('/me', protect, getMe)

export default router




