import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const createAdminIfNotExists = async (): Promise<void> => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'reliquatravel.a@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'reliquatravel.a';

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        username: 'admin',
      });
      console.log('✅ Admin user created successfully:');
      console.log(`   Username: admin`);
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error: any) {
    console.error('❌ Error creating admin user:', error.message);
    // Don't throw - allow server to start even if admin creation fails
  }
};

