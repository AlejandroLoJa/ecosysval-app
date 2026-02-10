import React from "react";
import EcomLayout from "./_EcomLayout";

const comprasMock = [
  { id: "c-01", item: "Madera refinada premium", total: "MXN $85,000", estado: "En proceso", fecha: "2026-01-20" },
  { id: "c-02", item: "Acero laminado 304", total: "USD $11,000", estado: "Entregado", fecha: "2026-01-10" },
];

export default function MisCompras() {
  return (
    <EcomLayout title="Mis compras" subtitle="Historial de compras (demo).">
      <section className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 text-white/70 text-sm">
          Compras registradas: <span className="text-white font-semibold">{comprasMock.length}</span>
        </div>

        {comprasMock.map((c) => (
          <div key={c.id} className="px-6 py-4 border-b border-white/10">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-white font-semibold truncate">{c.item}</div>
                <div className="text-white/60 text-xs mt-1">{c.fecha} • ID: {c.id}</div>
              </div>
              <div className="text-right">
                <div className="text-white font-extrabold">{c.total}</div>
                <div className="text-white/60 text-xs">{c.estado}</div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </EcomLayout>
  );
}
