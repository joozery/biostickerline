import React from 'react';
import { motion } from 'framer-motion';
import { Upload, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ระบบจัดการยอดขาย</h1>
              <p className="text-sm text-emerald-600">Line Products Sales Management</p>
            </div>
          </motion.div>

          <nav className="flex space-x-1">
            {[
              { id: 'dashboard', label: 'แดชบอร์ด', icon: TrendingUp },
              { id: 'sales', label: 'ยอดขาย', icon: DollarSign },
              { id: 'teams', label: 'ทีมขาย', icon: Users },
              { id: 'upload', label: 'อัปโหลด', icon: Upload }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;