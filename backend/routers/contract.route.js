import express from 'express';
import contractsController from '../controllers/contract.controller.js';
import { checkValidationResult, validateCreateContract } from '../middleware/contract.middleware.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/', verifyToken, checkRole('ADMIN'), validateCreateContract, checkValidationResult, contractsController.postNewContract);
router.get('/allContract', verifyToken, checkRole('ADMIN'), contractsController.getAllContractForTable)

export default router;