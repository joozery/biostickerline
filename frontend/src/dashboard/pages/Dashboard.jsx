import React from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, DollarSign, Users, UserCheck, Calendar, ShoppingCart, CheckCircle, Clock } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }) => (
  <div className="bg-white rounded-2xl p-4 sm:p-6 border border-emerald-100 shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
        <p className={`text-xl sm:text-2xl lg:text-3xl font-bold ${colorClass} truncate`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1 truncate">{subtitle}</p>}
      </div>
      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colorClass.replace('text-', 'bg-').replace('-600', '-100')} rounded-xl flex items-center justify-center flex-shrink-0 ml-3`}>
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colorClass}`} />
      </div>
    </div>
  </div>
);

const Dashboard = ({ salesData = [] }) => {
  console.log('Dashboard salesData:', salesData); // Debug log
  
  // คำนวณสถิติ
  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
  const totalOrders = salesData.length;
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  // สถิติเพิ่มเติม
  const verifiedOrders = salesData.filter(sale => sale.status === 'verified').length;
  const pendingOrders = salesData.filter(sale => sale.status === 'pending').length;
  const todayOrders = salesData.filter(sale => {
    const today = new Date().toISOString().split('T')[0];
    return sale.date === today;
  }).length;

  // วิเคราะห์ลูกค้า
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

  // วิเคราะห์สินค้า
  const productStats = salesData.reduce((acc, sale) => {
    if (!acc[sale.product]) {
      acc[sale.product] = { count: 0, revenue: 0 };
    }
    acc[sale.product].count += sale.quantity;
    acc[sale.product].revenue += sale.amount;
    return acc;
  }, {});

  const topProducts = Object.entries(productStats)
    .map(([product, stats]) => ({ product, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // ข้อมูลการขายรายวัน (7 วันล่าสุด)
  const dailySales = salesData.reduce((acc, sale) => {
    const date = sale.date;
    if (!acc[date]) {
      acc[date] = { date, amount: 0, orders: 0 };
    }
    acc[date].amount += sale.amount;
    acc[date].orders += 1;
    return acc;
  }, {});

  const recentDays = Object.values(dailySales)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 sm:space-y-8 px-2 sm:px-0"
    >
      {/* Header Stats - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatCard 
          title="ยอดขายรวม" 
          value={`฿${totalSales.toLocaleString()}`} 
          subtitle={`จากทั้งหมด ${totalOrders} ออเดอร์`}
          icon={DollarSign} 
          colorClass="text-emerald-600" 
        />
        <StatCard 
          title="จำนวนออเดอร์" 
          value={totalOrders.toLocaleString()} 
          subtitle={`วันนี้ ${todayOrders} ออเดอร์`}
          icon={FileText} 
          colorClass="text-blue-600" 
        />
        <StatCard 
          title="ลูกค้าทั้งหมด" 
          value={uniqueCustomers.toLocaleString()} 
          subtitle="ลูกค้าที่ไม่ซ้ำกัน"
          icon={Users} 
          colorClass="text-indigo-600" 
        />
        <StatCard 
          title="เฉลี่ยต่อออเดอร์" 
          value={`฿${Math.round(avgOrderValue).toLocaleString()}`} 
          subtitle="มูลค่าเฉลี่ย"
          icon={TrendingUp} 
          colorClass="text-purple-600" 
        />
      </div>

      {/* Status Stats - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <StatCard 
          title="ตรวจสอบแล้ว" 
          value={verifiedOrders.toLocaleString()} 
          icon={CheckCircle} 
          colorClass="text-green-600" 
        />
        <StatCard 
          title="รอตรวจสอบ" 
          value={pendingOrders.toLocaleString()} 
          icon={Clock} 
          colorClass="text-yellow-600" 
        />
        <StatCard 
          title="วันนี้" 
          value={todayOrders.toLocaleString()} 
          icon={Calendar} 
          colorClass="text-orange-600" 
        />
      </div>

      {/* Main Content Grid - Stack on Mobile, Side by Side on Large Screens */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-emerald-100 shadow-lg">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">ยอดขายล่าสุด</h2>
          <div className="space-y-3 sm:space-y-4">
            {salesData.slice(0, 6).map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 ${
                    sale.status === 'verified' ? 'bg-green-100' : 
                    sale.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                  } rounded-full flex items-center justify-center flex-shrink-0`}>
                    <UserCheck className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      sale.status === 'verified' ? 'text-green-600' : 
                      sale.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{sale.lineName}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{sale.product}</p>
                    <p className="text-xs text-gray-500 truncate">{sale.orderNumber || `#${sale.id}`}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="font-bold text-emerald-600 text-sm sm:text-base">฿{sale.amount.toLocaleString()}</p>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">{new Date(sale.date).toLocaleDateString('th-TH')}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    sale.status === 'verified' ? 'bg-green-100 text-green-700' : 
                    sale.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {sale.status === 'verified' ? 'ตรวจสอบแล้ว' : 
                     sale.status === 'pending' ? 'รอตรวจสอบ' : 'ปฏิเสธ'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-emerald-100 shadow-lg">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">ลูกค้า Top 5</h2>
          <div className="space-y-3 sm:space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={customer.lineName} className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 ${
                    index === 0 ? 'bg-yellow-100 text-yellow-600' :
                    index === 1 ? 'bg-gray-100 text-gray-600' :
                    index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                  } rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0`}>
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{customer.lineName}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{customer.orderCount} ออเดอร์</p>
                  </div>
                </div>
                <p className="font-bold text-emerald-600 text-sm sm:text-base flex-shrink-0">฿{customer.totalSales.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics - Stack on Mobile/Tablet */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Top Products */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-emerald-100 shadow-lg">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">สินค้าขายดี</h2>
          <div className="space-y-3 sm:space-y-4">
            {topProducts.map((item, index) => (
              <div key={item.product} className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{item.product}</p>
                    <p className="text-xs sm:text-sm text-gray-500">ขายแล้ว {item.count} ชิ้น</p>
                  </div>
                </div>
                <p className="font-bold text-emerald-600 text-sm sm:text-base flex-shrink-0">฿{item.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Sales */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-emerald-100 shadow-lg">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">ยอดขายรายวัน (7 วันล่าสุด)</h2>
          <div className="space-y-3 sm:space-y-4">
            {recentDays.map((day) => (
              <div key={day.date} className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{new Date(day.date).toLocaleDateString('th-TH')}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{day.orders} ออเดอร์</p>
                  </div>
                </div>
                <p className="font-bold text-emerald-600 text-sm sm:text-base flex-shrink-0">฿{day.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;