import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import adminRoutes from './routes/admin.js';
import employeeRoutes from './routes/employees.js';
import serviceRoutes from './routes/services.js';
import projectRoutes from './routes/projects.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/perthcybertree';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
  console.log('Mongodb connected')

      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  }); 