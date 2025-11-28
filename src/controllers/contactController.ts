import { Request, Response } from 'express'
import ContactMessage from '../models/ContactMessage.js'
import { sendEmail } from '../utils/email.js'
import { AuthRequest } from '../middleware/auth.js'

export const sendContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, message } = req.body

    // Validation
    if (!name || !email || !subject || !message) {
      res.status(400).json({ message: 'Name, email, subject, and message are required' })
      return
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message,
    })

    // Send notification email to admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER
      if (adminEmail) {
        await sendEmail(
          adminEmail,
          `New Contact Message: ${subject}`,
          `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        )
      }
    } catch (emailError) {
      console.error('Error sending notification email:', emailError)
      // Don't fail the contact message if email fails
    }

    res.status(201).json({ message: 'Message sent successfully', contactMessage })
  } catch (error: any) {
    res.status(400).json({ message: 'Error sending message', error: error.message })
  }
}

export const getContactMessages = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching contact messages', error: error.message })
  }
}

export const getContactMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const message = await ContactMessage.findById(req.params.id)
    if (!message) {
      res.status(404).json({ message: 'Contact message not found' })
      return
    }
    res.json(message)
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching contact message', error: error.message })
  }
}

export const updateContactMessageStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body
    if (!['new', 'read', 'replied'].includes(status)) {
      res.status(400).json({ message: 'Invalid status. Must be: new, read, or replied' })
      return
    }

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!message) {
      res.status(404).json({ message: 'Contact message not found' })
      return
    }

    res.json(message)
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating contact message', error: error.message })
  }
}

export const deleteContactMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id)
    if (!message) {
      res.status(404).json({ message: 'Contact message not found' })
      return
    }
    res.json({ message: 'Contact message deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting contact message', error: error.message })
  }
}

