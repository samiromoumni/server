import mongoose, { Schema } from 'mongoose';
const GalleryImageSchema = new Schema({
    url: {
        type: String,
        required: [true, 'L\'URL de l\'image est requise'],
    },
    title: {
        type: String,
        required: [true, 'Le titre est requis'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    destination: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
GalleryImageSchema.virtual('uploadedAt').get(function () {
    return this.createdAt || new Date();
});
export default mongoose.model('GalleryImage', GalleryImageSchema);
//# sourceMappingURL=GalleryImage.js.map