import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { User, DollarSign, Hash, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Accounts = ({ salesData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const accountStats = useMemo(() => {
    const stats = salesData.reduce((acc, sale) => {
      if (!acc[sale.lineName]) {
        acc[sale.lineName] = {
          lineName: sale.lineName,
          totalSales: 0,
          orderCount: 0,
        };
      }
      acc[sale.lineName].totalSales += sale.amount;
      acc[sale.lineName].orderCount += 1;
      return acc;
    }, {});

    return Object.values(stats).sort((a, b) => b.totalSales - a.totalSales);
  }, [salesData]);

  const filteredAccounts = accountStats.filter(account =>
    account.lineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
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
    </motion.div>
  );
};

export default Accounts;