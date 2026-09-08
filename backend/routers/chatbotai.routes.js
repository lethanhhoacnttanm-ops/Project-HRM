import express from 'express';
import ChatbotAiController from '../controllers/chatbot.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/ai/chat', verifyToken, checkRole('ADMIN'), ChatbotAiController.handleAIChatAgent);

export default router;