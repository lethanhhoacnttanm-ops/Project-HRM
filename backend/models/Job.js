import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    jobCode: { 
        type: String, 
        required: true, 
        unique: true 
    }, 
    title: { 
        type: String, 
        required: true 
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'departments' 
    },
    
    location: { 
        type: String, 
        default: 'Từ xa' 
    }, 
    type: { 
        type: String, 
        default: 'Toàn thời gian'
    }, 
    salaryRange: { 
        type: String 
    }, 
    
    requirements: [
        { type: String }
    ], 
    description: { type: String },
    
    status: { 
      type: String, 
      enum: ['active', 'paused', 'closed'], 
      default: 'active' 
    }, 
    
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'employees' },
  },
  { timestamps: true }
);

const JobModel = mongoose.model('jobs', JobSchema);

export default JobModel