require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const seedAdmin = async () => {
  await connectDB();

  try {
    // Check if admin already exists
    const existing = await User.findOne({ email: 'admin@cep.com' });
    if (existing) {
      console.log('✅ Admin user already exists');
      process.exit(0);
    }

    // Create default admin
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@cep.com',
      password: 'admin123',
      role: 'admin',
    });

    console.log(`✅ Admin user created: ${admin.email}`);
    console.log('   Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
