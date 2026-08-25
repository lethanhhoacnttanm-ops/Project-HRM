import express from 'express';
import jobController from '../controllers/job.controller.js';
import { handleValidationJob, validateCreateJob } from '../middleware/job.validator.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', verifyToken, checkRole('ADMIN'), jobController.getAllJobs);

router.post('/', verifyToken, checkRole('ADMIN'), validateCreateJob, handleValidationJob, jobController.createJob);

router.get('/:id/for-approval', verifyToken, checkRole('ADMIN'), jobController.getJobForApproval);

// router.post(
//   '/',
//   verifyToken,                                
//   checkRole('ADMIN'),       
//   validateCreatePromotion,
//   handleValidationPromotion,                    
//   promotionController.createPromotion             
// );

// router.put('/:id/status', verifyToken, checkRole('ADMIN'), validationValueUpdatedPromotion,  handlelogicUpdated, promotionController.updateStatus);

export default router;