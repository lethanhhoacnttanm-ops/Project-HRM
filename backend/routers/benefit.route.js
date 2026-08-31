import express from 'express';
import benefitController from '../controllers/benefit.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get(
  '/me',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  benefitController.getMyBenefits
);

router.get(
  '/me/:id',
  verifyToken,
  checkRole('EMPLOYEE', 'ADMIN'),
  benefitController.getBenefitDetail
);

router.get('/', verifyToken, checkRole('ADMIN'), benefitController.getBenefits);
router.get('/my-benefits', verifyToken, checkRole('EMPLOYEE', "ADMIN"), benefitController.getMyBenefitsNew);

router.post('/create', verifyToken, checkRole('ADMIN'), benefitController.createBenefit);

router.put('/update/:id', verifyToken, checkRole('ADMIN'), benefitController.updateBenefit);
router.post('/assign/:id', verifyToken, checkRole('ADMIN'), benefitController.assignEmployees);
router.delete('/delete/:id', verifyToken, checkRole('ADMIN') ,benefitController.deleteBenefit);

export default router;