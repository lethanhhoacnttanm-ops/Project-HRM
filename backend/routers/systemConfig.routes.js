import express from 'express';
import { systemConfigController } from '../controllers/systemConfig.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js'; 
const router = express.Router();


router.get('/', verifyToken, checkRole('ADMIN'), systemConfigController.getConfig);

router.post('/', verifyToken, checkRole('ADMIN'), systemConfigController.saveConfig);

export default router; 