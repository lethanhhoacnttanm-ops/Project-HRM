import express from 'express';
import jobController from '../controllers/job.controller.js';
import candidateController from '../controllers/candidate.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', verifyToken, checkRole("EMPLOYEE", "ADMIN"), candidateController.getCandidatesByJob);
router.get('/all-no-pagination', verifyToken, checkRole("ADMIN"), candidateController.getAllCandidatesNoPagination);

router.post('/apply', verifyToken, checkRole("EMPLOYEE"), candidateController.applyJob);

router.put('/:id/stage', verifyToken, checkRole("ADMIN"), candidateController.updateStage);
router.get('/my-applications', verifyToken, checkRole("ADMIN"), candidateController.getMyApplications);

// router.put('/:id/status', verifyToken, checkRole('ADMIN'), validationValueUpdatedPromotion,  handlelogicUpdated, promotionController.updateStatus);

export default router;