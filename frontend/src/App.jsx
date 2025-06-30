import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import DashboardApp from './dashboard/App';
import { AuthProvider, useAuth } from './components/AuthContext';
import Login from './components/Login';
import { Toaster } from './dashboard/components/ui/toaster';

function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="bg-[#fefcf9] min-h-screen font-prompt flex flex-col justify-between">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<ProtectedDashboard />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

// Protected Component ที่ตรวจสอบการเข้าสู่ระบบ
const ProtectedDashboard = () => {
  const { user, login, logout, loading, isAuthenticated } = useAuth();

  // แสดง loading ขณะตรวจสอบการเข้าสู่ระบบ
  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังตรวจสอบการเข้าสู่ระบบ...</p>
        </div>
      </div>
    );
  }

  // แสดงหน้า Login ถ้ายังไม่ได้เข้าสู่ระบบ
  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  // แสดง Dashboard ถ้าเข้าสู่ระบบแล้ว
  return <DashboardApp user={user} onLogout={logout} />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}
