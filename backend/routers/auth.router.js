import express from 'express';
import authController from '../controllers/auth.controller.js';
import { validateRegisterRules, handleValidation } from '../middleware/validateRegister.middleware.js';

const router = express.Router();

router.post('/register', validateRegisterRules, handleValidation, authController.register);

export default router;