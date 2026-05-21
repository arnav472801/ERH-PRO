const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ email: 'admin@ehr.com' });

    if (adminExists) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    await User.create({
      name: 'Admin User',
      email: 'admin@ehr.com',
      password: 'password123',
      role: 'admin',
      department: 'Administration'
    });

    console.log('Admin user created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
