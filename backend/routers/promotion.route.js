import express from 'express';
import promotionController from '../controllers/promotion.controller.js';
import { handleValidationPromotion, validateCreatePromotion, handlelogicUpdated, validationValueUpdatedPromotion } from '../middleware/promotion.validator.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', verifyToken, checkRole('ADMIN'), promotionController.getAllPromotion);

router.post(
  '/',
  verifyToken,                                
  checkRole('ADMIN'),       
  validateCreatePromotion,
  handleValidationPromotion,                    
  promotionController.createPromotion             
);

router.put('/:id/status', verifyToken, checkRole('ADMIN'), validationValueUpdatedPromotion,  handlelogicUpdated, promotionController.updateStatus);

export default router;