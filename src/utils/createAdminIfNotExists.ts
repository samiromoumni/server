import User from '../models/User.js'

export const createAdminIfNotExists = async (): Promise<void> => {
  try {
    const adminData = {
      username: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@reliquatravel.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin' as const,
    }

    const existingAdmin = await User.findOne({
      $or: [{ email: adminData.email }, { username: adminData.username }],
    })

    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists')
      return
    }

    const admin = await User.create(adminData)
    console.log('✅ Admin user created successfully:')
    console.log(`   Username: ${admin.username}`)
    console.log(`   Email: ${admin.email}`)
    console.log(`   Password: ${adminData.password}`)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    // Don't throw - allow server to start even if admin creation fails
  }
}

