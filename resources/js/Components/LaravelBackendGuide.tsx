
import React from 'react';

const LaravelBackendGuide: React.FC = () => {
  const migrationCode = `
Schema::create('purchase_orders', function (Blueprint $table) {
    $table->id();
    $table->uuid('uuid')->unique();
    $table->foreignId('supplier_id')->constrained();
    $table->decimal('total_amount', 15, 2);
    $table->string('status')->default('PENDING');
    $table->timestamps();
    $table->softDeletes();
});`;

  const controllerCode = `
public function store(StorePurchaseOrderRequest $request)
{
    return DB::transaction(function () use ($request) {
        $order = PurchaseOrder::create([
            'supplier_id' => $request->supplier_id,
            'total_amount' => $request->total_amount,
            'status' => 'PENDING',
        ]);

        foreach ($request->items as $item) {
            $order->items()->create($item);
        }

        return new PurchaseOrderResource($order);
    });
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">Integración con Laravel 11</h3>
        <p className="text-indigo-700 text-sm">
          Este frontend está diseñado para ser consumido por un backend Laravel utilizando 
          <span className="font-mono bg-white px-2 py-0.5 rounded mx-1">Inertia.js</span> o 
          <span className="font-mono bg-white px-2 py-0.5 rounded mx-1">Sanctum</span> para APIs desacopladas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-slate-800 px-4 py-2 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">database/migrations/..._create_purchase_orders_table.php</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            </div>
          </div>
          <pre className="p-6 text-sm text-indigo-300 font-mono overflow-x-auto">
            <code>{migrationCode}</code>
          </pre>
        </div>

        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-slate-800 px-4 py-2 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">app/Http/Controllers/PurchaseOrderController.php</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            </div>
          </div>
          <pre className="p-6 text-sm text-emerald-300 font-mono overflow-x-auto">
            <code>{controllerCode}</code>
          </pre>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100">
        <h4 className="font-bold text-gray-800 mb-4">Recomendaciones de Arquitectura</h4>
        <ul className="space-y-4 text-sm text-gray-600">
          <li className="flex gap-3 italic">
            <span className="text-indigo-600 font-bold">1.</span>
            Usa <strong>Laravel Sanctum</strong> para autenticación si el frontend corre en un dominio diferente.
          </li>
          <li className="flex gap-3 italic">
            <span className="text-indigo-600 font-bold">2.</span>
            Implementa <strong>API Resources</strong> para transformar tus modelos Eloquent antes de enviarlos a este Dashboard.
          </li>
          <li className="flex gap-3 italic">
            <span className="text-indigo-600 font-bold">3.</span>
            Para el asistente de IA, te recomendamos crear un Job en Laravel que se comunique con Gemini para no bloquear el proceso de compra.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LaravelBackendGuide;
