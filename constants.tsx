
import React from 'react';
import { Supplier, InventoryItem, PurchaseOrder, POStatus } from './types';

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: '1', name: 'Global Tech Solutions', contactName: 'Juan Pérez', email: 'juan@globaltech.com', phone: '+34 912 345 678', category: 'Electrónica', rating: 4.8 },
  { id: '2', name: 'Industrial Supplies Co.', contactName: 'Marta Ruiz', email: 'marta@indusupplies.es', phone: '+34 934 567 890', category: 'Herramientas', rating: 4.5 },
  { id: '3', name: 'Office Depot Pro', contactName: 'Carlos Gómez', email: 'carlos@officedepot.com', phone: '+34 910 112 233', category: 'Oficina', rating: 4.2 },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'Monitor 27" Dell', sku: 'MON-DELL-27', currentStock: 5, minStock: 10, unit: 'unidades', unitPrice: 250 },
  { id: 'i2', name: 'Teclado Mecánico RGB', sku: 'KB-RGB-01', currentStock: 45, minStock: 20, unit: 'unidades', unitPrice: 85 },
  { id: 'i3', name: 'Silla Ergonómica Pro', sku: 'CHR-ERG-99', currentStock: 2, minStock: 5, unit: 'unidades', unitPrice: 320 },
  { id: 'i4', name: 'Cable HDMI 2.1 2m', sku: 'CBL-HDMI-2', currentStock: 120, minStock: 50, unit: 'unidades', unitPrice: 15 },
  { id: 'i5', name: 'Laptop HP EliteBook', sku: 'LTP-HP-EB', currentStock: 3, minStock: 8, unit: 'unidades', unitPrice: 1200 },
];

export const MOCK_ORDERS: PurchaseOrder[] = [
  {
    id: 'PO-2024-001',
    supplierId: '1',
    supplierName: 'Global Tech Solutions',
    items: [{ itemId: 'i1', name: 'Monitor 27" Dell', quantity: 10, unitPrice: 250 }],
    totalAmount: 2500,
    status: POStatus.RECEIVED,
    createdAt: '2024-05-10',
  },
  {
    id: 'PO-2024-002',
    supplierId: '2',
    supplierName: 'Industrial Supplies Co.',
    items: [{ itemId: 'i2', name: 'Teclado Mecánico RGB', quantity: 20, unitPrice: 85 }],
    totalAmount: 1700,
    status: POStatus.PENDING,
    createdAt: '2024-05-15',
  }
];

// SVG Icons as components
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
