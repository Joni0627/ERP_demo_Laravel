
import { Supplier, PurchaseOrder, InventoryItem } from '../types';
import { MOCK_SUPPLIERS, MOCK_ORDERS, MOCK_INVENTORY } from '../constants';

/**
 * Este servicio actúa como puente con el backend Laravel.
 * En producción, cambiarías las llamadas simuladas por fetch() reales a tu API.
 */
class LaravelService {
  private baseUrl = '/api/v1';

  // Simulación de cabeceras de Laravel
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-TOKEN': (window as any).csrfToken || '',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
  }

  async getSuppliers(): Promise<Supplier[]> {
    console.log('GET /api/suppliers - Fetching from Laravel');
    // Simular latencia de red
    await new Promise(r => setTimeout(r, 500));
    return MOCK_SUPPLIERS;
  }

  async getOrders(): Promise<PurchaseOrder[]> {
    console.log('GET /api/purchase-orders - Fetching from Laravel');
    await new Promise(r => setTimeout(r, 500));
    return MOCK_ORDERS;
  }

  async createOrder(orderData: any): Promise<PurchaseOrder> {
    console.log('POST /api/purchase-orders - Storing in MySQL via Eloquent', orderData);
    await new Promise(r => setTimeout(r, 800));
    return { ...MOCK_ORDERS[0], id: Math.floor(Math.random() * 1000) };
  }

  async getInventory(): Promise<InventoryItem[]> {
    console.log('GET /api/inventory - Querying stock levels');
    return MOCK_INVENTORY;
  }
}

export const laravelApi = new LaravelService();
