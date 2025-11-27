import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();
const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/reliqua-travel');
        console.log('✅ Connected to MongoDB');
        const adminData = {
            username: process.env.ADMIN_USERNAME || 'admin',
            email: process.env.ADMIN_EMAIL || 'admin@reliquatravel.com',
            password: process.env.ADMIN_PASSWORD || 'admin123',
            role: 'admin',
        };
        const existingAdmin = await User.findOne({
            $or: [{ email: adminData.email }, { username: adminData.username }],
        });
        if (existingAdmin) {
            console.log('ℹ️  Admin user already exists');
            await mongoose.connection.close();
            return;
        }
        const admin = await User.create(adminData);
        console.log('✅ Admin user created successfully:');
        console.log(`   Username: ${admin.username}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Password: ${adminData.password}`);
        await mongoose.connection.close();
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error creating admin:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};
createAdmin();
//# sourceMappingURL=createAdmin.js.map