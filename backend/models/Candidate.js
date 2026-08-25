import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema(
  {
    fullName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    
    job: {   
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'jobs', 
        required: true 
    },

    appliedPosition: {
        role: { type: String, required: true }, 
        level: { type: String, required: true }  
    },
    
    cvFileUrl: { 
        type: String, 
        required: true 
    }, 
    
    stage: { 
      type: String, 
      enum: ['new', 'interview', 'evaluating', 'offered', 'rejected'], 
      default: 'new' 
    },
    
    appliedDate: { 
        type: Date, 
        default: Date.now 
    },
    interviewNotes: { 
        type: String 
    }, 
    rating: { 
        type: Number, 
        min: 1, 
        max: 5 
    }, 
  },
  { timestamps: true }
);

const CandidateModel = mongoose.model('candidates', CandidateSchema);

export default CandidateModel