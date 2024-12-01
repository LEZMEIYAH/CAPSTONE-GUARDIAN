import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MyCalendar from './pages/Calendar';
import RequestConsultation from './pages/RequestConsultation';
import RequestAppointment from './pages/RequestAppointment';
import Appointments from './pages/Appointments';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ActivityLog from './pages/ActivityLog';
import Settings from './pages/Settings';
import AboutUs from './pages/AboutUs';
import 'react-calendar/dist/Calendar.css';
import Consultation from './pages/Consultation';

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap Layout for all routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<MyCalendar />} />
          <Route path="request-consultation" element={<RequestConsultation />} />
          <Route path="request-appointment" element={<RequestAppointment />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="chat" element={<Chat />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="settings" element={<Settings />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="consultation" element={<Consultation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
