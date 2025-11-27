import mongoose, { Schema } from 'mongoose';
const ReservationSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        ref: 'Package',
        required: [true, 'L\'ID du forfait est requis'],
    },
    firstName: {
        type: String,
        required: [true, 'Le prénom est requis'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Le nom est requis'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'L\'email est requis'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
    },
    phone: {
        type: String,
        required: [true, 'Le téléphone est requis'],
        trim: true,
    },
    numberOfPersons: {
        type: Number,
        required: [true, 'Le nombre de personnes est requis'],
        min: [1, 'Au moins 1 personne'],
    },
    startDate: {
        type: Date,
        required: [true, 'La date de départ est requise'],
    },
    endDate: {
        type: Date,
        required: [true, 'La date de retour est requise'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'Le prix total est requis'],
        min: [0, 'Le prix doit être positif'],
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
    specialRequests: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
export default mongoose.model('Reservation', ReservationSchema);
//# sourceMappingURL=Reservation.js.map