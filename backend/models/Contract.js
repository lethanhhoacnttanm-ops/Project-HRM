import mongoose from 'mongoose';

const ContractSchema = new mongoose.Schema(
  {
    contractCode: { 
        type: String, 
        required: true, 
        unique: true 
    }, 
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'employees', 
        required: true 
    },
    type: { 
      type: String, 
      enum: ['Fulltime', 'Parttime', 'Probation'], 
      required: true 
    }, 
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date
    }, 
    salary: { 
        type: Number, 
        required: true 
    },
    status: { 
      type: String, 
      enum: ['active', 'pending', 'expired', 'cancelled'], 
      default: 'active' 
    }
  },
  { timestamps: true }
);

const ContractModel = mongoose.model('contracts', ContractSchema);

export default ContractModel