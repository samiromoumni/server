import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { AuthRequest } from '../middleware/auth.js'

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  })
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password required' })
      return
    }

    const user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    const token = generateToken(user._id.toString())

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error })
  }
}

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id).select('-password')
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error })
  }
}

