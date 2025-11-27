import mongoose, { Schema } from 'mongoose';
const ContactMessageSchema = new Schema({
    name: {
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
        trim: true,
    },
    subject: {
        type: String,
        required: [true, 'Le sujet est requis'],
        trim: true,
    },
    message: {
        type: String,
        required: [true, 'Le message est requis'],
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied'],
        default: 'new',
    },
}, {
    timestamps: true,
});
export default mongoose.model('ContactMessage', ContactMessageSchema);
//# sourceMappingURL=ContactMessage.js.map