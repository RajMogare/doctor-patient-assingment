import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import Doctor from '../models/doctorModel.js';
import Patient from '../models/patientModel.js';

// Register User (Doctor or Patient)
export const registerUser = async (req, res) => {
    try {
        const { role, name, email, phone, password, age, specialty, yearsOfExperience } = req.body;

        // Default profile picture URL
        const defaultProfilePicture = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw30gmphsoerRnmnEAof4x9I&ust=1726313995683000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDxp_jqv4gDFQAAAAAdAAAAABAJ'; // Replace with your default avatar URL

        if (role === 'doctor') {
            const existingDoctor = await Doctor.findOne({ email });
            if (existingDoctor) {
                return res.status(400).json({ msg: 'Doctor already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const doctor = new Doctor({
                name,
                specialty,
                email,
                phone,
                yearsOfExperience,
                profilePicture: defaultProfilePicture, // Set default profile picture
                password: hashedPassword,
            });
            await doctor.save();

            const token = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            res.status(201).json({ msg: 'Doctor registered successfully', token, role: 'doctor', id: doctor._id });
        } else if (role === 'patient') {
            const existingPatient = await Patient.findOne({ email });
            if (existingPatient) {
                return res.status(400).json({ msg: 'Patient already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const patient = new Patient({
                name,
                age,
                email,
                phone,
                profilePicture: defaultProfilePicture, // Set default profile picture
                password: hashedPassword,
            });
            await patient.save();

            const token = jwt.sign({ id: patient._id, role: 'patient' }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            res.status(201).json({ msg: 'Patient registered successfully', token, role: 'patient', id: patient._id });
        } else {
            res.status(400).json({ msg: 'Invalid role selected' });
        }
    } catch (error) {
        console.error('Error during registration:', error);  // Log detailed error
        res.status(500).json({ error: error.message || 'Server error' });
    }
};

// Login User (Doctor or Patient)
export const loginUser = async (req, res) => {
    try {
        const { role, email, password } = req.body;

        if (role === 'doctor') {
            const doctor = await Doctor.findOne({ email });
            if (!doctor) {
                return res.status(400).json({ msg: 'Doctor does not exist' });
            }

            const isMatch = await bcrypt.compare(password, doctor.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            res.json({ token, role: 'doctor', msg:"Doctor login successfully", id: doctor._id });
        } else if (role === 'patient') {
            const patient = await Patient.findOne({ email });
            if (!patient) {
                return res.status(400).json({ msg: 'Patient does not exist' });
            }

            const isMatch = await bcrypt.compare(password, patient.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: patient._id, role: 'patient' }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            res.json({ token, role: 'patient'  , msg:"Patient login successfully", id: patient._id});
        } else {
            res.status(400).json({ msg: 'Invalid role selected' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};
