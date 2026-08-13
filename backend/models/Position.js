import mongoose from 'mongoose';

const positionSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  }, 

  code: { 
    type: String, 
    required: true, 
    uppercase: true,
    unique: true 
  }, 

  description: { 
    type: String 
  },

  departmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'departments', 
    required: true 
  },

    allowedLevels: [{
    type: String,
    enum: ['Intern', 'Fresher', 'Junior', 'Middle', 'Senior', 'Lead', 'Principal'],
    default: ['Intern']
  }],

  status: { 
    type: String, 
    enum: ['ACTIVE', 'INACTIVE'], 
    default: 'ACTIVE' 
  }
}, { 
  timestamps: true 
});

const PositionModel = mongoose.model('positions', positionSchema);

export default PositionModel;