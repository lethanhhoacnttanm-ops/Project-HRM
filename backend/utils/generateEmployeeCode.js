import EmployeeModel from "../models/Employee.js";
export const generateUniqueEmployeeCode = async () => {
  let isUnique = false;
  let code = '';

  while (!isUnique) {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    code = `BT-${randomNum}`;

    const existing = await EmployeeModel.findOne({ code });
    if (!existing) {
      isUnique = true;
    }
  }

  return code;
};