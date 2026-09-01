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

router.get('/', verifyToken, checkRole('EMPLOYEE', 'ADMIN'), notificationController.getAll);
router.post('/', verifyToken, checkRole('ADMIN'), notificationController.create);
router.put('/:id', verifyToken, checkRole('ADMIN'), notificationController.update);   
router.post('/:id/read', verifyToken, checkRole('EMPLOYEE', 'ADMIN'), notificationController.markAsRead);    
router.delete('/:id', verifyToken, checkRole('ADMIN'), notificationController.remove);

export default router;