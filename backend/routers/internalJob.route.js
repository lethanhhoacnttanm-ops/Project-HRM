import express from 'express';
import internalJobController from '../controllers/internalJob.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get(
  '/',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  internalJobController.getOpenJobs
);

router.get(
  '/my-applications',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  internalJobController.getMyApplications
);

router.get(
  '/:id',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  internalJobController.getJobDetail
);

router.post(
  '/apply',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  internalJobController.apply
);

export default router;