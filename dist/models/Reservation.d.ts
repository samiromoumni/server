import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IReservation, {}, {}, {}, mongoose.Document<unknown, {}, IReservation, {}, {}> & IReservation & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Reservation.d.ts.map