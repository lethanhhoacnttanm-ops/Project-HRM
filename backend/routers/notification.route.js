import express from 'express';
import notificationController from '../controllers/notification.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  notificationController.getMyNotifications
);

export default router;