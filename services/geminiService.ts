
import { GoogleGenAI, Type } from "@google/genai";
import { InventoryItem, Supplier } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSmartReorderSuggestions(inventory: InventoryItem[], suppliers: Supplier[]) {
  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);
  
  if (lowStockItems.length === 0) return null;

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
                  supplierId: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  items: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        itemName: { type: Type.STRING },
                        itemId: { type: Type.STRING },
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

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}
