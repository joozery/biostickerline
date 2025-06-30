import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

import Header from '@/pages/Header';
import Dashboard from '@/pages/Dashboard';
import Sales from '@/pages/Sales';
import Accounts from '@/pages/Accounts';
import UploadPage from '@/pages/Upload';
import Integration from '@/pages/Integration';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [salesData, setSalesData] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedSalesData = localStorage.getItem('salesData');
    if (savedSalesData) {
      setSalesData(JSON.parse(savedSalesData));
    } else {
      const defaultSales = [
        { id: 1, date: '2025-06-25', product: 'สติกเกอร์ไลน์', amount: 150, quantity: 2, lineName: 'Somchai', slipImage: '', source: 'LINE Bot' },
        { id: 2, date: '2025-06-25', product: 'Line Theme', amount: 99, quantity: 1, lineName: 'Somsri', slipImage: '', source: 'Manual Upload' },
        { id: 3, date: '2025-06-24', product: 'Line Melody', amount: 69, quantity: 1, lineName: 'Somchai', slipImage: '', source: 'LINE Bot' },
      ];
      setSalesData(defaultSales);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('salesData', JSON.stringify(salesData));
  }, [salesData]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newSale = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        product: ['สติกเกอร์ไลน์', 'Line Theme', 'Line Melody'][Math.floor(Math.random() * 3)],
        amount: Math.floor(Math.random() * 500) + 50,
        quantity: Math.floor(Math.random() * 5) + 1,
        lineName: 'ManualUser_' + Math.floor(Math.random() * 100),
        slipImage: URL.createObjectURL(file),
        status: 'verified',
        source: 'Manual Upload'
      };
      
      setSalesData(prev => [newSale, ...prev]);
      toast({
        title: "✅ อัปโหลดสลีปสำเร็จ!",
        description: "ข้อมูลยอดขายได้รับการบันทึกแล้ว",
      });
    }
  };

  const handleUpdateSale = (updatedSale) => {
    setSalesData(salesData.map(sale => sale.id === updatedSale.id ? updatedSale : sale));
    toast({ title: "✅ อัปเดตข้อมูลสำเร็จ", description: "รายการขายถูกอัปเดตแล้ว" });
  };

  const handleDeleteSale = (saleId) => {
    setSalesData(salesData.filter(sale => sale.id !== saleId));
    toast({ title: "🗑️ ลบข้อมูลสำเร็จ", description: "รายการขายถูกลบแล้ว", variant: "destructive" });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard salesData={salesData} />;
      case 'sales':
        return <Sales salesData={salesData} onUpdateSale={handleUpdateSale} onDeleteSale={handleDeleteSale} />;
      case 'accounts':
        return <Accounts salesData={salesData} />;
      case 'upload':
        return <UploadPage handleFileUpload={handleFileUpload} salesData={salesData} />;
      case 'integration':
        return <Integration />;
      default:
        return <Dashboard salesData={salesData} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>ระบบจัดการยอดขาย - Line Products Sales Management</title>
        <meta name="description" content="ระบบจัดการหลังบ้านสำหรับเช็คยอดขายจากสลีปไลน์ OA ของทีมขายสติกเกอร์ไลน์ Line Theme และ Line Melody" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
        <Toaster />
      </div>
    </>
  );
}

export default App;