import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [inputLabel, setInputLabel] = useState("");
  const [status, setStatus] = useState("Available");

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
    <main className="flex flex-col items-center bg-green-100 p-10 min-h-screen">
      {/* Calendar outside of the white box */}
      <h1 className="text-2xl font-bold mb-6 text-green-900 w-full text-center">
        Calendar
      </h1>
      <div className="mb-6 w-full max-w-4xl flex justify-center">
        <Calendar
          onChange={(newDate) => setDate(newDate)}
          value={date}
          className="react-calendar w-full text-lg"
          tileClassName={getTileClassName} // Apply the class based on appointment status
        />
      </div>

      {/* White box for input and actions */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mt-6">
        <div className="flex gap-4 justify-center mb-6">
          <input
            type="text"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
            placeholder="Enter label for the selected date"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-1/2"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-1/4"
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
          <button
            onClick={handleMarkDay}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Mark Day
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl text-gray-700 text-center mb-4">Scheduled Availablilites</h2>
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
