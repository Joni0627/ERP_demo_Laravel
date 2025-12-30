import { GoogleGenAI, Type } from "@google/genai";
import { InventoryItem, Supplier } from "../types";

export async function getSmartReorderSuggestions(inventory: InventoryItem[], suppliers: Supplier[]) {
  // Fix: Use correct property names current_stock and min_stock for filtering
  const lowStockItems = inventory.filter(item => item.current_stock <= item.min_stock);
  
  if (lowStockItems.length === 0) return null;

  // Fix: Instantiate GoogleGenAI right before the API call as per best practices
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Basado en el siguiente inventario de bajo stock en mi ERP, genera sugerencias de órdenes de compra inteligentes.
    Inventario Crítico: ${JSON.stringify(lowStockItems)}
    Proveedores Disponibles: ${JSON.stringify(suppliers)}
    
    Por favor, analiza y devuelve un objeto JSON con una lista de órdenes recomendadas (supplierId, items [itemId, suggestedQuantity], reason).
    Enfócate en reponer hasta superar el stock mínimo en un 50% extra para seguridad.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  supplierName: { type: Type.STRING },
                  // Changed to INTEGER to match the number type used in the ERP application
                  supplierId: { type: Type.INTEGER },
                  reason: { type: Type.STRING },
                  items: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        itemName: { type: Type.STRING },
                        // Changed to INTEGER to match the number type used in the ERP application
                        itemId: { type: Type.INTEGER },
                        quantity: { type: Type.NUMBER }
                      },
                      required: ["itemName", "itemId", "quantity"]
                    }
                  }
                },
                required: ["supplierName", "supplierId", "reason", "items"]
              }
            }
          },
          required: ["recommendations"]
        }
      }
    });

    // Fix: Access response.text as a property and handle potential undefined values before parsing
    const text = response.text;
    if (!text) {
      return null;
    }
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}