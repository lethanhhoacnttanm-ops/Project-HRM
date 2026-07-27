import express from 'express';
import authController from '../controllers/auth.controller.js';
import { validateRegisterRules, handleValidationRegister } from '../middleware/validateRegister.middleware.js';
import { validateLoginRules, handleValidationLogin } from '../middleware/validateLogin.middleware.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', validateRegisterRules, handleValidationRegister, authController.register);
router.post('/login', validateLoginRules, handleValidationLogin, authController.login);
router.get('/me', protect, authController.getMe);
router.post('/logout', authController.logout);

export default router;