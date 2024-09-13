// routes/doctorRoutes.js
import express from 'express';
import Doctor from '../models/doctorModel.js';

const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find().select('-password'); // Exclude password from the response
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ msg: 'doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
