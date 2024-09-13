// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import SignInPage from './components/SignInPage';
import PatientProfilePage from './components/PatientProfilePage'; // Import PatientProfilePage
import DoctorProfilePage from './components/DoctorProfilePage';
import ConsultationForm from './components/ConsultationForm';
import PrescriptionPage from './components/PrescriptionPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/profile/:id" element={<PatientProfilePage />} />
        <Route path="/profile/doctor/:id" element={<DoctorProfilePage />} /> {/* Add PatientProfilePage route */}
        <Route path="/consult/:id" element={<ConsultationForm />} />
        <Route path="/prescriptions/:id" element={<PrescriptionPage />} />

      </Routes>
    </Router>
  );
};

export default App;
