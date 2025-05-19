import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer'; // ✅ นำเข้า Footer

export default function App() {
  return (
    <div className="bg-[#fefcf9] min-h-screen font-prompt flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer /> {/* ✅ Footer อยู่ท้ายสุด */}
    </div>
  );
}
