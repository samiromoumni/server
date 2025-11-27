import GalleryImage from '../models/GalleryImage.js';
import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';
export const getGalleryImages = async (req, res) => {
    try {
        const { destination } = req.query;
        const filter = {};
        if (destination) {
            filter.destination = { $regex: destination, $options: 'i' };
        }
        const images = await GalleryImage.find(filter).sort({ createdAt: -1 });
        res.json(images);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching gallery images', error });
    }
};
export const uploadGalleryImage = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No image provided' });
            return;
        }
        // Check if Cloudinary is configured
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            res.status(500).json({
                message: 'Cloudinary n\'est pas configuré. Veuillez configurer CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET dans le fichier .env'
            });
            return;
        }
        // Upload to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream({
            folder: 'reliqua-travel/gallery',
            transformation: [{ width: 1920, height: 1080, crop: 'limit' }],
        }, async (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error);
                res.status(500).json({
                    message: 'Erreur lors de l\'upload vers Cloudinary',
                    error: error.message || 'Vérifiez votre configuration Cloudinary'
                });
                return;
            }
            if (!result) {
                res.status(500).json({ message: 'Erreur lors de l\'upload de l\'image' });
                return;
            }
            try {
                const image = await GalleryImage.create({
                    url: result.secure_url,
                    title: req.body.title || 'Image',
                    description: req.body.description,
                    destination: req.body.destination,
                });
                res.status(201).json(image);
            }
            catch (dbError) {
                console.error('Database error:', dbError);
                res.status(400).json({ message: 'Erreur lors de la sauvegarde de l\'image', error: dbError.message });
            }
        });
        // Convert buffer to stream
        const bufferStream = new Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);
        bufferStream.pipe(uploadStream);
    }
    catch (error) {
        console.error('Upload gallery image error:', error);
        res.status(400).json({ message: 'Erreur lors de l\'upload de l\'image', error: error.message });
    }
};
export const deleteGalleryImage = async (req, res) => {
    try {
        const image = await GalleryImage.findByIdAndDelete(req.params.id);
        if (!image) {
            res.status(404).json({ message: 'Image not found' });
            return;
        }
        res.json({ message: 'Image deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting image', error });
    }
};
//# sourceMappingURL=galleryController.js.map