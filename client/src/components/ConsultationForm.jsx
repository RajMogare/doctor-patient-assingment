import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ConsultationForm = () => {
  const { id } = useParams();
  const [consultation, setConsultation] = useState({
    diagnosis: '',
    details: ''
  });

  const handleChange = (e) => {
    setConsultation({ ...consultation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/consultations', {
        doctor: id,
        ...consultation
      });
      alert('Consultation requested successfully!');
    } catch (error) {
      console.error('Error requesting consultation:', error);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Request Consultation</h1>
      <textarea
        name="diagnosis"
        value={consultation.diagnosis}
        onChange={handleChange}
        placeholder="Diagnosis"
        className="w-full p-2 border rounded mb-4"
        required
      />
      <textarea
        name="details"
        value={consultation.details}
        onChange={handleChange}
        placeholder="Details"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
      >
        Submit Consultation
      </button>
    </div>
  );
};

export default ConsultationForm;
