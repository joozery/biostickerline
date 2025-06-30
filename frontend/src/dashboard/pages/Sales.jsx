import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Eye, Edit, Trash2, Upload, Bot, Calendar, User, Package, DollarSign, CheckCircle, XCircle, ImageIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const SaleCard = ({ sale, onView, onEdit, onDelete, onVerify, onReject }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm truncate">{sale.lineName}</p>
            <p className="text-xs text-gray-500">{sale.orderNumber || `#${sale.id}`}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{new Date(sale.date).toLocaleDateString('th-TH')}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">{sale.product}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-bold text-emerald-600">฿{(parseFloat(sale.amount) || 0).toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 ml-3">
        <span className={`text-xs px-2 py-1 rounded-full ${
          sale.status === 'verified' ? 'bg-green-100 text-green-700' : 
          sale.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
        }`}>
          {sale.status === 'verified' ? 'ตรวจสอบแล้ว' : 
           sale.status === 'pending' ? 'รอตรวจสอบ' : 'ปฏิเสธ'}
        </span>
      </div>
    </div>
    
    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
      <div className="flex items-center space-x-1">
        {sale.source === 'LINE Bot' ? (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Bot className="w-3 h-3 mr-1" />
            LINE Bot
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Upload className="w-3 h-3 mr-1" />
            Manual
          </span>
        )}
      </div>
      
      <div className="flex space-x-1">
        <Button size="sm" variant="ghost" onClick={() => onView(sale)} className="h-8 w-8 p-0">
          <Eye className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onEdit(sale)} className="h-8 w-8 p-0">
          <Edit className="w-4 h-4" />
        </Button>
        {sale.status === 'pending' && (
          <>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onVerify(sale)}
              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
              title="อนุมัติ"
            >
              <CheckCircle className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onReject(sale)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              title="ปฏิเสธ"
            >
              <XCircle className="w-4 h-4" />
            </Button>
          </>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 h-8 w-8 p-0">
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
                                  <AlertDialogContent className="bg-gradient-to-br from-red-50 to-pink-100 border-red-200">
                          <AlertDialogHeader>
                            <AlertDialogTitle>คุณแน่ใจหรือไม่?</AlertDialogTitle>
                            <AlertDialogDescription>การกระทำนี้ไม่สามารถย้อนกลับได้ รายการขายนี้จะถูกลบออกจากระบบอย่างถาวร</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(sale.id)} className="bg-destructive hover:bg-destructive/90">ลบ</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </div>
);

