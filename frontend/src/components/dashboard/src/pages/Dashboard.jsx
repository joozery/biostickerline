import React from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, DollarSign, Users, UserCheck } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
      </div>
      <div className={`w-12 h-12 ${colorClass.replace('text-', 'bg-').replace('-600', '-100')} rounded-xl flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
    </div>
  </div>
);

const Dashboard = ({ salesData }) => {
  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
  const totalOrders = salesData.length;
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  const salesByPerson = salesData.reduce((acc, sale) => {
    if (!acc[sale.lineName]) {
      acc[sale.lineName] = { totalSales: 0, orderCount: 0, lineName: sale.lineName };
    }
    acc[sale.lineName].totalSales += sale.amount;
    acc[sale.lineName].orderCount += 1;
    return acc;
  }, {});

  const uniqueCustomers = Object.keys(salesByPerson).length;
  const topCustomers = Object.values(salesByPerson).sort((a, b) => b.totalSales - a.totalSales).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="ยอดขายรวม" value={`฿${totalSales.toLocaleString()}`} icon={DollarSign} colorClass="text-emerald-600" />
        <StatCard title="จำนวนออเดอร์" value={totalOrders.toLocaleString()} icon={FileText} colorClass="text-blue-600" />
        <StatCard title="ลูกค้าทั้งหมด" value={uniqueCustomers.toLocaleString()} icon={Users} colorClass="text-indigo-600" />
        <StatCard title="เฉลี่ยต่อออเดอร์" value={`฿${Math.round(avgOrderValue).toLocaleString()}`} icon={TrendingUp} colorClass="text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">ยอดขายล่าสุด</h2>
          <div className="space-y-4">
            {salesData.slice(0, 5).map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-4">
                   <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{sale.lineName}</p>
                    <p className="text-sm text-gray-600">{sale.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">฿{sale.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{new Date(sale.date).toLocaleDateString('th-TH')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">ลูกค้า Top 5</h2>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={customer.lineName} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-gray-400 w-5 text-center">{index + 1}</span>
                  <div>
                    <p className="font-medium text-gray-900">{customer.lineName}</p>
                    <p className="text-sm text-gray-500">{customer.orderCount} ออเดอร์</p>
                  </div>
                </div>
                <p className="font-bold text-emerald-600">฿{customer.totalSales.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;