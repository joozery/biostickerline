import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from './components/ui/toaster';
import { useToast } from './components/ui/use-toast';

import Header from './pages/Header';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Accounts from './pages/Accounts';
import UploadPage from './pages/Upload';
import Integration from './pages/Integration';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://biosticker-backend-9178b2fa5a35.herokuapp.com/api';

// API Functions
const api = {
  getSales: async (status = 'all') => {
    const response = await fetch(`${API_BASE_URL}/sales?status=${status}&limit=100&t=${Date.now()}`);
    if (!response.ok) throw new Error('Failed to fetch sales data');
    return response.json();
  },
  
  getSlips: async (status = 'all') => {
    const response = await fetch(`${API_BASE_URL}/slips?status=${status}&limit=50&t=${Date.now()}`);
    if (!response.ok) throw new Error('Failed to fetch slips data');
    return response.json();
  },

  getSlipsForSale: async (saleId) => {
    const response = await fetch(`${API_BASE_URL}/slips?sale_id=${saleId}&t=${Date.now()}`);
    if (!response.ok) throw new Error('Failed to fetch slips for sale');
    return response.json();
  },
  
  getSlipsByOrder: async (orderNumber) => {
    const response = await fetch(`${API_BASE_URL}/slips?order_number=${orderNumber}&t=${Date.now()}`);
    if (!response.ok) throw new Error('Failed to fetch slips by order');
    return response.json();
  },
  
  updateSale: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/sales/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update sale');
    return response.json();
  },
  
  updateSlip: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/slips/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update slip');
    return response.json();
  },
  
  deleteSale: async (id) => {
    const response = await fetch(`${API_BASE_URL}/sales/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete sale');
    return response.json();
  },
  
  deleteSlip: async (id) => {
    const response = await fetch(`${API_BASE_URL}/slips/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete slip');
    return response.json();
  },
  
  addManualSale: async (data) => {
    const response = await fetch(`${API_BASE_URL}/manual-sale`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to add manual sale');
    return response.json();
  },
  
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  }
};

