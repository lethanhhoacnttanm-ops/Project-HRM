import express from 'express';
import performanceController from '../controllers/performance.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, checkRole("ADMIN"), performanceController.createPerformance);
router.get('/', verifyToken, checkRole("ADMIN"), performanceController.getAllPerformance);
router.get('/team-summary', verifyToken, checkRole("ADMIN"), performanceController.getTeamPerformance);
router.get(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  performanceController.getMyEvaluations
);

router.get(
  '/me/:id',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  performanceController.getMyEvaluationDetail
);

export default router;