import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, Database, Image as ImageIcon, Server } from 'lucide-react';
import { Button } from '../components/ui/button';

const StepCard = ({ icon: Icon, title, description, step }) => (
  <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-white">
      {step}
    </div>
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-emerald-600" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  </div>
);

const Integration = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">เชื่อมต่อกับ LINE Messaging API</h2>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
          นี่คือภาพรวมของขั้นตอนการทำงานเพื่อรับข้อมูลสลีปจาก LINE OA ของคุณโดยอัตโนมัติ
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 p-4">
        <div className="flex items-center flex-col text-center">
          <Bot className="w-16 h-16 text-green-500" />
          <p className="font-bold mt-2">LINE OA</p>
          <p className="text-sm text-gray-500">ทีมงานส่งสลีป</p>
        </div>
        <ArrowRight className="w-12 h-12 text-gray-300 hidden lg:block" />
        <div className="flex items-center flex-col text-center">
          <Server className="w-16 h-16 text-blue-500" />
          <p className="font-bold mt-2">Webhook Server</p>
          <p className="text-sm text-gray-500">รับและประมวลผลข้อมูล</p>
        </div>
        <ArrowRight className="w-12 h-12 text-gray-300 hidden lg:block" />
        <div className="flex items-center flex-col text-center">
          <Database className="w-16 h-16 text-purple-500" />
          <p className="font-bold mt-2">Dashboard (ที่นี่)</p>
          <p className="text-sm text-gray-500">แสดงผลและจัดการ</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">ขั้นตอนทางเทคนิค (สำหรับนักพัฒนา)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StepCard
            step="1"
            icon={Bot}
            title="สร้าง LINE Bot"
            description="ไปที่ LINE Developers Console สร้าง Provider และ Channel ประเภท Messaging API จากนั้นรับ Channel Access Token และ Channel Secret"
          />
          <StepCard
            step="2"
            icon={Server}
            title="ตั้งค่า Webhook"
            description="สร้างเซิร์ฟเวอร์ (เช่น Node.js, Python) เพื่อรับข้อมูลจาก LINE นำ URL ของเซิร์ฟเวอร์ไปใส่ในช่อง Webhook URL ในหน้าตั้งค่าของ LINE Bot"
          />
          <StepCard
            step="3"
            icon={ImageIcon}
            title="ประมวลผลข้อความและรูปภาพ"
            description="เขียนโค้ดบนเซิร์ฟเวอร์เพื่อจัดการ event ที่ LINE ส่งมา เมื่อได้รับข้อความเป็นรูปภาพ (สลีป) ให้ดึงข้อมูลรูปภาพออกมา"
          />
          <StepCard
            step="4"
            icon={Database}
            title="ส่งข้อมูลมาที่ Dashboard"
            description="หลังจากประมวลผลข้อมูลสลีป (อาจใช้ OCR เพื่ออ่านข้อมูล) ให้ส่งข้อมูลยอดขายมาจัดเก็บที่ฐานข้อมูล (เช่น Supabase) ซึ่ง Dashboard นี้จะดึงข้อมูลไปแสดงผล"
          />
        </div>
      </div>

      <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
        <h3 className="text-lg font-semibold text-emerald-800">หมายเหตุ</h3>
        <p className="text-emerald-700">
          การตั้งค่าส่วนเซิร์ฟเวอร์ (Webhook) จำเป็นต้องมีความรู้ด้านการเขียนโปรแกรมฝั่งเซิร์ฟเวอร์ หากคุณต้องการใช้งานฟังก์ชันนี้อย่างเต็มรูปแบบ แนะนำให้ปรึกษานักพัฒนาครับ
        </p>
      </div>
    </motion.div>
  );
};

export default Integration;