import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBack } from 'react-icons/io5'; // Import the back arrow icon

const GuardianRequestAppointment = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  const [formData, setFormData] = useState({
    patient_name: '',
    email: '',
    date: '',
    time: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('/api/appointments/', formData);
      setSuccess(true);
      setFormData({
        patient_name: '',
        email: '',
        date: '',
        time: '',
        description: '',
      });
    } catch (error) {
      console.error('Failed to request appointment:', error.response ? error.response.data : error.message);
      setError('Failed to request appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-green-50 to-green-100 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 z-10"
      >
        <IoArrowBack className="text-lg" /> {/* Smaller icon */}
      </button>

      {/* Header Section */}
      <h1 className="text-4xl font-extrabold text-green-700 mb-4">Request Appointment</h1>
      <p className="text-gray-600 text-center max-w-lg mb-8">
        Fill out the form below to request an appointment. We’ll get back to you as soon as possible.
      </p>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <label htmlFor="patient_name" className="text-sm font-medium text-gray-700">
            Patient Name
          </label>
          <input
            type="text"
            name="patient_name"
            id="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            placeholder="Enter the patient's full name"
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Appointment Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="time" className="text-sm font-medium text-gray-700">
            Appointment Time
          </label>
          <input
            type="time"
            name="time"
            id="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col sm:col-span-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide any additional details or concerns"
            rows="4"
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          ></textarea>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className={`w-full py-3 text-white font-medium rounded-lg shadow ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">Appointment requested successfully!</p>}
      </form>
    </div>
  );
};

export default GuardianRequestAppointment;
