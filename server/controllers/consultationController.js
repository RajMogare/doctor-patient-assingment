import Consultation from '../models/consultationModel.js';

export const addConsultation = async (req, res) => {
  try {
    const { doctor, patient, diagnosis, prescription } = req.body;

    // Validate required fields
    if (!doctor || !patient || !diagnosis) {
      return res.status(400).json({ error: 'Doctor, patient, and diagnosis are required' });
    }

    const consultation = new Consultation({
      doctor,
      patient,
      diagnosis,
      prescription
    });

    await consultation.save();
    res.status(201).json({ msg: 'Consultation added successfully', consultation });
  } catch (error) {
    console.error('Error adding consultation:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().populate('doctor').populate('patient'); // Populate references if needed
    res.json(consultations);
  } catch (error) {
    console.error('Error getting consultations:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
