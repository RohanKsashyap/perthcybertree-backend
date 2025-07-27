import express from 'express';
import { 
  submitContact, 
  getContacts, 
  getContactById, 
  updateContact, 
  deleteContact,
  getContactStats 
} from '../controllers/contactController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public route - anyone can submit a contact form
router.post('/submit', submitContact);

// Admin routes - require authentication
router.get('/', authMiddleware, getContacts);
router.get('/stats', authMiddleware, getContactStats);
router.get('/:id', authMiddleware, getContactById);
router.put('/:id', authMiddleware, updateContact);
router.delete('/:id', authMiddleware, deleteContact);

export default router; 