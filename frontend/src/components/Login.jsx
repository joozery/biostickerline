import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '../dashboard/components/ui/button';
import { Input } from '../dashboard/components/ui/input';
import { Label } from '../dashboard/components/ui/label';
import { useToast } from '../dashboard/components/ui/use-toast';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // ข้อมูลผู้ใช้ตัวอย่าง (ในการใช้งานจริงควรเก็บใน Backend)
  const validUsers = [
    { username: 'admin', password: 'admin123', role: 'Administrator', name: 'Admin User' },
    { username: 'manager', password: 'manager123', role: 'Manager', name: 'Manager User' },
    { username: 'staff', password: 'staff123', role: 'Staff', name: 'Staff User' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // จำลองการตรวจสอบ login (ใน production ควรเรียก API)
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = validUsers.find(
        u => u.username === credentials.username && u.password === credentials.password
      );

      if (user) {
        // บันทึกข้อมูลผู้ใช้ลง localStorage
        const userSession = {
          ...user,
          loginTime: new Date().toISOString(),
          token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
        
        localStorage.setItem('biosticker_user', JSON.stringify(userSession));
        
        toast({
          title: "🎉 เข้าสู่ระบบสำเร็จ!",
          description: `ยินดีต้อนรับ ${user.name}`,
          duration: 3000
        });

        // เรียก callback function
        onLogin(userSession);
        
      } else {
        toast({
          title: "❌ เข้าสู่ระบบไม่สำเร็จ",
          description: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
          variant: "destructive",
          duration: 4000
        });
      }
    } catch (error) {
      toast({
        title: "❌ เกิดข้อผิดพลาด",
        description: "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
        duration: 4000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <Lock className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">เข้าสู่ระบบ</h1>
          <p className="text-gray-600">BIO STICKER Sales Management</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                ชื่อผู้ใช้
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="username"
                  type="text"
                  placeholder="กรอกชื่อผู้ใช้"
                  value={credentials.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                รหัสผ่าน
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="กรอกรหัสผ่าน"
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading || !credentials.username || !credentials.password}
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  เข้าสู่ระบบ
                </>
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3">ข้อมูลสำหรับทดสอบ:</p>
            <div className="space-y-2 text-xs">
              <div className="bg-gray-50 p-2 rounded">
                <strong>Admin:</strong> admin / admin123
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <strong>Manager:</strong> manager / manager123
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <strong>Staff:</strong> staff / staff123
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            © 2024 BIO STICKER. สงวนลิขสิทธิ์.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login; 