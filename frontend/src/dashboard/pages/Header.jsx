import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, TrendingUp, User, DollarSign, Link as LinkIcon, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';

const Header = ({ activeTab, setActiveTab }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Mock user data - ในการใช้งานจริงควรดึงจาก context หรือ state management
  const currentUser = {
    name: 'Admin User',
    email: 'admin@biosticker.co',
    role: 'Administrator'
  };

  const handleLogout = () => {
    // ในการใช้งานจริงควรเคลียร์ token และ redirect ไป login page
    if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
      window.location.href = '/';
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'แดชบอร์ด', icon: TrendingUp },
    { id: 'sales', label: 'ยอดขาย', icon: DollarSign },
    { id: 'accounts', label: 'บัญชี', icon: User },
    { id: 'upload', label: 'อัปโหลด', icon: Upload },
    { id: 'integration', label: 'การเชื่อมต่อ', icon: LinkIcon }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setShowMobileMenu(false);
  };

  return (
    <header className="bg-white border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-2 sm:space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">ระบบจัดการยอดขาย</h1>
              <p className="text-xs sm:text-sm text-emerald-600">Line Products Sales Management</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-lg font-bold text-gray-900">BIO STICKER</h1>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <nav className="flex space-x-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Button>
              ))}
            </nav>

            {/* Desktop User Account Section */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Desktop Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveTab('accounts');
                        setShowUserMenu(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      <User className="w-4 h-4 mr-3" />
                      จัดการบัญชี
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      ออกจากระบบ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile User Avatar */}
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation Menu */}
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-emerald-100 py-4"
          >
            {/* Mobile Navigation */}
            <nav className="space-y-2 mb-4">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center space-x-3 w-full justify-start ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </Button>
              ))}
            </nav>

            {/* Mobile User Section */}
            <div className="border-t border-emerald-100 pt-4">
              <div className="flex items-center space-x-3 mb-3 px-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setActiveTab('accounts');
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-3 w-full justify-start text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                >
                  <User className="w-5 h-5" />
                  <span>จัดการบัญชี</span>
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full justify-start text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>ออกจากระบบ</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;