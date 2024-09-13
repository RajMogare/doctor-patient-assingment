import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PrescriptionPage = () => {
    const { id } = useParams();
    const [consultations, setConsultations] = useState([]);
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [prescription, setPrescription] = useState({ care: '', medicines: '' });

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/consultations`);
                setConsultations(response.data);
            } catch (error) {
                console.error('Error fetching consultations:', error);
            }
        };

        fetchConsultations();
    }, []);

    const handlePrescriptionChange = (e) => {
        setPrescription({ ...prescription, [e.target.name]: e.target.value });
    };

    const handleSubmitPrescription = async () => {
        try {
            if (!selectedConsultation) {
                alert('Please select a consultation.');
                return;
            }
            await axios.post(`http://localhost:3000/api/prescriptions`, {
                consultationId: selectedConsultation._id,
                care: prescription.care,
                medicines: prescription.medicines,
            });
            alert('Prescription submitted successfully!');
            setPrescription({ care: '', medicines: '' });
            setSelectedConsultation(null); // Reset the selected consultation
        } catch (error) {
            console.error('Error submitting prescription:', error);
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Consultations</h1>

            {/* Consultations List Section */}
            <div className="consultation-list mb-8">
                {consultations.map((consultation) => (
                    <div
                        key={consultation._id}
                        className="consultation-card p-4 bg-white shadow-md rounded-lg mb-4"
                        onClick={() => setSelectedConsultation(consultation)}
                    >
                        <h3 className="text-xl font-semibold mb-2">Patient: {consultation.patientName}</h3>
                        <p className="text-lg">Date: {new Date(consultation.consultationDate).toLocaleDateString()}</p>
                        <p className="text-lg">Details: {consultation.details}</p>
                    </div>
                ))}
            </div>

            {/* Prescription Form Section */}
            {selectedConsultation && (
                <div className="prescription-form p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Write Prescription</h2>
                    <textarea
                        name="care"
                        value={prescription.care}
                        onChange={handlePrescriptionChange}
                        placeholder="Care to be taken"
                        className="w-full p-2 border rounded mb-4"
                        required
                    />
                    <textarea
                        name="medicines"
                        value={prescription.medicines}
                        onChange={handlePrescriptionChange}
                        placeholder="Medicines"
                        className="w-full p-2 border rounded mb-4"
                    />
                    <button
                        onClick={handleSubmitPrescription}
                        className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                    >
                        Submit Prescription
                    </button>
                </div>
            )}
        </div>
    );
};

export default PrescriptionPage;
