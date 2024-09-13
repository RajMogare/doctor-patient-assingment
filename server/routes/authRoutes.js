import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Register and login routes
router.post('/register', upload.single('profilePicture'), registerUser);
router.post('/login', loginUser);

export default router;
