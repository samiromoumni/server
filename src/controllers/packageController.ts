import { Request, Response } from 'express'
import Package from '../models/Package.js'
import cloudinary from '../config/cloudinary.js'
import { Readable } from 'stream'

export const getPackages = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      destination,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      availability,
    } = req.query

    const filter: any = {}

    if (destination) {
      filter.destination = { $regex: destination, $options: 'i' }
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    if (minDuration || maxDuration) {
      filter.duration = {}
      if (minDuration) filter.duration.$gte = Number(minDuration)
      if (maxDuration) filter.duration.$lte = Number(maxDuration)
    }

    if (availability !== undefined) {
      filter.availability = availability === 'true'
    }

    const packages = await Package.find(filter).sort({ createdAt: -1 })
    res.json(packages)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error })
  }
}

export const getPackageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const packageData = await Package.findById(req.params.id)
    if (!packageData) {
      res.status(404).json({ message: 'Package not found' })
      return
    }
    res.json(packageData)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching package', error })
  }
}

export const createPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const packageData = await Package.create(req.body)
    res.status(201).json(packageData)
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating package', error: error.message })
  }
}

export const updatePackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const packageData = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!packageData) {
      res.status(404).json({ message: 'Package not found' })
      return
    }
    res.json(packageData)
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating package', error: error.message })
  }
}

export const deletePackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const packageData = await Package.findByIdAndDelete(req.params.id)
    if (!packageData) {
      res.status(404).json({ message: 'Package not found' })
      return
    }
    res.json({ message: 'Package deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package', error })
  }
}

export const uploadPackageImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No image provided' })
      return
    }

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      res.status(500).json({ 
        message: 'Cloudinary n\'est pas configuré. Veuillez configurer CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET dans le fichier .env' 
      })
      return
    }

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'reliqua-travel/packages',
        transformation: [{ width: 1920, height: 1080, crop: 'limit' }],
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          res.status(500).json({ 
            message: 'Erreur lors de l\'upload vers Cloudinary', 
            error: error.message || 'Vérifiez votre configuration Cloudinary' 
          })
          return
        }

        if (!result) {
          res.status(500).json({ message: 'Erreur lors de l\'upload de l\'image' })
          return
        }

        res.status(200).json({ url: result.secure_url })
      }
    )

    // Convert buffer to stream
    const bufferStream = new Readable()
    bufferStream.push(req.file.buffer)
    bufferStream.push(null)
    bufferStream.pipe(uploadStream)
  } catch (error: any) {
    console.error('Upload package image error:', error)
    res.status(400).json({ message: 'Erreur lors de l\'upload de l\'image', error: error.message })
  }
}

