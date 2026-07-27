import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    code: { 
        type: String,
        required: true,
        unique: true 
    }, 
    description: { 
        type: String 
    },
    manager: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'employees' 
    }, 
  },
  { timestamps: true }
);

const DepartmentModel = mongoose.model('departments', DepartmentSchema);

export default DepartmentModel