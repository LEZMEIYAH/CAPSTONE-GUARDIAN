import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar"; // Import the react-calendar component
import "react-calendar/dist/Calendar.css"; // Import calendar styles

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState(new Date()); // State to manage selected date on the calendar
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments"
        );
        console.log("Fetched appointments:", response.data);
        const upcomingAppointments = response.data.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          const localAppointmentDate = new Date(
            appointmentDate.toLocaleString()
          );
          localAppointmentDate.setHours(0, 0, 0, 0);

          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);

          console.log("Appointment Date:", new Date(appointmentDate));
          console.log("Current Date:", new Date(currentDate));

          return localAppointmentDate >= currentDate;
        });
        setAppointments(upcomingAppointments);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle calendar date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Filter appointments for the selected date
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate.getDate() === date.getDate() &&
      appointmentDate.getMonth() === date.getMonth() &&
      appointmentDate.getFullYear() === date.getFullYear()
    );
  });

  return (
    <main className="flex-1 bg-gradient-to-br from-green-50 to-green-100 p-10 min-h-screen font-sans">
      <div className="container mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-green-900 tracking-tight">
          Welcome to the Dashboard
        </h1>

        {/* Upcoming Schedule Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 mb-8">
        <h2 className="text-2xl font-bold text-green-700 mb-6 border-b-2 border-green-400 pb-2">
            Upcoming Schedule
          </h2>
          {appointments.length > 0 ? (
            <ul className="mt-4 space-y-6">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <li
                    key={appointment.app_id}
                    className="p-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-green-800">
                          {appointment.patient_name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {new Date(appointment.date).toLocaleDateString()} at{" "}
                          {appointment.time}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          navigate(`/appointments/${appointment.app_id}`)
                        }
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-lg text-green-800">
                  No appointments for this date.
                </p>
              )}
            </ul>
          ) : (
            <p className="text-lg text-gray-700 font-light">No upcoming appointments.</p>
          )}
        </div>

        {/* Calendar Section */}
        <div className="bg-white p-6 rounded-lg shadow-xl border-l-4 border-green-600 mb-8 flex flex-col justify-center items-center">
          {/* Make "Calendar" clickable */}
          <h2
            className="text-2xl font-bold text-green-900 mb-6 text-center w-full cursor-pointer"
            onClick={() => navigate('/pcalendar')} // Navigate to Calendar page when clicked
          >
            Calendar
          </h2>
          <div className="w-full max-w-md flex justify-center items-center">
            <Calendar
              onChange={handleDateChange}
              value={date}
              className="react-calendar w-full rounded-lg shadow-md border"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
