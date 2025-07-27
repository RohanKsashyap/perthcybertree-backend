import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const MONGO_URI = 'mongodb+srv://ottodev7806:13131313SABs@cluster0.29050yd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function seedAdmin() {
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
  console.log('Admin seeded successfully');
  process.exit(0);
}

seedAdmin().catch(err => {
  console.error(err);
  process.exit(1);
}); 