import express from 'express';
import authController from '../controllers/auth.controller.js';
import { validateLoginRules, handleValidationLogin } from '../middleware/validateLogin.middleware.js';
import { verifyToken } from '../middleware/auth.middleware.js';

import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', authLimiter, validateLoginRules, handleValidationLogin, authController.login);
router.get('/me', verifyToken, authController.getMe);
router.post('/logout', authLimiter, authController.logout);

export default router;