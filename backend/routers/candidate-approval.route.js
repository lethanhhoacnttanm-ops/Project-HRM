import express from 'express';
import jobController from '../controllers/job.controller.js';
import candidateController from '../controllers/candidate.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/job/:jobId', candidateController.getCandidatesByJob);

router.post('/apply', candidateController.applyJob);

// router.put('/:id/status', verifyToken, checkRole('ADMIN'), validationValueUpdatedPromotion,  handlelogicUpdated, promotionController.updateStatus);

export default router;