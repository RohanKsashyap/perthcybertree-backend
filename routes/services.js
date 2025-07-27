import express from 'express';
import { addService, getServices, updateService, deleteService } from '../controllers/serviceController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


// GET /api/services
router.get('/', getServices);
// POST /api/services
router.post('/', authMiddleware,addService);
// PUT /api/services/:id
router.put('/:id',authMiddleware, updateService);
// DELETE /api/services/:id
router.delete('/:id',authMiddleware, deleteService);

export default router; 