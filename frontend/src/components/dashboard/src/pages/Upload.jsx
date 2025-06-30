import React from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileText, Link as LinkIcon } from 'lucide-react';

const UploadPage = ({ handleFileUpload, salesData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 shadow-lg text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UploadIcon className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">อัปโหลดสลีป (แบบ Manual)</h2>
          <p className="text-gray-600 mb-6">
            สำหรับกรณีที่ต้องการเพิ่มข้อมูลด้วยตนเอง หรือทดสอบระบบ
          </p>

          <div className="border-2 border-dashed border-emerald-300 rounded-xl p-8 hover:border-emerald-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">คลิกเพื่อเลือกไฟล์</p>
              <p className="text-xs text-gray-500">รองรับไฟล์ JPG, PNG, GIF</p>
            </label>
          </div>

          <div className="mt-8 text-center p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <LinkIcon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-800">ต้องการระบบอัตโนมัติ?</h3>
            <p className="text-sm text-blue-700">
              ไปที่หน้า 'การเชื่อมต่อ' เพื่อดูวิธีตั้งค่าให้ LINE Bot ส่งข้อมูลมาที่นี่โดยตรง!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadPage;