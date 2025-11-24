import React from 'react';
import { FileText, Download, Package, Users } from 'lucide-react';
import { Sale, Product, Client, Supply } from '../types';
import { generateSalesReport, generateInventoryReport, generateClientReport } from '../services/pdfService';

interface ReportsProps {
  sales: Sale[];
  products: Product[];
  supplies: Supply[];
  clients: Client[];
}

export const Reports: React.FC<ReportsProps> = ({ sales, products, supplies, clients }) => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-heading font-bold text-coffee-900">Export Center</h2>
        <p className="text-coffee-600">Generate detailed PDF reports for your business analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportCard 
          title="Sales Report" 
          desc="Transaction history, revenue breakdown, and payment methods."
          icon={<FileText size={32} className="text-blue-500" />}
          onExport={() => generateSalesReport(sales)}
          color="bg-blue-50 hover:bg-blue-100"
        />
        
        <ReportCard 
          title="Inventory Report" 
          desc="Current stock levels for menu products and raw supplies."
          icon={<Package size={32} className="text-amber-500" />}
          onExport={() => generateInventoryReport(products, supplies)}
           color="bg-amber-50 hover:bg-amber-100"
        />

        <ReportCard 
          title="Client CRM" 
          desc="Customer database, points, and spending history."
          icon={<Users size={32} className="text-purple-500" />}
          onExport={() => generateClientReport(clients)}
           color="bg-purple-50 hover:bg-purple-100"
        />
      </div>

      <div className="mt-12 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Exports</h3>
        <div className="space-y-3">
            <div className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-100 pb-2">
                <span>Sales_Oct_2023.pdf</span>
                <span className="text-gray-400">Downloaded 2 hours ago</span>
            </div>
             <div className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-100 pb-2">
                <span>Inventory_Q3.pdf</span>
                <span className="text-gray-400">Downloaded Yesterday</span>
            </div>
        </div>
      </div>
    </div>
  );
};

const ReportCard = ({ title, desc, icon, onExport, color }: any) => (
  <div className={`p-6 rounded-2xl border border-transparent transition-all duration-300 cursor-pointer group flex flex-col h-64 ${color}`}>
    <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm mb-auto">{desc}</p>
    <button 
      onClick={onExport}
      className="mt-4 w-full bg-white py-3 rounded-xl text-gray-700 font-semibold shadow-sm flex items-center justify-center gap-2 hover:shadow-md transition-all active:scale-95"
    >
      <Download size={18} /> Export PDF
    </button>
  </div>
);