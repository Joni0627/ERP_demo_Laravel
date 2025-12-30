
import React from 'react';
import { MOCK_ORDERS } from '../constants';
import { POStatus } from '../types';

const PurchaseOrdersList: React.FC = () => {
  const getStatusStyles = (status: POStatus) => {
    switch (status) {
      case POStatus.RECEIVED: return 'bg-emerald-100 text-emerald-700';
      case POStatus.PENDING: return 'bg-amber-100 text-amber-700';
      case POStatus.SENT: return 'bg-blue-100 text-blue-700';
      case POStatus.CANCELLED: return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['Todas', 'Pendientes', 'Aprobadas', 'Recibidas'].map((tab, i) => (
            <button key={i} className={`px-4 py-2 rounded-lg text-sm font-medium ${i === 0 ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}>
              {tab}
            </button>
          ))}
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Nueva Órden
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">#{order.id}</span>
                  <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${getStatusStyles(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                {/* Fix: Use correct property name supplier_name */}
                <h4 className="text-lg font-bold text-gray-900 mt-2">{order.supplier_name}</h4>
                {/* Fix: Use correct property name created_at */}
                <p className="text-sm text-gray-500 mt-1">Creado el {order.created_at} • {order.items.length} productos</p>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Monto Total</p>
                {/* Fix: Use correct property name total_amount */}
                <p className="text-2xl font-black text-gray-900">€{order.total_amount.toLocaleString()}</p>
                <div className="mt-3 flex gap-2 justify-end">
                  <button className="text-sm text-gray-600 font-semibold px-4 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Ver PDF</button>
                  <button className="text-sm text-indigo-600 font-bold px-4 py-1.5 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">Gestionar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseOrdersList;