// Mock data สำหรับ fallback (เดิม)
const generateMockSalesData = () => {
  const products = [
    'สติกเกอร์ไลน์ หมีน้อย',
    'สติกเกอร์ไลน์ แมวเหมียว',
    'สติกเกอร์ไลน์ หมาป่วน',
    'Line Theme สีฟ้า',
    'Line Theme สีชมพู',
    'Line Theme Dark Mode',
    'Line Melody เพลงไทย',
    'Line Melody เพลงสากล',
    'Line Melody เพลงเศร้า',
    'Line Emoji ใหม่'
  ];

  const customers = [
    'นายสมชาย ใจดี',
    'นางสาวสมศรี สวยงาม',
    'นายปิติ มีความสุข',
    'นางสาวมาลี ดอกไม้',
    'นายวิทยา เก่งมาก',
    'นางสาวอนงค์ สุขใส',
    'นายธนา รวยมาก',
    'นางสาวรัตนา เพชรงาม',
    'นายชัยวัฒน์ ชนะเลิศ',
    'นางสาวสุดา หวานใจ',
    'นายเกรียง เจ๋งจริง',
    'นางสาวแพรว สดใส',
    'นายกิตติ ดีใจ',
    'นางสาวปราณี เก่งจริง',
    'นายสิทธิ ถูกต้อง'
  ];

  const sources = ['LINE Bot', 'Manual Upload', 'QR Code', 'Website'];
  const statuses = ['verified', 'pending', 'rejected'];

  const mockData = [];
  const today = new Date();

  for (let i = 0; i < 50; i++) {
    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() - Math.floor(Math.random() * 30));
    
    const product = products[Math.floor(Math.random() * products.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    let basePrice = 50;
    if (product.includes('Theme')) basePrice = 99;
    if (product.includes('Melody')) basePrice = 69;
    if (product.includes('Emoji')) basePrice = 29;

    const quantity = Math.floor(Math.random() * 3) + 1;
    const amount = basePrice * quantity;

    mockData.push({
      id: i + 1,
      date: randomDate.toISOString().split('T')[0],
      product: product,
      amount: amount,
      quantity: quantity,
      lineName: customer,
      slipImage: '',
      source: source,
      status: status,
      paymentMethod: Math.random() > 0.5 ? 'โอนเงิน' : 'พร้อมเพย์',
      orderNumber: `ORD${String(1000 + i).padStart(4, '0')}`,
      phoneNumber: `08${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
      note: ['', 'ขอให้ส่งเร็ว', 'ต้องการใบเสร็จ', 'สินค้าของขวัญ'][Math.floor(Math.random() * 4)]
    });
  }

  return mockData.sort((a, b) => new Date(b.date) - new Date(a.date));
};

function App({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [lastDataCount, setLastDataCount] = useState(0);
  const [slipsData, setSlipsData] = useState([]);
  const { toast } = useToast();

  // ฟังก์ชันโหลดข้อมูลจาก API
  const loadSalesData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading sales data from:', `${API_BASE_URL}/sales`);
      console.log('🔄 Loading slips data from:', `${API_BASE_URL}/slips`);
      
      const [salesData, slipsData] = await Promise.all([
        api.getSales(),
        api.getSlips()
      ]);
      
      console.log('✅ Sales data received:', salesData);
      console.log('✅ Slips data received:', slipsData);
      console.log('📊 Sales length:', salesData.length);
      console.log('📊 Slips length:', slipsData.length);
      
      // ตรวจสอบข้อมูลใหม่
      const newDataCount = salesData.length;
      const hasNewData = lastDataCount > 0 && newDataCount > lastDataCount;
      
      setSalesData(salesData);
      setSlipsData(slipsData);
      setIsOnline(true);
      
      // บันทึกลง localStorage เป็น backup
      localStorage.setItem('biostickerSalesData', JSON.stringify(salesData));
      localStorage.setItem('biostickerSlipsData', JSON.stringify(slipsData));
      localStorage.setItem('lastDataUpdate', new Date().toISOString());
      
      // แสดง toast เมื่อโหลดข้อมูลสำเร็จ
      if (hasNewData) {
        const newRecords = newDataCount - lastDataCount;
        toast({
          title: "🎉 มีข้อมูลใหม่!",
          description: `เพิ่มขึ้น ${newRecords} รายการ (รวม ${newDataCount} รายการ)`,
        });
      } else if (salesData.length > 0 || slipsData.length > 0) {
        toast({
          title: "✅ โหลดข้อมูลสำเร็จ",
          description: `ยอดขาย ${salesData.length} รายการ, สลีป ${slipsData.length} รายการ`,
        });
      } else {
        toast({
          title: "⚠️ ไม่พบข้อมูล",
          description: "ยังไม่มีข้อมูลในระบบ หรือลองรีเฟรชหน้าเว็บ",
        });
      }
      
      // อัพเดทจำนวนข้อมูลล่าสุด
      setLastDataCount(newDataCount);
      
    } catch (error) {
      console.error('❌ Failed to load sales data:', error);
      setIsOnline(false);
      
      // ใช้ข้อมูลจาก localStorage หรือ mock data
      const savedData = localStorage.getItem('biostickerSalesData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setSalesData(parsedData);
        toast({
          title: "⚠️ โหลดข้อมูลออฟไลน์",
          description: `ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ใช้ข้อมูลล่าสุด ${parsedData.length} รายการ`,
          variant: "destructive"
        });
      } else {
        const mockData = generateMockSalesData();
        setSalesData(mockData);
        toast({
          title: "⚠️ ใช้ข้อมูลตัวอย่าง",
          description: `ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ แสดงข้อมูลตัวอย่าง ${mockData.length} รายการ`,
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // โหลดข้อมูลเมื่อเริ่มต้น
  useEffect(() => {
    loadSalesData();
  }, []);

  // โหลดข้อมูลใหม่เมื่อ tab เปลี่ยนเป็น sales หรือ dashboard
  useEffect(() => {
    if (activeTab === 'sales' || activeTab === 'dashboard') {
      loadSalesData();
    }
  }, [activeTab]);

  // ลบการรีเฟรชอัตโนมัติเพื่อป้องกันการรีเฟรชหน้าเว็บ
  // useEffect(() => {
  //   if (!isOnline) return;
  //   
  //   const interval = setInterval(() => {
  //     loadSalesData();
  //   }, 30000);
  //   
  //   return () => clearInterval(interval);
  // }, [isOnline]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!isOnline) {
      toast({
        title: "❌ ไม่สามารถอัปโหลดได้",
        description: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
        variant: "destructive"
      });
      return;
    }

    try {
      const products = [
        'สติกเกอร์ไลน์ หมีน้อย',
        'Line Theme สีฟ้า',
        'Line Melody เพลงไทย'
      ];
      
      const customers = [
        'นายสุรชัย มั่งมี',
        'นางสาวพิมพ์ใจ สดใส',
        'นายณัฐวุฒิ เก่งจริง'
      ];

      const newSaleData = {
        lineName: customers[Math.floor(Math.random() * customers.length)],
        product: products[Math.floor(Math.random() * products.length)],
        quantity: Math.floor(Math.random() * 3) + 1,
        amount: Math.floor(Math.random() * 500) + 50,
        paymentMethod: 'โอนเงิน',
        phoneNumber: `08${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        note: 'อัปโหลดด้วยตนเอง'
      };

      const result = await api.addManualSale(newSaleData);
      
      toast({
        title: "✅ อัปโหลดสลีปสำเร็จ!",
        description: `หมายเลขออเดอร์: ${result.orderNumber}`,
      });

      // รีเฟรชข้อมูล
      await loadSalesData();
      
    } catch (error) {
      console.error('❌ Upload error:', error);
      toast({
        title: "❌ อัปโหลดไม่สำเร็จ",
        description: "เกิดข้อผิดพลาดในการอัปโหลดข้อมูล",
        variant: "destructive"
      });
    }
  };

  const handleUpdateSale = async (updatedSale) => {
    if (!isOnline) {
      toast({
        title: "❌ ไม่สามารถอัปเดตได้",
        description: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
        variant: "destructive"
      });
      return;
    }

    try {
      await api.updateSale(updatedSale.id, updatedSale);
      
      toast({ 
        title: "🎉 อัปเดตข้อมูลเรียบร้อย!", 
        description: `รายการ ${updatedSale.orderNumber || `#${updatedSale.id}`} ของ ${updatedSale.lineName} ถูกอัปเดตเรียบร้อยแล้ว`,
        duration: 4000
      });

      // รีเฟรชข้อมูล
      await loadSalesData();
      
    } catch (error) {
      console.error('❌ Update error:', error);
      toast({
        title: "❌ อัปเดตไม่สำเร็จ",
        description: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล",
        variant: "destructive"
      });
    }
  };

  const handleUpdateSlip = async (updatedSlip) => {
    if (!isOnline) {
      toast({
        title: "❌ ไม่สามารถอัปเดตได้",
        description: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
        variant: "destructive"
      });
      return;
    }

    try {
      await api.updateSlip(updatedSlip.id, updatedSlip);
      
      toast({ 
        title: "✅ อัปเดตสลีปสำเร็จ", 
        description: `สลีป #${updatedSlip.id} ถูกอัปเดตแล้ว` 
      });

      // รีเฟรชข้อมูล
      await loadSalesData();
      
    } catch (error) {
      console.error('❌ Update slip error:', error);
      toast({
        title: "❌ อัปเดตไม่สำเร็จ",
        description: "เกิดข้อผิดพลาดในการอัปเดตสลีป",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSale = async (saleId) => {
    if (!isOnline) {
      toast({
        title: "❌ ไม่สามารถลบได้",
        description: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
        variant: "destructive"
      });
      return;
    }

    try {
      const sale = salesData.find(s => s.id === saleId);
      await api.deleteSale(saleId);
      
      toast({ 
        title: "🗑️ ลบข้อมูลสำเร็จ", 
        description: `รายการ ${sale?.orderNumber || ''} ถูกลบแล้ว`, 
        variant: "destructive" 
      });

      // รีเฟรชข้อมูล
      await loadSalesData();
      
    } catch (error) {
      console.error('❌ Delete error:', error);
      toast({
        title: "❌ ลบไม่สำเร็จ",
        description: "เกิดข้อผิดพลาดในการลบข้อมูล",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSlip = async (slipId) => {
    if (!isOnline) {
      toast({
        title: "❌ ไม่สามารถลบได้",
        description: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
        variant: "destructive"
      });
      return;
    }

    try {
      await api.deleteSlip(slipId);
      
      toast({ 
        title: "🗑️ ลบสลีปสำเร็จ", 
        description: `สลีป #${slipId} ถูกลบแล้ว`, 
        variant: "destructive" 
      });

      // รีเฟรชข้อมูล
      await loadSalesData();
      
    } catch (error) {
      console.error('❌ Delete slip error:', error);
      toast({
        title: "❌ ลบไม่สำเร็จ",
        description: "เกิดข้อผิดพลาดในการลบสลีป",
        variant: "destructive"
      });
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard salesData={salesData} isOnline={isOnline} />;
      case 'sales':
        return <Sales salesData={salesData} slipsData={slipsData} onUpdateSale={handleUpdateSale} onDeleteSale={handleDeleteSale} isOnline={isOnline} />;
      case 'accounts':
        return <Accounts salesData={salesData} />;
      case 'upload':
        return <UploadPage handleFileUpload={handleFileUpload} salesData={salesData} isOnline={isOnline} />;
      case 'integration':
        return <Integration isOnline={isOnline} />;
      default:
        return <Dashboard salesData={salesData} isOnline={isOnline} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>ระบบจัดการยอดขาย - BIO STICKER Line Products Sales Management</title>
        <meta name="description" content="ระบบจัดการหลังบ้านสำหรับเช็คยอดขายจากสลีปไลน์ OA ของทีมขายสติกเกอร์ไลน์ Line Theme และ Line Melody พร้อมระบบตรวจสอบอัตโนมัติ" />
      </Helmet>

      <div className="min-h-screen bg-green-50">
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isOnline={isOnline} 
          user={user}
          onLogout={onLogout}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Status Indicator */}
          {!isOnline && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ โหมดออฟไลน์ - ข้อมูลอาจไม่เป็นปัจจุบัน
              </p>
            </div>
          )}
          
          {renderContent()}
        </main>
        <Toaster />
      </div>
    </>
  );
}

export default App;