<<<<<<< HEAD
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
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Patient from "./pages//Pediatrician/Patient";
import Dashboard from "./pages/Pediatrician/Dashboard";
import Appointments from "./pages/Pediatrician/Appointments";
import Consultations from "./pages/Pediatrician/Consultations";
import Calendar from "./pages/Pediatrician/Calendar";
import RequestConsultation from "./pages/Pediatrician/RequestConsultation";
import RequestAppointment from "./pages/Pediatrician/RequestAppointment";
import WelcomePage from "./pages/WelcomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Chat from "./pages/Pediatrician/Chat";
import Profile from "./pages/Pediatrician/Profile";
import Notifications from "./pages/Pediatrician/Notifications";
import ParentComponent from "./pages/Pediatrician/ParentComponent";
import ActivityLog from "./pages/Pediatrician/ActivityLog";
import Settings from "./pages/Pediatrician/Settings";
import AboutUs from "./pages/Pediatrician/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define WelcomePage as the landing page */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/loginpage" element={<LoginPage />} />

        {/* Main App Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/patients" element={<Patient />} />
          <Route path="/chat/:roomName" element={<ParentComponent />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/request-consultation" element={<RequestConsultation />} />
          <Route path="/request-appointment" element={<RequestAppointment />} />
          <Route path="/activity-log" element={<ActivityLog />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
>>>>>>> b53c7a6 (Paye's PediaPOV)
  );
}

export default App;
