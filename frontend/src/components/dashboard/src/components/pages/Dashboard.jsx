import React from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, DollarSign } from 'lucide-react';

const Dashboard = ({ salesData, teams }) => {
  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
  const totalOrders = salesData.length;
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  const teamStats = teams.map(team => {
    const teamSales = salesData.filter(sale => sale.teamId === team.id);
    const teamTotal = teamSales.reduce((sum, sale) => sum + sale.amount, 0);
    return {
      ...team,
      totalSales: teamTotal,
      orderCount: teamSales.length
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ยอดขายรวม</p>
              <p className="text-3xl font-bold text-emerald-600">
                ฿{totalSales.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">จำนวนออเดอร์</p>
              <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ค่าเฉลี่ยต่อออเดอร์</p>
              <p className="text-3xl font-bold text-purple-600">
                ฿{Math.round(avgOrderValue).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">ผลงานแต่ละทีม</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamStats.map((team) => (
            <div key={team.id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: team.color }}
                ></div>
                <h3 className="font-semibold text-gray-900">{team.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">แม่ทีม: {team.leader}</p>
              <div className="space-y-1">
                <p className="text-lg font-bold text-gray-900">
                  ฿{team.totalSales.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">{team.orderCount} ออเดอร์</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">ยอดขายล่าสุด</h2>
        <div className="space-y-4">
          {salesData.slice(0, 5).map((sale) => {
            const team = teams.find(t => t.id === sale.teamId);
            return (
              <div key={sale.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: team?.color || '#gray' }}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900">{sale.lineName}</p>
                    <p className="text-sm text-gray-600">{sale.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">฿{sale.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{sale.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;