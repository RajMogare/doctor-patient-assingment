import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import profilePicture from '../../public/avatar.png';

const DoctorProfilePage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorAndPatients = async () => {
      try {
     
        const doctorResponse = await axios.get(`http://localhost:3000/api/doctors/${id}`);
        setDoctor(doctorResponse.data);

        
        const patientsResponse = await axios.get("http://localhost:3000/api/patients");
        setPatients(patientsResponse.data);

        // Fetch consultations for the specific doctor
        const consultationsResponse = await axios.get(`http://localhost:3000/api/consultations/doctor/${id}`);
        setConsultations(consultationsResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error.message);
        console.error("Error details:", error.response ? error.response.data : error);
      }
    };

    fetchDoctorAndPatients();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/"); // Redirect to homepage
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

      {/* Doctor Profile Section */}
      {doctor && (
        <div className="profile-details mb-8 p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold mb-4">{doctor.name}</h1>
          <img
            src={profilePicture || profilePicture} // Fallback image
            alt={doctor.name}
            className="w-32 h-32 rounded-full mb-4"
          />
          <p className="text-lg">
            <strong>Specialty:</strong> {doctor.specialty}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {doctor.email}
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> {doctor.phone}
          </p>
          <button
            onClick={() => navigate(`/prescriptions/${id}`)}
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Go to Prescriptions
          </button>
        </div>
      )}

      {/* Patients List Section */}
      <div className="patient-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {patients.map((patient) => (
    <div
      key={patient._id}
      className="patient-card p-4 bg-white shadow-md rounded-lg"
    >
      <img
        src={profilePicture || "path/to/default-avatar.png"} // Fallback image
        alt={patient.name}
        className="w-32 h-32 rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{patient.name}</h3>
      <p className="text-lg">
        <strong>Email:</strong> {patient.email}
      </p>
      <p className="text-lg">
        <strong>Phone:</strong> {patient.phone}
      </p>
      <button
        onClick={() => navigate(`/consult/${patient._id}`)} // Navigate to consultation form
        className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
      >
        Consult
      </button>
    </div>
  ))}
</div>


      {/* Consultations List Section */}
      <div className="consultation-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {consultations.map((consultation) => (
          <div
            key={consultation._id}
            className="consultation-card p-4 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-2">
              Patient: {consultation.patientName}
            </h3>
            <p className="text-lg">
              Date: {new Date(consultation.consultationDate).toLocaleDateString()}
            </p>
            <p className="text-lg">Diagnosis: {consultation.diagnosis}</p>
            <p className="text-lg">Prescription: {consultation.prescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorProfilePage;