const Sales = ({ salesData, slipsData = [], onUpdateSale, onDeleteSale, isOnline }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewingSale, setViewingSale] = useState(null);
  const [editingSale, setEditingSale] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  console.log('📊 Sales component received data:', salesData);
  console.log('🔢 Sales data length:', salesData.length);
  console.log('🖼️ Slips component received data:', slipsData);
  console.log('🔢 Slips data length:', slipsData.length);

  // ฟังก์ชันหาสลีปที่เกี่ยวข้องกับการขายโดยเฉพาะ
  const [saleSlips, setSaleSlips] = useState({});
  const [loadingSlips, setLoadingSlips] = useState({});

  const getRelatedSlips = async (sale) => {
    if (!sale?.id) return [];
    
    // ถ้าเคยโหลดแล้ว ส่งค่าที่เก็บไว้
    if (saleSlips[sale.id]) {
      return saleSlips[sale.id];
    }
    
    // ถ้ากำลังโหลดอยู่ ส่งค่าว่าง
    if (loadingSlips[sale.id]) {
      return [];
    }
    
    try {
      setLoadingSlips(prev => ({ ...prev, [sale.id]: true }));
      
      console.log('🔍 Loading slips for sale:', sale);
      
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://biosticker-backend-9178b2fa5a35.herokuapp.com/api';
      
      // ลองหาจาก sale_id ก่อน
      let response = await fetch(`${API_BASE_URL}/slips?sale_id=${sale.id}&t=${Date.now()}`);
      let relatedSlips = [];
      
      if (response.ok) {
        relatedSlips = await response.json();
        console.log('✅ Found slips by sale_id:', relatedSlips.length);
      }
      
      // ถ้าไม่เจอ ลองหาจาก order_number
      if (relatedSlips.length === 0 && sale.orderNumber) {
        response = await fetch(`${API_BASE_URL}/slips?order_number=${sale.orderNumber}&t=${Date.now()}`);
        if (response.ok) {
          relatedSlips = await response.json();
          console.log('✅ Found slips by order_number:', relatedSlips.length);
        }
      }
      
      // เก็บผลลัพธ์
      setSaleSlips(prev => ({ ...prev, [sale.id]: relatedSlips }));
      
      return relatedSlips;
      
    } catch (error) {
      console.error('❌ Error loading slips for sale:', error);
      return [];
    } finally {
      setLoadingSlips(prev => ({ ...prev, [sale.id]: false }));
         }
   };

  // ค้นหา ORDER NUMBER ที่ user กำลังถามหา
  const orderORD94902550 = salesData.find(sale => 
    sale.orderNumber === 'ORD94902550' || 
    sale.orderNumber === 'ORD94920407' ||
    sale.product?.includes('สติกเกอร์หมี') ||
    sale.lineName === 'Juu'
  );
  
  if (orderORD94902550) {
    console.log('🎯 Found order:', orderORD94902550);
  } else {
    console.log('❌ ไม่พบออเดอร์ ORD94902550 ในข้อมูล');
    console.log('📋 ออเดอร์ที่มีในระบบ:', salesData.map(s => s.orderNumber).filter(Boolean));
  }

  // ฟังก์ชันรีเฟรชข้อมูล
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://biosticker-backend-9178b2fa5a35.herokuapp.com/api';
      const response = await fetch(`${API_BASE_URL}/sales?status=all&limit=100&t=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const freshData = await response.json();
      console.log('🔄 Fresh data received:', freshData);
      
      // ส่งข้อมูลใหม่ไปยัง parent component
      window.location.reload(); // รีโหลดหน้าเพื่อให้ข้อมูลอัพเดท
      
      toast({
        title: "🔄 รีเฟรชข้อมูลสำเร็จ",
        description: `อัพเดทข้อมูล ${freshData.length} รายการ`,
      });
    } catch (error) {
      console.error('❌ Refresh error:', error);
      toast({
        title: "❌ รีเฟรชไม่สำเร็จ",
        description: `เกิดข้อผิดพลาด: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setRefreshing(false);
    }
  };

  // ฟังก์ชันดีบั๊กฐานข้อมูล
  const handleDebug = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://biosticker-backend-9178b2fa5a35.herokuapp.com/api';
      const response = await fetch(`${API_BASE_URL}/debug`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const debugData = await response.json();
      console.log('🔍 Debug data:', debugData);
      
      toast({
        title: "🔍 ข้อมูลดีบั๊ก",
        description: "ตรวจสอบ Console (F12) เพื่อดูข้อมูลฐานข้อมูล",
      });
    } catch (error) {
      console.error('❌ Debug error:', error);
      toast({
        title: "❌ ดีบั๊กไม่สำเร็จ",
        description: `เกิดข้อผิดพลาด: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  // ฟังก์ชันตรวจสอบข้อมูลเฉพาะ (ORD95634484)
  const checkSpecificOrder = () => {
    const targetOrders = ['ORD95634484', 'ORD94902550', 'ORD94920407'];
    const foundOrders = salesData.filter(sale => 
      targetOrders.includes(sale.orderNumber) ||
      sale.lineName?.includes('Juu') ||
      sale.product?.includes('สติกเกอร์หมี')
    );
    
    console.log('🎯 Target orders:', targetOrders);
    console.log('🔍 Found matching orders:', foundOrders);
    console.log('📊 All orders in system:', salesData.map(s => ({
      id: s.id,
      orderNumber: s.orderNumber,
      lineName: s.lineName,
      product: s.product,
      amount: s.amount,
      date: s.date
    })));
    
    if (foundOrders.length > 0) {
      toast({
        title: "🎯 พบข้อมูลแล้ว!",
        description: `พบ ${foundOrders.length} รายการที่ตรงกัน ตรวจสอบ Console`,
      });
    } else {
      toast({
        title: "❌ ไม่พบข้อมูล",
        description: "ไม่พบออเดอร์ที่ค้นหา ตรวจสอบ Console สำหรับรายละเอียด",
        variant: "destructive"
      });
    }
  };

  const filteredSalesData = salesData.filter(sale => {
    const matchesSearch = (sale.lineName && sale.lineName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (sale.orderNumber && sale.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProduct = selectedProduct === 'all' || sale.product.includes(selectedProduct);
    const matchesStatus = selectedStatus === 'all' || sale.status === selectedStatus;
    return matchesSearch && matchesProduct && matchesStatus;
  });

  const handleExport = () => {
    if (filteredSalesData.length === 0) {
      toast({ title: "ไม่มีข้อมูลให้ส่งออก", variant: "destructive" });
      return;
    }
    const headers = "วันที่,ผู้แจ้งยอด (Line),สินค้า,จำนวน,ยอดเงิน,ที่มา,สถานะ,เบอร์โทร,หมายเลขออเดอร์\n";
    const csvContent = filteredSalesData.map(sale => {
      return `${sale.date},${sale.lineName},${sale.product},${sale.quantity},${sale.amount},${sale.source},${sale.status},${sale.phoneNumber || ''},${sale.orderNumber || ''}`;
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

  const handleVerify = (sale) => {
    const updatedSale = { ...sale, status: 'verified' };
    onUpdateSale(updatedSale);
    setViewingSale(null);
    toast({
      title: "🎉 ตรวจสอบเรียบร้อย!",
      description: `รายการ ${sale.orderNumber || `#${sale.id}`} ของ ${sale.lineName} ยอด ฿${(parseFloat(sale.amount) || 0).toLocaleString()} ได้รับการอนุมัติเรียบร้อยแล้ว`,
      duration: 5000, // แสดง 5 วินาที
    });
  };

  const handleReject = (sale) => {
    const updatedSale = { ...sale, status: 'rejected' };
    onUpdateSale(updatedSale);
    setViewingSale(null);
    toast({
      title: "❌ ปฏิเสธรายการเรียบร้อย",
      description: `รายการ ${sale.orderNumber || `#${sale.id}`} ของ ${sale.lineName} ยอด ฿${(parseFloat(sale.amount) || 0).toLocaleString()} ถูกปฏิเสธแล้ว`,
      variant: "destructive",
      duration: 5000, // แสดง 5 วินาที
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="space-y-4 sm:space-y-6 px-2 sm:px-0"
    >
      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-emerald-100 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Label htmlFor="search" className="text-sm font-medium">ค้นหา</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                id="search" 
                type="text" 
                placeholder="ชื่อ Line, สินค้า, หมายเลขออเดอร์..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-10 text-sm" 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="product-filter" className="text-sm font-medium">สินค้า</Label>
            <select 
              id="product-filter" 
              value={selectedProduct} 
              onChange={(e) => setSelectedProduct(e.target.value)} 
              className="w-full h-10 px-3 border border-input rounded-md text-sm mt-1"
            >
              <option value="all">ทุกสินค้า</option>
              <option value="สติกเกอร์ไลน์">สติกเกอร์ไลน์</option>
              <option value="Line Theme">Line Theme</option>
              <option value="Line Melody">Line Melody</option>
              <option value="Line Emoji">Line Emoji</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="status-filter" className="text-sm font-medium">สถานะ</Label>
            <select 
              id="status-filter" 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)} 
              className="w-full h-10 px-3 border border-input rounded-md text-sm mt-1"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="verified">ตรวจสอบแล้ว</option>
              <option value="pending">รอตรวจสอบ</option>
              <option value="rejected">ปฏิเสธ</option>
            </select>
          </div>
          
          <div className="flex items-end gap-2">
            <Button 
              onClick={handleRefresh} 
              disabled={refreshing}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm"
            >
              {refreshing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              <span className="hidden sm:inline">{refreshing ? 'กำลังรีเฟรช...' : 'รีเฟรชข้อมูล'}</span>
              <span className="sm:hidden">รีเฟรช</span>
            </Button>
            <Button onClick={handleExport} className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">ส่งออกข้อมูล</span>
              <span className="sm:hidden">ส่งออก</span>
            </Button>
          </div>
        </div>
        
        {/* Results Count & Debug Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              แสดง {filteredSalesData.length} รายการ จากทั้งหมด {salesData.length} รายการ
              {slipsData.length > 0 && (
                <span className="ml-2 text-blue-600">
                  | มีสลีป {slipsData.length} รูป
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500">
              📡 {isOnline ? 'ออนไลน์' : 'ออฟไลน์'}
            </p>
          </div>
          
          {/* Debug Info when no data */}
          {salesData.length === 0 && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="text-sm font-semibold text-yellow-800 mb-2">🔍 ข้อมูลการดีบั๊ก</h4>
              <div className="text-xs text-yellow-700 space-y-1">
                <p>📊 จำนวนข้อมูล: {salesData.length} รายการ</p>
                <p>🌐 สถานะ: {isOnline ? '✅ เชื่อมต่อแล้ว' : '❌ ไม่สามารถเชื่อมต่อ'}</p>
                <p>🔗 API: biosticker-backend-9178b2fa5a35.herokuapp.com</p>
                                 <p>💡 ลองกด "รีเฟรชข้อมูล" หากเพิ่งส่งข้อมูลจาก LINE Bot</p>
                 <div className="mt-2">
                   <Button 
                     onClick={handleDebug} 
                     size="sm" 
                     variant="outline"
                     className="text-xs border-yellow-300 text-yellow-700 hover:bg-yellow-100 mr-2"
                   >
                     🔍 ตรวจสอบฐานข้อมูล
                   </Button>
                   <Button 
                     onClick={checkSpecificOrder} 
                     size="sm" 
                     variant="outline"
                     className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
                   >
                     🎯 ค้นหาออเดอร์ Juu
                   </Button>
                 </div>
               </div>
             </div>
           )}
          
          {/* ORD Debug Info */}
          {salesData.length > 0 && !orderORD94902550 && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">🔍 ไม่พบออเดอร์ ORD94902550</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p>📋 ออเดอร์ที่มีในระบบ:</p>
                <p className="font-mono bg-white px-2 py-1 rounded text-blue-800">
                  {salesData.map(s => s.orderNumber || `#${s.id}`).join(', ') || 'ไม่มีออเดอร์'}
                </p>
                <p>💡 หากเพิ่งส่งข้อมูลใหม่ ลองรีเฟรช</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้แจ้งยอด</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สินค้า</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ยอดเงิน</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ที่มา</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSalesData.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(sale.date).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{sale.lineName}</div>
                      <div className="text-xs text-gray-500">{sale.orderNumber || `#${sale.id}`}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">
                    ฿{(parseFloat(sale.amount) || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      sale.status === 'verified' ? 'bg-green-100 text-green-800' : 
                      sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {sale.status === 'verified' ? 'ตรวจสอบแล้ว' : 
                       sale.status === 'pending' ? 'รอตรวจสอบ' : 'ปฏิเสธ'}
                    </span>
                  </td>
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
                      <Button size="sm" variant="ghost" onClick={() => setViewingSale(sale)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingSale(sale)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      {sale.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleVerify(sale)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            title="อนุมัติ"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleReject(sale)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="ปฏิเสธ"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                                                  <AlertDialogContent className="bg-gradient-to-br from-red-50 to-pink-100 border-red-200">
                            <AlertDialogHeader>
                              <AlertDialogTitle>คุณแน่ใจหรือไม่?</AlertDialogTitle>
                              <AlertDialogDescription>
                                การกระทำนี้ไม่สามารถย้อนกลับได้ รายการขายนี้จะถูกลบออกจากระบบอย่างถาวร
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                              <AlertDialogAction onClick={() => onDeleteSale(sale.id)} className="bg-destructive hover:bg-destructive/90">
                                ลบ
                              </AlertDialogAction>
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

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {filteredSalesData.map((sale) => (
          <SaleCard 
            key={sale.id} 
            sale={sale} 
            onView={setViewingSale}
            onEdit={setEditingSale}
            onDelete={onDeleteSale}
            onVerify={handleVerify}
            onReject={handleReject}
          />
        ))}
        
        {filteredSalesData.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-emerald-100">
            <p className="text-gray-500 text-lg">ไม่พบข้อมูลที่ตรงกับการค้นหา</p>
          </div>
        )}
      </div>

      {/* View Sale Dialog */}
      {viewingSale && (
        <Dialog open={!!viewingSale} onOpenChange={() => setViewingSale(null)}>
          <DialogContent className="max-w-2xl bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200">
            <DialogHeader>
              <DialogTitle>รายละเอียดการขาย</DialogTitle>
              <DialogDescription>
                จาก: {viewingSale.lineName} วันที่: {new Date(viewingSale.date).toLocaleDateString('th-TH')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* ข้อมูลการขาย */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <p><strong>หมายเลขออเดอร์:</strong> {viewingSale.orderNumber || `#${viewingSale.id}`}</p>
                  <p><strong>สินค้า:</strong> {viewingSale.product}</p>
                  <p><strong>จำนวน:</strong> {viewingSale.quantity} ชิ้น</p>
                  <p><strong>ยอดเงิน:</strong> ฿{(parseFloat(viewingSale.amount) || 0).toLocaleString()}</p>
                  <p><strong>ที่มา:</strong> {viewingSale.source}</p>
                  <p><strong>วิธีชำระเงิน:</strong> {viewingSale.paymentMethod || 'ไม่ระบุ'}</p>
                  {viewingSale.phoneNumber && <p><strong>เบอร์โทร:</strong> {viewingSale.phoneNumber}</p>}
                  {viewingSale.note && <p><strong>หมายเหตุ:</strong> {viewingSale.note}</p>}
                  <p><strong>สถานะ:</strong> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      viewingSale.status === 'verified' ? 'bg-green-100 text-green-700' : 
                      viewingSale.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {viewingSale.status === 'verified' ? 'ตรวจสอบแล้ว' : 
                       viewingSale.status === 'pending' ? 'รอตรวจสอบ' : 'ปฏิเสธ'}
                    </span>
                  </p>
                </div>

                {/* สลีปที่เกี่ยวข้อง */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    สลีปที่เกี่ยวข้อง
                  </h4>
                  {(() => {
                    const relatedSlips = saleSlips[viewingSale.id] || [];
                    const loading = loadingSlips[viewingSale.id];
                    
                    // โหลดสลีปถ้ายังไม่ได้โหลด
                    if (!relatedSlips.length && !loading && !saleSlips[viewingSale.id]) {
                      getRelatedSlips(viewingSale);
                    }
                    
                    if (loading) {
                      return (
                        <div className="text-sm text-gray-500 bg-blue-50 border border-blue-200 p-3 rounded-lg">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                          <p className="text-center">กำลังโหลดสลีป...</p>
                        </div>
                      );
                    }
                    
                    if (relatedSlips.length === 0) {
                      return (
                        <div className="text-sm text-gray-500 bg-orange-50 border border-orange-200 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <ImageIcon className="w-6 h-6 text-orange-400 mr-2" />
                              <p className="font-medium text-orange-700">ไม่พบสลีปที่เกี่ยวข้อง</p>
                            </div>
                            <button 
                              onClick={() => {
                                setSaleSlips(prev => ({ ...prev, [viewingSale.id]: undefined }));
                                getRelatedSlips(viewingSale);
                              }}
                              className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded hover:bg-orange-200 transition-colors"
                            >
                              🔄 รีเฟรช
                            </button>
                          </div>
                          <p className="text-xs text-center text-orange-600">
                            💡 ลองรีเฟรชหากเพิ่งส่งสลีปมาใหม่
                          </p>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-600">
                            ✅ พบสลีป {relatedSlips.length} รูป
                          </span>
                          <button 
                            onClick={() => {
                              setSaleSlips(prev => ({ ...prev, [viewingSale.id]: undefined }));
                              getRelatedSlips(viewingSale);
                            }}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                          >
                            🔄 รีเฟรช
                          </button>
                        </div>
                        
                        <div className="space-y-4 max-h-80 overflow-y-auto">
                          {relatedSlips.map((slip) => (
                            <div key={slip.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                              {/* รูปสลีปด้านบน */}
                              <div className="flex justify-center bg-gray-50 p-4">
                                {slip.optimized_url ? (
                                  <img 
                                    src={slip.optimized_url} 
                                    alt={`สลีป #${slip.id}`}
                                    className="max-w-full max-h-64 object-contain rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={() => {
                                      if (slip.optimized_url) {
                                        window.open(slip.optimized_url, '_blank');
                                      }
                                    }}
                                    onError={(e) => {
                                      e.target.src = slip.image_url || '/placeholder-image.png';
                                    }}
                                  />
                                ) : (
                                  <div className="w-64 h-48 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                    <ImageIcon className="w-12 h-12 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              
                              {/* ข้อมูลสลีปด้านล่าง */}
                              <div className="p-4 bg-white">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-gray-600"><strong>ID สลีป:</strong> #{slip.id}</p>
                                    <p className="text-gray-600"><strong>User ID:</strong></p>
                                    <p className="text-xs text-gray-500 break-all">{slip.user_id || 'ไม่ระบุ'}</p>
                                    {slip.message_id && (
                                      <>
                                        <p className="text-gray-600 mt-1"><strong>Message ID:</strong></p>
                                        <p className="text-xs text-gray-500 break-all">{slip.message_id}</p>
                                      </>
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-gray-600"><strong>ขนาดไฟล์:</strong> {slip.file_size ? (slip.file_size / 1024).toFixed(1) + ' KB' : 'ไม่ทราบ'}</p>
                                    <p className="text-gray-600"><strong>ขนาดรูป:</strong> {slip.image_width && slip.image_height ? `${slip.image_width}x${slip.image_height}` : 'ไม่ทราบ'}</p>
                                    <p className="text-gray-600"><strong>สถานะ:</strong> 
                                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                                        slip.status === 'verified' ? 'bg-green-100 text-green-700' : 
                                        slip.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                      }`}>
                                        {slip.status === 'verified' ? 'ตรวจสอบแล้ว' : 
                                         slip.status === 'pending' ? 'รอตรวจสอบ' : 'ปฏิเสธ'}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                
                                {/* วันที่อัปโหลด */}
                                <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                                  <p className="text-sm text-gray-600">
                                    อัปโหลดเมื่อ: {new Date(slip.upload_date).toLocaleDateString('th-TH')} {new Date(slip.upload_date).toLocaleTimeString('th-TH')}
                                  </p>
                                </div>
                                
                                {/* ลิงก์ดูรูปต้นฉบับ */}
                                {slip.image_url && (
                                  <div className="mt-2 text-center">
                                    <a 
                                      href={slip.image_url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                                    >
                                      🔗 ดูรูปต้นฉบับ
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* แสดงสลีปเก่าถ้ามี */}
              {viewingSale.slipImage && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-semibold text-sm mb-2">สลีปเดิม (จากข้อมูลการขาย)</h4>
                  <img src={viewingSale.slipImage} alt="สลิปเดิม" className="rounded-lg w-full max-h-64 object-contain border border-gray-200" />
                </div>
              )}
            </div>

            {/* Action Buttons for Pending Status */}
            {viewingSale.status === 'pending' && (
              <DialogFooter className="border-t pt-4">
                <div className="flex space-x-2 w-full">
                  <Button 
                    onClick={() => handleReject(viewingSale)}
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    ปฏิเสธ
                  </Button>
                  <Button 
                    onClick={() => handleVerify(viewingSale)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    อนุมัติ
                  </Button>
                </div>
              </DialogFooter>
            )}

            {/* Status Info for Non-Pending */}
            {viewingSale.status !== 'pending' && (
              <DialogFooter className="border-t pt-4">
                <div className="w-full text-center">
                  <p className="text-sm text-gray-500">
                    รายการนี้{viewingSale.status === 'verified' ? 'ได้รับการอนุมัติแล้ว' : 'ถูกปฏิเสธแล้ว'}
                  </p>
                </div>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Sale Dialog */}
      {editingSale && (
        <Dialog open={!!editingSale} onOpenChange={() => setEditingSale(null)}>
          <DialogContent className="max-w-md bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
            <DialogHeader>
              <DialogTitle>แก้ไขรายการขาย</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <Label htmlFor="edit-lineName">ชื่อ Line</Label>
                <Input 
                  id="edit-lineName" 
                  value={editingSale.lineName} 
                  onChange={(e) => setEditingSale({ ...editingSale, lineName: e.target.value })} 
                />
              </div>
              <div>
                <Label htmlFor="edit-product">สินค้า</Label>
                <select 
                  id="edit-product" 
                  value={editingSale.product} 
                  onChange={(e) => setEditingSale({ ...editingSale, product: e.target.value })} 
                  className="w-full h-10 px-3 border border-input rounded-md"
                >
                  <option value="สติกเกอร์ไลน์ หมีน้อย">สติกเกอร์ไลน์ หมีน้อย</option>
                  <option value="สติกเกอร์ไลน์ แมวเหมียว">สติกเกอร์ไลน์ แมวเหมียว</option>
                  <option value="Line Theme สีฟ้า">Line Theme สีฟ้า</option>
                  <option value="Line Theme สีชมพู">Line Theme สีชมพู</option>
                  <option value="Line Melody เพลงไทย">Line Melody เพลงไทย</option>
                  <option value="Line Emoji ใหม่">Line Emoji ใหม่</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-quantity">จำนวน</Label>
                <Input 
                  id="edit-quantity" 
                  type="number" 
                  value={editingSale.quantity} 
                  onChange={(e) => setEditingSale({ ...editingSale, quantity: Number(e.target.value) })} 
                />
              </div>
              <div>
                <Label htmlFor="edit-amount">ยอดเงิน</Label>
                <Input 
                  id="edit-amount" 
                  type="number" 
                  value={editingSale.amount} 
                  onChange={(e) => setEditingSale({ ...editingSale, amount: Number(e.target.value) })} 
                />
              </div>
              <div>
                <Label htmlFor="edit-status">สถานะ</Label>
                <select 
                  id="edit-status" 
                  value={editingSale.status} 
                  onChange={(e) => setEditingSale({ ...editingSale, status: e.target.value })} 
                  className="w-full h-10 px-3 border border-input rounded-md"
                >
                  <option value="pending">รอตรวจสอบ</option>
                  <option value="verified">ตรวจสอบแล้ว</option>
                  <option value="rejected">ปฏิเสธ</option>
                </select>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">ยกเลิก</Button>
                </DialogClose>
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