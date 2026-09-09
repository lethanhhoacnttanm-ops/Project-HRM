import express from 'express';
import aiController from '../controllers/ai.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post(
  '/assist',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  authLimiter,
  aiController.assist
);

export default router;