import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import StudentDashboard from './pages/StudentDashboard';
import CoursesList from './pages/CoursesList';
import CourseDetails from './pages/CourseDetails';
import TeacherSelection from './pages/TeacherSelection';
import MyCourses from './pages/MyCourses';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<CoursesList />} />
          <Route path="/auth" element={<LoginRegister />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses/:id/select" element={
            <ProtectedRoute role="student">
              <TeacherSelection />
            </ProtectedRoute>
          } />
          <Route path="/student/dashboard" element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/my-courses" element={
            <ProtectedRoute role="student">
              <MyCourses />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
