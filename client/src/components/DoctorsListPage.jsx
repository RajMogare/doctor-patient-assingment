// src/components/DoctorsListPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DoctorsListPage = () => {
  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="doctor-list">
      {doctors.map((doctor) => (
        <div key={doctor._id} className="doctor-card">
          <img src={doctor.profilePicture} alt={doctor.name} className="doctor-image" />
          <h3>{doctor.name}</h3>
          <p>{doctor.specialty}</p>
          <Link to={`/consult/${doctor._id}`} className="consult-button">Consult</Link>
        </div>
      ))}
    </div>
  );
};

export default DoctorsListPage;
