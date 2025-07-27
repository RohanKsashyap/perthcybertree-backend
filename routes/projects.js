import express from 'express';
import { addProject, getProjects, updateProject, deleteProject } from '../controllers/projectController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


// GET /api/projects
router.get('/', (req, res, next) => {
  console.log('Route matched: GET /api/projects');
  next();
}, getProjects);
// POST /api/projects
router.post('/', addProject);
// PUT /api/projects/:id
router.put('/:id', updateProject);
// DELETE /api/projects/:id
router.delete('/:id', deleteProject);

export default router; 