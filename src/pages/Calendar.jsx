import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [availability, setAvailability] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get('/api/availability/');
        setAvailability(response.data);

        // Create a map of availability by date
        const dates = {};
        response.data.forEach((slot) => {
          dates[slot.date] = slot.is_available ? 'available' : 'unavailable';
        });
        setMarkedDates(dates);
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      }
    };

    fetchAvailability();
  }, []);

  // Tile coloring logic for the calendar
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      if (markedDates[formattedDate] === 'available') {
        return 'bg-green-700 text-green-100 border-green-500 border'; // Dark green for available
      } else if (markedDates[formattedDate] === 'unavailable') {
        return 'bg-red-700 text-red-100 border-red-500 border'; // Dark red for unavailable
      }
    }
    return '';
  };

  // Handle date click
  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const status = markedDates[formattedDate] || 'No information';
    alert(`📅 Date: ${formattedDate}\n📝 Status: ${status}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-green-50 to-green-100">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-green-700">Appointment Calendar</h1>
        <p className="text-lg text-gray-600 mt-2">
          Explore availability and book your preferred slots.
        </p>
      </div>

      {/* Calendar Section */}
      <div className="bg-white border border-green-500 rounded-md p-2 shadow-lg">
        <Calendar
          className="react-calendar" // Ensure no extra gaps around the calendar
          tileClassName={tileClassName}
          onClickDay={handleDateClick}
          tileContent={({ date, view }) => {
            const formattedDate = date.toISOString().split('T')[0];
            if (markedDates[formattedDate] === 'available') {
              return <span className="text-green-100 text-sm font-medium">Available</span>;
            } else if (markedDates[formattedDate] === 'unavailable') {
              return <span className="text-red-100 text-sm font-medium">Unavailable</span>;
            }
            return null;
          }}
        />
      </div>

      {/* Legend Section */}
      <div className="mt-6 flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-green-700 border-green-500 border rounded"></span>
          <span className="text-gray-700">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-red-700 border-red-500 border rounded"></span>
          <span className="text-gray-700">Unavailable</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-white border-gray-300 border rounded"></span>
          <span className="text-gray-700">No Information</span>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
