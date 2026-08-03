import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    costCenter: { 
        type: String, 
        required: true 
    }, 
    icon: { 
        type: String, 
        default: '' 
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      default: null,
    },
    parentDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'departments',
      default: null,
    },
    status: { 
        type: Boolean, 
        default: true 
    },
  },
  { timestamps: true }
);

const DepartmentModel = mongoose.model('departments', DepartmentSchema);
export default DepartmentModel;