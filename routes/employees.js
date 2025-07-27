import express from 'express';
import { addEmployee, getEmployees, updateEmployee, deleteEmployee } from '../controllers/employeeController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


// GET /api/employees
router.get('/', getEmployees);
// POST /api/employees
router.post('/', authMiddleware,addEmployee);
// PUT /api/employees/:id
router.put('/:id',authMiddleware, updateEmployee);
// DELETE /api/employees/:id
router.delete('/:id',authMiddleware, deleteEmployee);

export default router; 