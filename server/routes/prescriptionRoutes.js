import express from 'express';
import Prescription from '../models/prescriptionModel.js'; // Adjust the path to your model
const router = express.Router();

// POST /api/prescriptions
router.post('/', async (req, res) => {
    try {
        const { consultationId, care, medicines } = req.body;
        const newPrescription = new Prescription({ consultationId, care, medicines });
        await newPrescription.save();
        res.status(201).json(newPrescription);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;
