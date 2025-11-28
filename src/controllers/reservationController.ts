import { Request, Response } from 'express';
import Reservation from '../models/Reservation';

export const createReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getReservations = async (_req: Request, res: Response): Promise<void> => {
  try {
    const reservations = await Reservation.find().populate('packageId').sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getReservationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('packageId');
    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }
    res.json(reservation);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('packageId');
    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }
    res.json(reservation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


