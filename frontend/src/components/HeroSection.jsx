import React from 'react';
import logo from '../assets/logobio.png';
import { SiLine } from 'react-icons/si';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-green-100 py-16 px-4 font-prompt overflow-hidden">
      <div className="max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 relative z-10">
        {/* Left: Text content */}
        <div className="text-center md:text-left max-w-xl animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 leading-snug mb-4">
            ซื้อสติกเกอร์ไลน์สุดน่ารัก <br className="hidden md:block" /> ได้ง่ายๆ ที่นี่!
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            รวบรวมสติกเกอร์ยอดนิยมจาก LINE STORE ทั้งไทยและต่างประเทศ
            พร้อมระบบจัดส่งอัตโนมัติทันทีหลังชำระเงิน 💬
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#stickers"
              className="bg-green-600 text-white px-6 py-3 rounded-full text-sm shadow-lg hover:bg-green-700 hover:scale-105 transition-all"
            >
              ดูสติกเกอร์ทั้งหมด
            </a>
            <a
              href="https://line.me/R/ti/p/~143yahil"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-green-400 text-green-700 px-6 py-3 rounded-full text-sm flex items-center justify-center gap-2 hover:bg-green-50 hover:scale-105 transition-all"
            >
              <SiLine className="text-green-500 text-lg" />
              แอดไลน์สั่งซื้อ
            </a>
          </div>
        </div>

        {/* Right: Logo image with floating card style */}
        <div className="flex-shrink-0 animate-scale-in">
          <div className="bg-white rounded-2xl p-4 shadow-xl border border-green-100">
            <img
              src={logo}
              alt="BIO STICKER Logo"
              className="h-44 md:h-52 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Soft blur background shape (optional for style) */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-green-100 rounded-full blur-3xl opacity-40 z-0"></div>
    </section>
  );
}
