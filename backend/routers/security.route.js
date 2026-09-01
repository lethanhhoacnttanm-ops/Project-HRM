import express from 'express';
import securityController from '../controllers/security.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js'; 

const router = express.Router();

router.get('/logs', verifyToken, checkRole('ADMIN'), securityController.getAuditLogs);

export default router;