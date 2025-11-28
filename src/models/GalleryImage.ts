import mongoose, { Schema, Document } from 'mongoose'

export interface IGalleryImage extends Document {
  url: string
  title: string
  description?: string
  destination?: string
  uploadedAt: Date
  createdAt?: Date
  updatedAt?: Date
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
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
  },
  {
    timestamps: true,
  }
)

GalleryImageSchema.virtual('uploadedAt').get(function (this: IGalleryImage & { createdAt?: Date }) {
  return this.createdAt || new Date()
})

export default mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema)


