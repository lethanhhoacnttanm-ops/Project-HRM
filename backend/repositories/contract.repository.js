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
  }
};