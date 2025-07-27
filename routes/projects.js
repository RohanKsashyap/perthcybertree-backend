import express from 'express';
import { addProject, getProjects, updateProject, deleteProject } from '../controllers/projectController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


// GET /api/projects
router.get('/', getProjects);
// POST /api/projects
router.post('/',authMiddleware, addProject);
// PUT /api/projects/:id
router.put('/:id',authMiddleware, updateProject);
// DELETE /api/projects/:id
router.delete('/:id',authMiddleware, deleteProject);

export default router; 