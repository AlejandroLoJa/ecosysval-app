import React from "react";
import EcomLayout from "./_EcomLayout";

export default function EcommerceAnalytics() {
  const stats = [
    { label: "Compras (mes)", value: "12", hint: "Transacciones confirmadas" },
    { label: "Ventas (mes)", value: "7", hint: "Órdenes cerradas" },
    { label: "Ahorro estimado", value: "USD $4,250", hint: "Por comparación proveedores" },
    { label: "Cumplimiento promedio", value: "91%", hint: "Score logístico/comercial" },
  ];

  return (
    <EcomLayout title="Analytics" subtitle="Resumen ejecutivo del e-commerce (demo).">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
            <div className="text-white/60 text-xs">{s.label}</div>
            <div className="text-white font-extrabold text-3xl mt-2">{s.value}</div>
            <div className="text-white/50 text-xs mt-2">{s.hint}</div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
        <div className="text-white font-bold">Insights (demo)</div>
        <ul className="mt-3 text-white/70 text-sm grid gap-2 md:grid-cols-2">
          <li>• Mejor categoría del mes: Madera (alta demanda)</li>
          <li>• Proveedor top: cumplimiento +95%</li>
          <li>• Mayor ahorro: comparador activado en 60% de órdenes</li>
          <li>• Oportunidad: activar logística estimada por API</li>
        </ul>
      </section>
    </EcomLayout>
  );
}
