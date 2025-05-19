import React from 'react';
import {
  FaUsers,
  FaTags,
  FaBoxOpen,
  FaCheckCircle,
} from 'react-icons/fa';

export default function StoreStats() {
  const stats = [
    {
      icon: <FaUsers className="text-green-300 text-5xl" />,
      label: 'ผู้ติดตามทั้งหมด',
      value: 524,
      unit: 'คน',
    },
    {
      icon: <FaTags className="text-green-300 text-5xl" />,
      label: 'จำนวนสติกเกอร์',
      value: 18,
      unit: 'ชุด',
    },
    {
      icon: <FaBoxOpen className="text-green-300 text-5xl" />,
      label: 'รายการที่ยังไม่ได้ส่ง',
      value: 5,
      unit: 'ชุด',
    },
    {
      icon: <FaCheckCircle className="text-green-300 text-5xl" />,
      label: 'ขายแล้วทั้งหมด',
      value: 142,
      unit: 'ชุด',
    },
  ];

  return (
    <section className="py-14 bg-[#f8fef9] font-prompt">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center hover:scale-[1.02]"
          >
            <div>
              <p className="text-sm text-gray-700 mb-1">{stat.label}</p>
              <p className="text-3xl font-extrabold text-green-600 leading-none">
                {stat.value}
              </p>
              <span className="text-sm text-gray-500">{stat.unit}</span>
            </div>
            <div className="opacity-60">{stat.icon}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
