import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Teams = ({ salesData, teams, onAddTeam, onUpdateTeam, onDeleteTeam }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [newTeam, setNewTeam] = useState({ name: '', leader: '', color: '#10B981' });

  const teamStats = teams.map(team => {
    const teamSales = salesData.filter(sale => sale.teamId === team.id);
    const teamTotal = teamSales.reduce((sum, sale) => sum + sale.amount, 0);
    return { ...team, totalSales: teamTotal, orderCount: teamSales.length };
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddTeam(newTeam);
    setIsAddModalOpen(false);
    setNewTeam({ name: '', leader: '', color: '#10B981' });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdateTeam(editingTeam);
    setEditingTeam(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">จัดการทีมขาย</h2>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มทีมใหม่
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamStats.map((team) => (
          <div key={team.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: team.color }}></div>
                <h3 className="text-lg font-bold text-gray-900">{team.name}</h3>
              </div>
              <div className="flex space-x-1">
                <Button size="sm" variant="ghost" onClick={() => setEditingTeam(team)}><Edit className="w-4 h-4" /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>คุณแน่ใจหรือไม่?</AlertDialogTitle><AlertDialogDescription>การกระทำนี้ไม่สามารถย้อนกลับได้ ทีมนี้จะถูกลบออกจากระบบอย่างถาวร</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDeleteTeam(team.id)} className="bg-destructive hover:bg-destructive/90">ลบ</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="space-y-3">
              <div><p className="text-sm text-gray-600">แม่ทีม</p><p className="font-medium text-gray-900">{team.leader}</p></div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-gray-600">ยอดขายรวม</p><p className="text-lg font-bold text-emerald-600">฿{team.totalSales.toLocaleString()}</p></div>
                <div><p className="text-sm text-gray-600">จำนวนออเดอร์</p><p className="text-lg font-bold text-blue-600">{team.orderCount}</p></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>เพิ่มทีมใหม่</DialogTitle></DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div><Label htmlFor="name">ชื่อทีม</Label><Input id="name" value={newTeam.name} onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })} required /></div>
            <div><Label htmlFor="leader">ชื่อแม่ทีม</Label><Input id="leader" value={newTeam.leader} onChange={(e) => setNewTeam({ ...newTeam, leader: e.target.value })} required /></div>
            <div><Label htmlFor="color">สีทีม</Label><Input id="color" type="color" value={newTeam.color} onChange={(e) => setNewTeam({ ...newTeam, color: e.target.value })} className="p-1 h-10" /></div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="secondary">ยกเลิก</Button></DialogClose>
              <Button type="submit">สร้างทีม</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {editingTeam && (
        <Dialog open={!!editingTeam} onOpenChange={() => setEditingTeam(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>แก้ไขทีม</DialogTitle></DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div><Label htmlFor="edit-name">ชื่อทีม</Label><Input id="edit-name" value={editingTeam.name} onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })} required /></div>
              <div><Label htmlFor="edit-leader">ชื่อแม่ทีม</Label><Input id="edit-leader" value={editingTeam.leader} onChange={(e) => setEditingTeam({ ...editingTeam, leader: e.target.value })} required /></div>
              <div><Label htmlFor="edit-color">สีทีม</Label><Input id="edit-color" type="color" value={editingTeam.color} onChange={(e) => setEditingTeam({ ...editingTeam, color: e.target.value })} className="p-1 h-10" /></div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="secondary">ยกเลิก</Button></DialogClose>
                <Button type="submit">บันทึกการเปลี่ยนแปลง</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
};

export default Teams;