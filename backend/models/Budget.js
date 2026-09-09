import mongoose from 'mongoose';

const CompanyBudgetSchema = new mongoose.Schema(
  {
    monthYear: { type: String, required: true, unique: true }, 
    totalAllocatedBudget: { type: Number, required: true, default: 0 }, 
    note: { type: String, default: '' }
  },
  { timestamps: true }
);

const CompanyBudgetModel = mongoose.model('company_budgets', CompanyBudgetSchema);
export default CompanyBudgetModel;