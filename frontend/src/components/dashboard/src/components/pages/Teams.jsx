import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Teams = ({ salesData, teams }) => {
  const { toast } = useToast();

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
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">จัดการทีมขาย</h2>
        <Button
          onClick={() => {
            toast({
              title: "🚧 ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอได้ในพรอมต์ถัดไป! 🚀"
            });
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มทีมใหม่
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamStats.map((team) => (
          <div key={team.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: team.color }}
                ></div>
                <h3 className="text-lg font-bold text-gray-900">{team.name}</h3>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    toast({
                      title: "🚧 ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอได้ในพรอมต์ถัดไป! 🚀"
                    });
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">แม่ทีม</p>
                <p className="font-medium text-gray-900">{team.leader}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">ยอดขายรวม</p>
                  <p className="text-lg font-bold text-emerald-600">
                    ฿{team.totalSales.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">จำนวนออเดอร์</p>
                  <p className="text-lg font-bold text-blue-600">{team.orderCount}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">ค่าเฉลี่ยต่อออเดอร์</p>
                <p className="text-lg font-bold text-purple-600">
                  ฿{team.orderCount > 0 ? Math.round(team.totalSales / team.orderCount).toLocaleString() : '0'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Teams;