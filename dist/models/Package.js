import mongoose, { Schema } from 'mongoose';
const PackageSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Le titre est requis'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'La description est requise'],
    },
    destination: {
        type: String,
        required: [true, 'La destination est requise'],
        trim: true,
    },
    duration: {
        type: Number,
        required: [true, 'La durée est requise'],
        min: [1, 'La durée doit être d\'au moins 1 jour'],
    },
    price: {
        type: Number,
        required: [true, 'Le prix est requis'],
        min: [0, 'Le prix doit être positif'],
    },
    currency: {
        type: String,
        required: true,
        default: 'DZD',
        enum: ['DZD', 'EUR', 'USD'],
    },
    images: {
        type: [String],
        default: [],
    },
    inclusions: {
        type: [String],
        default: [],
    },
    exclusions: {
        type: [String],
        default: [],
    },
    availability: {
        type: Boolean,
        default: true,
    },
    maxPersons: {
        type: Number,
        required: [true, 'Le nombre maximum de personnes est requis'],
        min: [1, 'Le nombre maximum de personnes doit être d\'au moins 1'],
    },
}, {
    timestamps: true,
});
export default mongoose.model('Package', PackageSchema);
//# sourceMappingURL=Package.js.map