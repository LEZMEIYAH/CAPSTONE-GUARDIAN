import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GuardianDashboard from './pages/Guardian/GuardianDashboard';
import GuardianMyCalendar from './pages/Guardian/GuardianCalendar';
import GuardianRequestConsultation from './pages/Guardian/GuardianRequestConsultation';
import GuardianRequestAppointment from './pages/Guardian/GuardianRequestAppointment';
import GuardianAppointments from './pages/Guardian/GuardianAppointments';
import GuardianChat from './pages/Guardian/GuardianChat';
import GuardianNotifications from './pages/Guardian/GuardianNotifications';
import GuardianProfile from './pages/Guardian/GuardianProfile';
import GuardianActivityLog from './pages/Guardian/GuardianActivityLog';
import GuardianSettings from './pages/Guardian/GuardianSettings';
import GuardianAboutUs from './pages/Guardian/GuardianAboutUs';
import GuardianConsultation from './pages/Guardian/GuardianConsultation';

import PLayout from './components/PLayout';
import Dashboard from './pages//Pediatrician/Dashboard';
import MyCalendar from './pages/Pediatrician/Calendar';
import RequestConsultation from './pages/Pediatrician/RequestConsultation';
import RequestAppointment from './pages/Pediatrician/RequestAppointment';
import Appointments from './pages/Pediatrician/Appointments';
import Chat from './pages/Pediatrician/Chat';
import Notifications from './pages/Pediatrician/Notifications';
import Patients from './pages/Pediatrician/Patient'
import Profile from './pages/Pediatrician/Profile';
import ActivityLog from './pages/Pediatrician/ActivityLog';
import Consultation from './pages/Pediatrician/Consultations';
import AboutUs from './pages/Pediatrician/AboutUs';
import 'react-calendar/dist/Calendar.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap Layout for all routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<GuardianDashboard />} />
          <Route path="dashboard" element={<GuardianDashboard />} />
          <Route path="calendar" element={<GuardianMyCalendar />} />
          <Route path="request-consultation" element={<GuardianRequestConsultation />} />
          <Route path="request-appointment" element={<GuardianRequestAppointment />} />
          <Route path="appointments" element={<GuardianAppointments />} />
          <Route path="chat" element={<GuardianChat />} />
          <Route path="notifications" element={<GuardianNotifications />} />
          <Route path="profile" element={<GuardianProfile />} />
          <Route path="activity-log" element={<GuardianActivityLog />} />
          <Route path="settings" element={<GuardianSettings />} />
          <Route path="about-us" element={<GuardianAboutUs />} />
          <Route path="consultation" element={<GuardianConsultation />} />
        </Route>

        <Route path="/" element={<PLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pdashboard" element={<Dashboard />} />
          <Route path="pcalendar" element={<MyCalendar />} />
          <Route path="prequest-consultation" element={<RequestConsultation />} />
          <Route path="prequest-appointment" element={<RequestAppointment />} />
          <Route path="pappointments" element={<Appointments />} />
          <Route path="pchat" element={<Chat />} />
          <Route path="pnotifications" element={<Notifications />} />
          <Route path="ppatients" element={<Patients />} />
          <Route path="pprofile" element={<Profile />} />
          <Route path="pactivity-log" element={<ActivityLog />} />
          <Route path="pabout-us" element={<AboutUs />} />
          <Route path="pconsultations" element={<Consultation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
