import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { User, DollarSign, Hash, Search, Settings, Camera, Lock, Mail, Phone } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

const Accounts = ({ salesData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('customers'); // 'customers' หรือ 'profile'
  
  // Mock user profile data
  const [userProfile, setUserProfile] = useState({
    name: 'Admin User',
    email: 'admin@biosticker.co',
    phone: '080-123-4567',
    role: 'Administrator',
    avatar: null,
    joinDate: '2024-01-15'
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...userProfile });

  const accountStats = useMemo(() => {
    const stats = salesData.reduce((acc, sale) => {
      if (!acc[sale.lineName]) {
        acc[sale.lineName] = {
          lineName: sale.lineName,
          totalSales: 0,
          orderCount: 0,
        };
      }
      // แปลงเป็น number ก่อนบวกเพื่อป้องกันการต่อ string
      acc[sale.lineName].totalSales += parseFloat(sale.amount) || 0;
      acc[sale.lineName].orderCount += 1;
      return acc;
    }, {});

    return Object.values(stats).sort((a, b) => b.totalSales - a.totalSales);
  }, [salesData]);

  const filteredAccounts = accountStats.filter(account =>
    account.lineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProfileUpdate = () => {
    setUserProfile({ ...profileForm });
    setIsEditingProfile(false);
    alert('บันทึกข้อมูลโปรไฟล์เรียบร้อย');
  };

  const handleCancelEdit = () => {
    setProfileForm({ ...userProfile });
    setIsEditingProfile(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveSection('customers')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeSection === 'customers'
              ? 'bg-white text-emerald-600 shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ลูกค้า
        </button>
        <button
          onClick={() => setActiveSection('profile')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeSection === 'profile'
              ? 'bg-white text-emerald-600 shadow'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          จัดการบัญชี
        </button>
      </div>

      {/* Customer Accounts Section */}
      {activeSection === 'customers' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">ยอดขายรายบุคคล</h2>
            <div className="relative w-full sm:w-auto">
              <Label htmlFor="search-account" className="sr-only">ค้นหาบัญชี</Label>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="search-account"
                type="text"
                placeholder="ค้นหาชื่อ Line..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccounts.map((account) => (
              <div key={account.lineName} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 truncate">{account.lineName}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="text-sm text-gray-600">ยอดรวม</p>
                      <p className="font-bold text-gray-900">฿{account.totalSales.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Hash className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">ออเดอร์</p>
                      <p className="font-bold text-gray-900">{account.orderCount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Management Section */}
      {activeSection === 'profile' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">จัดการบัญชีของฉัน</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{userProfile.name}</h3>
                  <p className="text-sm text-emerald-600">{userProfile.role}</p>
                  <p className="text-xs text-gray-500 mt-2">เข้าร่วมเมื่อ {new Date(userProfile.joinDate).toLocaleDateString('th-TH')}</p>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">ข้อมูลส่วนตัว</h3>
                  {!isEditingProfile ? (
                    <Button
                      onClick={() => setIsEditingProfile(true)}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>แก้ไข</span>
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button
                        onClick={handleCancelEdit}
                        variant="outline"
                        size="sm"
                      >
                        ยกเลิก
                      </Button>
                      <Button
                        onClick={handleProfileUpdate}
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        บันทึก
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="profile-name">ชื่อ</Label>
                    <Input
                      id="profile-name"
                      type="text"
                      value={isEditingProfile ? profileForm.name : userProfile.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      disabled={!isEditingProfile}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="profile-email">อีเมล</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="profile-email"
                        type="email"
                        value={isEditingProfile ? profileForm.email : userProfile.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        disabled={!isEditingProfile}
                        className="pl-10 mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="profile-phone">เบอร์โทรศัพท์</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="profile-phone"
                        type="tel"
                        value={isEditingProfile ? profileForm.phone : userProfile.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        disabled={!isEditingProfile}
                        className="pl-10 mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="profile-role">ตำแหน่ง</Label>
                    <Input
                      id="profile-role"
                      type="text"
                      value={userProfile.role}
                      disabled
                      className="mt-1 bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">ความปลอดภัย</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => alert('ฟีเจอร์เปลี่ยนรหัสผ่านจะเพิ่มในอนาคต')}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    เปลี่ยนรหัสผ่าน
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Accounts;