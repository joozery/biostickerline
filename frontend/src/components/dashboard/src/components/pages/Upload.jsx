import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText } from 'lucide-react';

const UploadPage = ({ handleFileUpload, salesData, teams }) => {
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
            <Upload className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">อัปโหลดสลีปยอดขาย</h2>
          <p className="text-gray-600 mb-6">
            อัปโหลดรูปภาพสลีปจากไลน์ OA เพื่อบันทึกยอดขาย
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

          <div className="mt-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">ข้อมูลที่ระบบจะดึงจากสลีป:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>ชื่อไลน์ผู้แจ้งยอด</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>วันที่และเวลาทำรายการ</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>จำนวนเงินที่โอน</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>หมายเลขอ้างอิง</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {salesData.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">สลีปที่อัปโหลดล่าสุด</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {salesData.slice(0, 6).map((sale) => {
              const team = teams.find(t => t.id === sale.teamId);
              return (
                <div key={sale.id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: team?.color || '#gray' }}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">{team?.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{sale.date}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{sale.lineName}</p>
                    <p className="text-sm text-gray-600">{sale.product}</p>
                    <p className="text-lg font-bold text-emerald-600">
                      ฿{(parseFloat(sale.amount) || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UploadPage;