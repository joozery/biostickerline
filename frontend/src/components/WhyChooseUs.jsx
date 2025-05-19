import React from 'react';
import {
  FaClock,
  FaShieldAlt,
  FaRocket,
  FaGem,
  FaHistory,
  FaHeadset,
} from 'react-icons/fa';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaClock />,
      title: 'สั่งซื้อได้ตลอด 24 ชั่วโมง',
      desc: 'คุณสามารถเลือกซื้อสติกเกอร์ไลน์ได้ทุกเวลา ผ่านระบบอัตโนมัติที่สะดวกและรวดเร็วไม่มีวันหยุด',
    },
    {
      icon: <FaShieldAlt />,
      title: 'ปลอดภัยและมั่นใจได้',
      desc: 'เรารับประกันความปลอดภัยในการทำรายการ ด้วยระบบตรวจสอบการชำระเงินอัตโนมัติ',
    },
    {
      icon: <FaRocket />,
      title: 'เริ่มใช้งานได้ทันทีหลังสั่งซื้อ',
      desc: 'ระบบจัดส่งสติกเกอร์อัตโนมัติทันทีหลังชำระเงิน คุณไม่ต้องรอนาน',
    },
    {
      icon: <FaGem />,
      title: 'มีสติกเกอร์พรีเมียมหลากหลาย',
      desc: 'เราคัดสรรสติกเกอร์จากศิลปินชั้นนำ ทั้งไทยและต่างประเทศ ให้เลือกมากมาย',
    },
    {
      icon: <FaHistory />,
      title: 'ลูกค้าไว้วางใจมากกว่า 3 ปี',
      desc: 'เราให้บริการมานานกว่า 3 ปี พร้อมรีวิวจากผู้ใช้งานจริงที่พึงพอใจในคุณภาพ',
    },
    {
      icon: <FaHeadset />,
      title: 'ทีมงานพร้อมช่วยเหลือ 24 ชม.',
      desc: 'หากมีปัญหาในการสั่งซื้อ ทีมงานพร้อมดูแลและตอบแชททุกวันผ่าน LINE',
    },
  ];

  return (
    <section className="py-16 bg-[#f8fef9] font-prompt">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-500 mb-2">Why Choose Us?</p>
        <h2 className="text-3xl font-extrabold text-green-700 mb-12">ทำไมต้องซื้อสติกเกอร์กับเรา</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-lg p-6 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="bg-gradient-to-br from-green-300 to-green-500 p-4 rounded-full mb-4 shadow-lg group-hover:scale-105 transition">
                {React.cloneElement(feature.icon, {
                  className: 'text-white text-2xl',
                })}
              </div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
