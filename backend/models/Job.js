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
    client: { 
        type: String, 
        default: '' 
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'departments' 
    },
    
    budget: { 
        type: String, 
        required: true 
    },
    deadline: { 
        type: Date, 
        required: true 
    },
    priority: {
        type: String,
        enum: ['Thấp', 'Trung bình', 'Cao', 'Khẩn cấp'],
        default: 'Trung bình'
    },
    
    positions: [
      {
        role: { type: String, required: true },    
        level: { 
          type: String, 
          enum: ['Fresher', 'Junior', 'Middle', 'Senior', 'Lead'],
          default: 'Junior' 
        }, 
        slots: { type: Number, required: true, min: 1 } 
      }
    ],

    techStack: [
      { type: String } 
    ],

    location: { 
        type: String, 
        default: 'Từ xa' 
    }, 
    type: { 
        type: String, 
        default: 'Toàn thời gian'
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

const JobModel = mongoose.models.jobs || mongoose.model('jobs', JobSchema);

export default JobModel;