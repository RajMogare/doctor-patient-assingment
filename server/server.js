import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js"; 
import doctorRoutes from "./routes/doctorRoutes.js"; // Import doctor routes
import patientRoutes from './routes/patientRoutes.js'; // Adjust the path to your routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/doctors", doctorRoutes); // Use doctor routes
app.use('/api/patients', patientRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
