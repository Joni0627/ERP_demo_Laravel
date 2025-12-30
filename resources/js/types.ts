export enum POStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED'
}

export interface Supplier {
  id: number;
  name: string;
  contact_name: string;
  email: string;
  phone: string;
  category: string;
  rating: number;
  created_at?: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  current_stock: number;
  min_stock: number;
  unit: string;
  unit_price: number;
}

export interface PurchaseOrderItem {
  id?: number;
  purchase_order_id?: number;
  inventory_item_id: number;
  name: string;
  quantity: number;
  unit_price: number;
}

export interface PurchaseOrder {
  id: number;
  uuid: string;
  supplier_id: number;
  supplier_name?: string;
  items: PurchaseOrderItem[];
  total_amount: number;
  status: POStatus;
  created_at: string;
}

export type ViewType = 'dashboard' | 'suppliers' | 'orders' | 'inventory' | 'laravel_config';
