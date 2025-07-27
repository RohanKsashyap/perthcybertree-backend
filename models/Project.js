import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  // Add more fields as needed
});

export default mongoose.model('Project', projectSchema); 