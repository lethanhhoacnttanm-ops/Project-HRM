import express from 'express';
import supportController from '../controllers/support.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  supportController.getMyTickets
);

router.post(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  supportController.createTicket
);

export default router;