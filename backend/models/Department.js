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
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      default: null,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE'
    },
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const DepartmentModel = mongoose.model('departments', DepartmentSchema);
export default DepartmentModel;