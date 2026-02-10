import React from "react";
import EcomLayout from "./_EcomLayout";

const ventasMock = [
  { id: "v-01", item: "Servicio logística cross-border", total: "MXN $45,000", estado: "Pendiente", fecha: "2026-01-22" },
  { id: "v-02", item: "Textil anti-flama", total: "CAD $7,800", estado: "Enviado", fecha: "2026-01-12" },
];

export default function MisVentas() {
  return (
    <EcomLayout title="Mis ventas" subtitle="Historial de ventas (demo).">
      <section className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 text-white/70 text-sm">
          Ventas registradas: <span className="text-white font-semibold">{ventasMock.length}</span>
        </div>

        {ventasMock.map((v) => (
          <div key={v.id} className="px-6 py-4 border-b border-white/10">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-white font-semibold truncate">{v.item}</div>
                <div className="text-white/60 text-xs mt-1">{v.fecha} • ID: {v.id}</div>
              </div>
              <div className="text-right">
                <div className="text-white font-extrabold">{v.total}</div>
                <div className="text-white/60 text-xs">{v.estado}</div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </EcomLayout>
  );
}
