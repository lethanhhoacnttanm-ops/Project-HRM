import express from 'express';
import leaveController from '../controllers/leave.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  leaveController.getMyLeaves
);

router.post(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  leaveController.createMyLeave
);

export default router;