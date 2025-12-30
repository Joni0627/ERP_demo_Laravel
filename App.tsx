
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PurchasingDashboard from './components/PurchasingDashboard';
import SuppliersList from './components/SuppliersList';
import PurchaseOrdersList from './components/PurchaseOrdersList';
import LaravelBackendGuide from './components/LaravelBackendGuide';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <PurchasingDashboard />;
      case 'suppliers': return <SuppliersList />;
      case 'orders': return <PurchaseOrdersList />;
      case 'laravel_config': return <LaravelBackendGuide />;
      case 'inventory': return (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Módulo de Inventario</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2">Estamos sincronizando los almacenes con Laravel en tiempo real.</p>
        </div>
      );
      default: return <PurchasingDashboard />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Resumen General';
      case 'suppliers': return 'Proveedores';
      case 'orders': return 'Órdenes de Compra';
      case 'inventory': return 'Gestión de Stock';
      case 'laravel_config': return 'Laravel Backend Blueprint';
      default: return 'NexusERP';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 ml-64 min-h-screen">
        <Header title={getTitle()} />
        
        <div className="p-8 max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="absolute right-16 bg-slate-900 text-white px-3 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Soporte Técnico ERP
        </span>
      </button>
    </div>
  );
};

export default App;
