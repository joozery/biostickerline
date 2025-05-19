import React, { useState } from 'react';
import {
  FaHeart,
  FaShoppingCart,
  FaHome,
  FaThList,
  FaStar,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { SiLine } from 'react-icons/si';

import logo from '../assets/logobio.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md font-prompt z-50 relative">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="BIO STICKER Logo"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-green-600 text-[15px] font-medium items-center">
          <li className="hover:text-green-800 transition cursor-pointer flex items-center gap-1">
            <FaHome className="text-green-500" />
            หน้าแรก
          </li>
          <li className="hover:text-green-800 transition cursor-pointer flex items-center gap-1">
            <FaThList className="text-green-500" />
            หมวดหมู่
          </li>
          <li className="hover:text-green-800 transition cursor-pointer flex items-center gap-1">
            <FaStar className="text-green-500" />
            สติกเกอร์ใหม่
          </li>
        </ul>

        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:block flex-grow mx-6">
          <input
            type="text"
            placeholder="ค้นหาสติกเกอร์..."
            className="w-full max-w-sm px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://line.me/R/ti/p/~143yahil"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 transition"
          >
            <SiLine className="text-white text-lg" />
            แอดไลน์สั่งซื้อ
          </a>
          <FaHeart className="text-green-400 hover:text-green-600 cursor-pointer text-lg transition" />
          <FaShoppingCart className="text-green-500 hover:text-green-700 cursor-pointer text-lg transition" />
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaTimes className="text-green-600 text-2xl" />
            ) : (
              <FaBars className="text-green-600 text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 flex flex-col gap-4 z-40">
          <div className="flex flex-col gap-3 text-green-600 text-sm font-medium">
            <div className="flex items-center gap-2 cursor-pointer hover:text-green-800">
              <FaHome className="text-green-500" />
              หน้าแรก
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-green-800">
              <FaThList className="text-green-500" />
              หมวดหมู่
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-green-800">
              <FaStar className="text-green-500" />
              สติกเกอร์ใหม่
            </div>
          </div>

          <input
            type="text"
            placeholder="ค้นหาสติกเกอร์..."
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />

          <a
            href="https://line.me/R/ti/p/~143yahil"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm flex items-center justify-center gap-2 transition"
          >
            <SiLine className="text-white text-lg" />
            แอดไลน์สั่งซื้อ
          </a>

          <div className="flex items-center gap-4 mt-4">
            <FaHeart className="text-green-400 hover:text-green-600 cursor-pointer text-lg transition" />
            <FaShoppingCart className="text-green-500 hover:text-green-700 cursor-pointer text-lg transition" />
          </div>
        </div>
      )}
    </nav>
  );
}
