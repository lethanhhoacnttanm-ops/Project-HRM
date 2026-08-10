import ContractModel from '../models/Contract.js'; 
import EmployeeModel from '../models/Employee.js';

export const contractRepository = {
  createNewContract: async (contractData) => {
    return await ContractModel.create(contractData);
  },
    
  updateEmployeeStatus: async (employeeId, status, role) => {
    return await EmployeeModel.findByIdAndUpdate(
      employeeId, 
      { status: status, role: role }, 
      { new: true }
    );
  },

  getAllContract: async ({skip, limit}) => {

    const [totalContract, dataContract] = await Promise.all([
          ContractModel.countDocuments(),
          ContractModel.find().populate("employee").skip(skip).limit(limit).lean()
        ])
    
    return {totalContract, dataContract}
  }
};