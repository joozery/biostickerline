import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Eye, Edit, Trash2, Upload, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Sales = ({ salesData, onUpdateSale, onDeleteSale }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [viewingSale, setViewingSale] = useState(null);
  const [editingSale, setEditingSale] = useState(null);
  const { toast } = useToast();

  const filteredSalesData = salesData.filter(sale => {
    const matchesSearch = (sale.lineName && sale.lineName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         sale.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProduct = selectedProduct === 'all' || sale.product === selectedProduct;
    return matchesSearch && matchesProduct;
  });

  const handleExport = () => {
    if (filteredSalesData.length === 0) {
      toast({ title: "ไม่มีข้อมูลให้ส่งออก", variant: "destructive" });
      return;
    }
    const headers = "วันที่,ผู้แจ้งยอด (Line),สินค้า,จำนวน,ยอดเงิน,ที่มา\n";
    const csvContent = filteredSalesData.map(sale => {
      return `${sale.date},${sale.lineName},${sale.product},${sale.quantity},${sale.amount},${sale.source}`;
    }).join('\n');
    const blob = new Blob([`\uFEFF${headers}${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "sales_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "✅ ส่งออกข้อมูลสำเร็จ!", description: "ไฟล์ CSV กำลังถูกดาวน์โหลด" });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdateSale(editingSale);
    setEditingSale(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <Label htmlFor="search">ค้นหา</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input id="search" type="text" placeholder="ค้นหาชื่อ Line หรือสินค้า..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="product-filter">สินค้า</Label>
            <select id="product-filter" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className="w-full h-10 px-3 border border-input rounded-md">
              <option value="all">ทุกสินค้า</option>
              <option value="สติกเกอร์ไลน์">สติกเกอร์ไลน์</option>
              <option value="Line Theme">Line Theme</option>
              <option value="Line Melody">Line Melody</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleExport} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              ส่งออกข้อมูล
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้แจ้งยอด (Line)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สินค้า</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ยอดเงิน</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ที่มา</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSalesData.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(sale.date).toLocaleDateString('th-TH')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.lineName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">฿{(parseFloat(sale.amount) || 0).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.source === 'LINE Bot' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Bot className="w-3 h-3 mr-1.5" />
                          LINE Bot
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Upload className="w-3 h-3 mr-1.5" />
                          Manual
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" onClick={() => setViewingSale(sale)}><Eye className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingSale(sale)}><Edit className="w-4 h-4" /></Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader><AlertDialogTitle>คุณแน่ใจหรือไม่?</AlertDialogTitle><AlertDialogDescription>การกระทำนี้ไม่สามารถย้อนกลับได้ รายการขายนี้จะถูกลบออกจากระบบอย่างถาวร</AlertDialogDescription></AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                              <AlertDialogAction onClick={() => onDeleteSale(sale.id)} className="bg-destructive hover:bg-destructive/90">ลบ</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewingSale && (
        <Dialog open={!!viewingSale} onOpenChange={() => setViewingSale(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>รายละเอียดการขาย</DialogTitle>
              <DialogDescription>จาก: {viewingSale.lineName} วันที่: {new Date(viewingSale.date).toLocaleDateString('th-TH')}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {viewingSale.slipImage && <img src={viewingSale.slipImage} alt="สลิป" className="rounded-lg w-full" />}
              <p><strong>สินค้า:</strong> {viewingSale.product}</p>
              <p><strong>จำนวน:</strong> {viewingSale.quantity}</p>
              <p><strong>ยอดเงิน:</strong> ฿{(parseFloat(viewingSale.amount) || 0).toLocaleString()}</p>
              <p><strong>ที่มา:</strong> {viewingSale.source}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {editingSale && (
        <Dialog open={!!editingSale} onOpenChange={() => setEditingSale(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>แก้ไขรายการขาย</DialogTitle></DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <Label htmlFor="edit-lineName">ชื่อ Line</Label>
                <Input id="edit-lineName" value={editingSale.lineName} onChange={(e) => setEditingSale({ ...editingSale, lineName: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="edit-product">สินค้า</Label>
                <select id="edit-product" value={editingSale.product} onChange={(e) => setEditingSale({ ...editingSale, product: e.target.value })} className="w-full h-10 px-3 border border-input rounded-md">
                  <option value="สติกเกอร์ไลน์">สติกเกอร์ไลน์</option>
                  <option value="Line Theme">Line Theme</option>
                  <option value="Line Melody">Line Melody</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-amount">ยอดเงิน</Label>
                <Input id="edit-amount" type="number" value={editingSale.amount} onChange={(e) => setEditingSale({ ...editingSale, amount: Number(e.target.value) })} />
              </div>
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

export default Sales;