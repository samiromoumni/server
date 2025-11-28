import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
  packageId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  numberOfPersons: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  createdAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    packageId: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    numberOfPersons: {
      type: Number,
      required: true,
      min: 1,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    specialRequests: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IReservation>('Reservation', ReservationSchema);


