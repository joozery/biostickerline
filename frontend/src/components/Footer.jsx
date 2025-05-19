import React from 'react';
import { FaFacebookF, FaEnvelope } from 'react-icons/fa';
import { SiLine } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 font-prompt">
      <div className="max-w-screen-xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-green-700 mb-2">BIO STICKER</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            ศูนย์รวมสติกเกอร์ไลน์สุดน่ารัก พร้อมระบบจัดส่งอัตโนมัติ 24 ชม.  
            มีให้เลือกหลากหลายหมวดหมู่และศิลปิน
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-md font-semibold text-green-600 mb-3">เมนูหลัก</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><a href="#home" className="hover:text-green-700">หน้าแรก</a></li>
            <li><a href="#categories" className="hover:text-green-700">หมวดหมู่</a></li>
            <li><a href="#new" className="hover:text-green-700">สติกเกอร์ใหม่</a></li>
            <li><a href="#about" className="hover:text-green-700">เกี่ยวกับเรา</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-md font-semibold text-green-600 mb-3">ติดต่อเรา</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center gap-2">
              <SiLine className="text-green-500" />
              <a href="https://line.me/R/ti/p/~143yahil" target="_blank" rel="noopener noreferrer">
                @143yahil
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-green-500" />
              <a href="mailto:info@biosticker.co">info@biosticker.co</a>
            </li>
            <li className="flex items-center gap-2">
              <FaFacebookF className="text-green-500" />
              <a href="https://facebook.com/biosticker" target="_blank" rel="noopener noreferrer">
                biosticker
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} BIO STICKER. All rights reserved.
      </div>
    </footer>
  );
}
