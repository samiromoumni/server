import { Request, Response } from 'express'
import Reservation from '../models/Reservation.js'
import Package from '../models/Package.js'
import { sendReservationConfirmation } from '../utils/email.js'

export const createReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const packageData = await Package.findById(req.body.packageId)
    if (!packageData) {
      res.status(404).json({ message: 'Package not found' })
      return
    }

    if (!packageData.availability) {
      res.status(400).json({ message: 'This package is no longer available' })
      return
    }

    if (req.body.numberOfPersons > packageData.maxPersons) {
      res.status(400).json({ message: `Maximum ${packageData.maxPersons} people allowed` })
      return
    }

    // Handle fullName: split into firstName and lastName
    let firstName = req.body.firstName || ''
    let lastName = req.body.lastName || ''
    
    if (req.body.fullName && !firstName && !lastName) {
      const nameParts = req.body.fullName.trim().split(' ')
      firstName = nameParts[0] || ''
      lastName = nameParts.slice(1).join(' ') || nameParts[0] || ''
    }

    // Handle message field (can be message or specialRequests)
    const specialRequests = req.body.message || req.body.specialRequests || ''

    const totalPrice = packageData.price * req.body.numberOfPersons

    const reservation = await Reservation.create({
      packageId: req.body.packageId,
      firstName,
      lastName,
      email: req.body.email,
      phone: req.body.phone,
      numberOfPersons: req.body.numberOfPersons,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      totalPrice,
      specialRequests,
    })

    // Populate package for email
    await reservation.populate('packageId')

    // Send confirmation email
    try {
      await sendReservationConfirmation(req.body.email, {
        firstName,
        lastName,
        packageTitle: packageData.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        numberOfPersons: req.body.numberOfPersons,
        totalPrice,
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Don't fail the reservation if email fails
    }

    res.status(201).json(reservation)
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating reservation', error: error.message })
  }
}

export const getReservations = async (_req: Request, res: Response): Promise<void> => {
  try {
    const reservations = await Reservation.find()
      .populate('packageId')
      .sort({ createdAt: -1 })
    res.json(reservations)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error })
  }
}

export const getReservationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('packageId')
    if (!reservation) {
      res.status(404).json({ message: 'Reservation not found' })
      return
    }
    res.json(reservation)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservation', error })
  }
}

export const updateReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    // Handle fullName if provided
    if (req.body.fullName && !req.body.firstName && !req.body.lastName) {
      const nameParts = req.body.fullName.trim().split(' ')
      req.body.firstName = nameParts[0] || ''
      req.body.lastName = nameParts.slice(1).join(' ') || nameParts[0] || ''
    }

    // Handle message field
    if (req.body.message && !req.body.specialRequests) {
      req.body.specialRequests = req.body.message
    }

    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('packageId')
    if (!reservation) {
      res.status(404).json({ message: 'Reservation not found' })
      return
    }
    res.json(reservation)
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating reservation', error: error.message })
  }
}

export const deleteReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id)
    if (!reservation) {
      res.status(404).json({ message: 'Reservation not found' })
      return
    }
    res.json({ message: 'Reservation deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting reservation', error: error.message })
  }
}

