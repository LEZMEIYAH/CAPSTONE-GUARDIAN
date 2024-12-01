import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoArrowBack } from "react-icons/io5"; // Import the back arrow icon
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [inputLabel, setInputLabel] = useState("");
  const [status, setStatus] = useState("Available");

  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch appointments for the guardian when they load the page
  useEffect(() => {
    const userId = "user123"; // Replace with actual user ID logic
    fetch(`/api/appointments/${userId}`)
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Failed to load appointments", err));
  }, []);

  const handleMarkDay = () => {
    if (inputLabel) {
      fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date.toLocaleDateString(),
          label: inputLabel,
          status: status, // "Available" or "Not Available"
        }),
      })
        .then((res) => res.json())
        .then((data) => setAppointments([...appointments, data]))
        .catch((err) => console.error("Failed to mark day", err));

      setInputLabel(""); // Clear the input field after marking
      setStatus("Available"); // Reset status to "Available"
    }
  };

  // Function to check if a date is marked as Available or Not Available
  const getTileClassName = ({ date }) => {
    const formattedDate = date.toLocaleDateString();
    const appointment = appointments.find(
      (appt) => appt.date === formattedDate
    );
    if (appointment) {
      return appointment.status === "Available"
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white";
    }
    return "";
  };

  return (
    <main className="flex flex-col items-center bg-green-100 p-10 min-h-screen font-poppins">
      {/* Back Button in the upper left corner */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="absolute top-4 left-60 w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 z-10"
      >
        <IoArrowBack className="text-lg" /> {/* Smaller icon */}
      </button>

      {/* Calendar Title */}
      <h1 className="text-3xl font-semibold mb-6 text-green-900 w-full text-center">
        Calendar
      </h1>

      {/* Calendar Section */}
      <div className="flex justify-center items-center bg-white border border-green-500 rounded-md p-2 shadow-lg mb-6">
        <Calendar
          onChange={(newDate) => setDate(newDate)}
          value={date}
          className="react-calendar w-full text-lg"
          tileClassName={getTileClassName} // Apply the class based on appointment status
        />
      </div>

      {/* White box for input and actions */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl mt-6">
        <div className="flex gap-4 justify-center mb-6">
          <input
            type="text"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
            placeholder="Enter label for the selected date"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-1/2 text-lg"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-1/4 text-lg"
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
          <button
            onClick={handleMarkDay}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-lg"
          >
            Mark Day
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl text-gray-700 text-center mb-4">Scheduled Availabilities</h2>
          <ul className="list-none pl-0">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <li
                  key={appointment.appointment_id}
                  className="flex justify-between py-2 border-b border-gray-300 text-gray-600"
                >
                  <strong className="text-gray-800">{appointment.date}</strong>: {appointment.label} -{" "}
                  <span
                    className={`${
                      appointment.status === "Available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </li>
              ))
            ) : (
              <li>No marked availabilities marked yet.</li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default CalendarPage;
