import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profilePicture from '../../public/avatar.png';
import { useParams, useNavigate } from 'react-router-dom';

const PatientProfilePage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientAndDoctors = async () => {
      try {
        const patientResponse = await axios.get(`http://localhost:3000/api/patients/${id}`);
        setPatient(patientResponse.data);

        const doctorsResponse = await axios.get('http://localhost:3000/api/doctors');
        setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error('Error fetching patient or doctors:', error);
      }
    };

    fetchPatientAndDoctors();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Redirect to homepage
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Back
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mb-6 ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      {/* Patient Profile Section */}
      {patient && (
        <div className="profile-details mb-8 p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold mb-4">{patient.name}</h1>
          <img src={profilePicture} alt={patient.name} className="w-32 h-32 rounded-full mb-4" />
          <p className="text-lg"><strong>Email:</strong> {patient.email}</p>
          <p className="text-lg"><strong>Phone:</strong> {patient.phone}</p>
          <p className="text-lg"><strong>Age:</strong> {patient.age}</p>
          {/* Add more patient details if needed */}
        </div>
      )}

      {/* Doctors List Section */}
      <div className="doctor-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card p-4 bg-white shadow-md rounded-lg">
            <img src={profilePicture} alt={doctor.name} className="w-32 h-32 rounded-full mb-4" />
            <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
            <p className="text-lg">{doctor.specialty}</p>
            <button
              onClick={() => navigate(`/consult/${doctor._id}`)}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              Consult
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientProfilePage;
