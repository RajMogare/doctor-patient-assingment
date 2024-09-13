import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  diagnosis: { type: String },
  prescription: { type: String },
  consultationDate: { type: Date, default: Date.now }
});

export default mongoose.model('Consultation', consultationSchema);
