import React from 'react';
import { Supplier, InventoryItem, PurchaseOrder, POStatus } from './types';

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: 1, name: 'Global Tech Solutions', contact_name: 'Juan Pérez', email: 'juan@globaltech.com', phone: '+34 912 345 678', category: 'Electrónica', rating: 4.8 },
  { id: 2, name: 'Industrial Supplies Co.', contact_name: 'Marta Ruiz', email: 'marta@indusupplies.es', phone: '+34 934 567 890', category: 'Herramientas', rating: 4.5 },
  { id: 3, name: 'Office Depot Pro', contact_name: 'Carlos Gómez', email: 'carlos@officedepot.com', phone: '+34 910 112 233', category: 'Oficina', rating: 4.2 },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 101, name: 'Monitor 27" Dell', sku: 'MON-DELL-27', current_stock: 5, min_stock: 10, unit: 'unidades', unit_price: 250 },
  { id: 102, name: 'Teclado Mecánico RGB', sku: 'KB-RGB-01', current_stock: 45, min_stock: 20, unit: 'unidades', unit_price: 85 },
  { id: 103, name: 'Silla Ergonómica Pro', sku: 'CHR-ERG-99', current_stock: 2, min_stock: 5, unit: 'unidades', unit_price: 320 },
];

export const MOCK_ORDERS: PurchaseOrder[] = [
  {
    id: 1,
    uuid: 'po-550e8400-e29b-41d4-a716-446655440000',
    supplier_id: 1,
    supplier_name: 'Global Tech Solutions',
    items: [{ inventory_item_id: 101, name: 'Monitor 27" Dell', quantity: 10, unit_price: 250 }],
    total_amount: 2500,
    status: POStatus.RECEIVED,
    created_at: '2024-05-10 14:30:00',
  }
];

export const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Suppliers: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Orders: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  Inventory: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  AI: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};
