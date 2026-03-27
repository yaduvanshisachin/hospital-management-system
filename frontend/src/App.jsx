import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import DoctorsPage from './pages/DoctorsPage';
import AdminPatientsPage from './pages/AdminPatientsPage';
import OnboardDoctorPage from './pages/OnboardDoctorPage';
import DoctorAppointmentsPage from './pages/DoctorAppointmentsPage';
import BookAppointmentPage from './pages/BookAppointmentPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes with layout */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />

            {/* Admin routes */}
            <Route
              path="/admin/patients"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminPatientsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/onboard-doctor"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <OnboardDoctorPage />
                </ProtectedRoute>
              }
            />

            {/* Doctor routes */}
            <Route
              path="/doctor/appointments"
              element={
                <ProtectedRoute requiredRole="DOCTOR">
                  <DoctorAppointmentsPage />
                </ProtectedRoute>
              }
            />

            {/* Patient routes */}
            <Route
              path="/patient/book-appointment"
              element={
                <ProtectedRoute requiredRole="PATIENT">
                  <BookAppointmentPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
