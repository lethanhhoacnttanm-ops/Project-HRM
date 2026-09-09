import express from 'express';
import budgetController from '../controllers/budget.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/upsert', verifyToken, checkRole("ADMIN"), budgetController.upsertBudget);
router.get('/realtime-stats', verifyToken, checkRole("ADMIN"), budgetController.getRealtimeStats);

export default router;