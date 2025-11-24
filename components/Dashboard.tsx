import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, Package, AlertTriangle, Sparkles, MessageSquare } from 'lucide-react';
import { Sale, Product, Supply } from '../types';
import { getBusinessInsight } from '../services/geminiService';

interface DashboardProps {
  sales: Sale[];
  products: Product[];
  supplies: Supply[];
}

export const Dashboard: React.FC<DashboardProps> = ({ sales, products, supplies }) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  // Prepare Chart Data (Simulated aggregation)
  const chartData = [
    { name: 'Mon', sales: 450 },
    { name: 'Tue', sales: 380 },
    { name: 'Wed', sales: 620 },
    { name: 'Thu', sales: 500 },
    { name: 'Fri', sales: 890 },
    { name: 'Sat', sales: 1200 },
    { name: 'Sun', sales: 950 },
  ];

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const lowStockCount = supplies.filter(s => s.status !== 'OK').length;

  const handleAskAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsThinking(true);
    setAiResponse(null);
    const response = await getBusinessInsight(aiPrompt, { sales, products, supplies });
    setAiResponse(response);
    setIsThinking(false);
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-heading font-bold text-coffee-900">Dashboard</h2>
          <p className="text-coffee-600">Welcome back, here's what's brewing today.</p>
        </div>
        <div className="text-right">
           <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">Store Open</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toFixed(2)}`} 
          icon={<TrendingUp className="text-green-600" />} 
          trend="+12.5%" 
        />
        <StatCard 
          title="Active Orders" 
          value="14" 
          icon={<Package className="text-blue-600" />} 
          sub="Currently preparing"
        />
        <StatCard 
          title="New Clients" 
          value="8" 
          icon={<Users className="text-purple-600" />} 
          trend="+4 today"
        />
        <StatCard 
          title="Alerts" 
          value={lowStockCount.toString()} 
          icon={<AlertTriangle className="text-orange-600" />} 
          isAlert 
          sub="Low stock items"
        />
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        
        {/* Charts Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-coffee-100 flex flex-col">
          <h3 className="text-xl font-heading font-bold text-coffee-800 mb-6">Weekly Sales Performance</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#815b44'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#815b44'}} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Line type="monotone" dataKey="sales" stroke="#815b44" strokeWidth={3} dot={{r: 4, fill: '#815b44', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Assistant Section */}
        <div className="bg-gradient-to-br from-coffee-800 to-coffee-900 p-6 rounded-2xl shadow-lg text-white flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={120} />
          </div>
          
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
              <Sparkles size={20} className="text-amber-300" />
            </div>
            <h3 className="text-xl font-heading font-bold">AI Manager</h3>
          </div>

          <div className="flex-1 overflow-y-auto mb-4 space-y-4 relative z-10 scrollbar-hide">
            {!aiResponse ? (
              <div className="text-coffee-100/80 text-sm italic">
                Ask me about sales trends, inventory suggestions, or marketing ideas...
              </div>
            ) : (
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm text-sm leading-relaxed border border-white/10 animate-fade-in">
                {aiResponse}
              </div>
            )}
          </div>

          <div className="relative z-10 mt-auto">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask about business..."
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder-coffee-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              />
              <button 
                onClick={handleAskAI}
                disabled={isThinking}
                className="bg-amber-500 hover:bg-amber-400 text-coffee-900 p-2 rounded-xl transition-colors disabled:opacity-50"
              >
                {isThinking ? <div className="animate-spin h-5 w-5 border-2 border-coffee-900 border-t-transparent rounded-full" /> : <MessageSquare size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, isAlert, sub }: any) => (
  <div className={`p-5 rounded-2xl shadow-sm border transition-all hover:shadow-md ${isAlert ? 'bg-red-50 border-red-100' : 'bg-white border-coffee-100'}`}>
    <div className="flex justify-between items-start mb-2">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h4 className={`text-2xl font-bold mt-1 ${isAlert ? 'text-red-700' : 'text-gray-800'}`}>{value}</h4>
      </div>
      <div className={`p-2 rounded-lg ${isAlert ? 'bg-red-100' : 'bg-gray-50'}`}>
        {icon}
      </div>
    </div>
    {(trend || sub) && (
      <p className={`text-xs font-medium ${trend?.includes('+') ? 'text-green-600' : 'text-gray-400'}`}>
        {trend || sub}
      </p>
    )}
  </div>
);