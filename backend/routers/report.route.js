import express from 'express';
import reportController from '../controllers/report.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  reportController.getMyReport
);

export default router;