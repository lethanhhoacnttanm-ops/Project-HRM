import express from 'express';
import positionController from '../controllers/position.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, checkRole('ADMIN'), positionController.postNewPosition);
router.get('/', verifyToken, checkRole('ADMIN'), positionController.getAllListPosition)

export default router;