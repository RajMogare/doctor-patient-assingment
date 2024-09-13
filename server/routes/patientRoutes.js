import express from 'express';
import Patient from '../models/patientModel.js'; // Ensure this is the correct path to your model
const router = express.Router();

// GET /api/patients/:id
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().select('-password'); // Exclude password from the response
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
