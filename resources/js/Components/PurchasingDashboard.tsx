
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { MOCK_INVENTORY, MOCK_ORDERS, Icons } from '../constants';
import { getSmartReorderSuggestions } from '../services/geminiService';
import { MOCK_SUPPLIERS } from '../constants';

const PurchasingDashboard: React.FC = () => {
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any>(null);

  const stats = [
    { label: 'Gasto Total Mensual', value: '€12,450', trend: '+12%', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Órdenes Pendientes', value: '8', trend: '-2', color: 'text-amber-600', bg: 'bg-amber-50' },
    // Fix: Use correct property names current_stock and min_stock
    { label: 'Stock Bajo Mínimo', value: MOCK_INVENTORY.filter(i => i.current_stock < i.min_stock).length, trend: 'Crítico', color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Proveedores Activos', value: '24', trend: 'Ok', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const chartData = [
    { name: 'Ene', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Abr', value: 2780 },
    { name: 'May', value: 6890 },
  ];

  const handleAIAnalysis = async () => {
    setAiLoading(true);
    const result = await getSmartReorderSuggestions(MOCK_INVENTORY, MOCK_SUPPLIERS);
    setSuggestions(result);
    setAiLoading(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Tendencia de Compras</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Assistant Card */}
        <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl shadow-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icons.AI />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Inteligencia Artificial</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Asistente de Abastecimiento</h3>
            <p className="text-indigo-200 text-sm leading-relaxed">
              Analizaré tu inventario y tendencias para sugerir qué productos comprar hoy mismo para evitar roturas de stock.
            </p>
          </div>

          <div className="mt-8">
            <button 
              onClick={handleAIAnalysis}
              disabled={aiLoading}
              className="w-full bg-white text-indigo-900 font-bold py-3 px-6 rounded-xl hover:bg-indigo-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {aiLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
                  Analizando...
                </>
              ) : 'Generar Recomendaciones'}
            </button>
          </div>
        </div>
      </div>

      {/* AI Suggestions Results */}
      {suggestions && (
        <div className="bg-white rounded-xl border-2 border-indigo-100 p-6 animate-slideUp">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icons.AI /></span>
              Sugerencias de Reabastecimiento
            </h3>
            <button onClick={() => setSuggestions(null)} className="text-gray-400 hover:text-gray-600">
              Cerrar
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.recommendations.map((rec: any, idx: number) => (
              <div key={idx} className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-800">{rec.supplierName}</h4>
                    <p className="text-xs text-indigo-600 font-medium">{rec.reason}</p>
                  </div>
                  <button className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700">Crear OC</button>
                </div>
                <div className="space-y-2">
                  {rec.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm bg-white p-2 rounded border border-gray-100">
                      <span className="text-gray-600">{item.itemName}</span>
                      <span className="font-bold">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Low Stock Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold">Alertas de Stock</h3>
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase">Necesita Atención</span>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Stock Actual</th>
              <th className="px-6 py-4">Stock Mínimo</th>
              <th className="px-6 py-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Fix: Use correct property names current_stock and min_stock */}
            {MOCK_INVENTORY.filter(i => i.current_stock < i.min_stock).map(item => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                {/* Fix: Use correct property name current_stock */}
                <td className="px-6 py-4">{item.current_stock} {item.unit}</td>
                {/* Fix: Use correct property name min_stock */}
                <td className="px-6 py-4 text-gray-500">{item.min_stock} {item.unit}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Bajo Stock
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasingDashboard;
