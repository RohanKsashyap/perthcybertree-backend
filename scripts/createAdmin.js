import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/perthcybertree';

async function createAdmin() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const username = 'roy282227@gmail.com';
  const password = '13131313SABs';
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const admin = new Admin({ username, password: hashedPassword });
  await admin.save();
  console.log('Admin created successfully');
  process.exit(0);
}

createAdmin().catch(err => {
  console.error(err);
  process.exit(1);
}); 