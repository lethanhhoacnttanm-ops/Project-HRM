import mongoose from 'mongoose';

const PerformanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: true,
    },
    evaluator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: true,
    },
    quarter: { type: String, required: true }, 
    outsourcingScore: { type: Number, required: true, min: 0, max: 5 },
    trainingScore: { type: Number, required: true, min: 0, max: 5 },
    feedback: { type: String, default: '' },
  },
  { timestamps: true }
);

const PerformanceModel = mongoose.model('evaluations', PerformanceSchema);
export default PerformanceModel;