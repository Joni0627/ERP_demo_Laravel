
import React from 'react';
import { ViewType } from '../types';
import { Icons } from '../constants';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { id: 'suppliers', label: 'Proveedores', icon: Icons.Suppliers },
    { id: 'orders', label: 'Órdenes de Compra', icon: Icons.Orders },
    { id: 'inventory', label: 'Inventario', icon: Icons.Inventory },
  ];

  return (
    <aside className="w-64 bg-slate-900 h-screen fixed left-0 top-0 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-indigo-400">Nexus<span className="text-white">ERP</span></h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Módulo Compras</p>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id as ViewType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  currentView === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <item.icon />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">
            AD
          </div>
          <div>
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-slate-500">Project Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
