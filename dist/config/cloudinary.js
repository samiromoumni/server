import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
// Ensure dotenv is loaded
dotenv.config();
// Configure Cloudinary with environment variables
const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};
// Validate configuration
if (!config.cloud_name || !config.api_key || !config.api_secret) {
    console.warn('⚠️  Cloudinary credentials are missing. Image uploads will not work.');
    console.warn('   Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env');
}
else {
    cloudinary.config(config);
    console.log('✅ Cloudinary configured successfully');
}
export default cloudinary;
//# sourceMappingURL=cloudinary.js.map