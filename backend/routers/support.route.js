import express from 'express';
import supportController from '../controllers/support.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, checkRole('EMPLOYEE', 'ADMIN'), supportController.createTicket);
router.get('/my-tickets', verifyToken, checkRole('EMPLOYEE', 'ADMIN'), supportController.getMyTickets);

router.get('/admin/all', verifyToken, checkRole('ADMIN'), supportController.getAllTickets);
router.put('/admin/:id', verifyToken, checkRole('ADMIN'), supportController.updateTicket);

export default router;