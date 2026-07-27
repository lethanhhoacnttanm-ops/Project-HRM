import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    employeeCode: { 
      type: String, 
      required: true, 
      unique: true 
    }, 
    fullName: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    phone: { 
      type: String 
    },
    avatar: { 
      type: String, 
      default: '' 
    },
    gender: { 
      type: String, 
      enum: ['Nam', 'Nữ', 'Khác'], 
      default: 'Nam' 
    },
    dateOfBirth: { 
      type: Date, 
      required: true 
    },
    identityCard: { 
      type: String,
      required: true, 
      unique: true 
    },
    department: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'departments' 
    },
    status: { 
      type: String, 
      enum: ['active', 'leave', 'resigned'], 
      default: 'active' 
    }, 
    startDate: { 
      type: Date, 
      default: Date.now 
    },
    role: { 
      type: String, 
      enum: ['ADMIN', 'EMPLOYEE'], 
      default: 'EMPLOYEE' 
    },
    password: { 
      type: String, 
      required: true, 
      select: false 
    },
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.model('employees', EmployeeSchema);

export default EmployeeModel;