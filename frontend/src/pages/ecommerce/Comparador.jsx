// src/pages/ecommerce/Comparador.jsx
import React, { useMemo, useState } from "react";
import { BadgeCheck, ShieldAlert } from "lucide-react";
import EcomLayout from "./_EcomLayout";
import { proveedoresMock } from "../../data/ecommerceMock";

export default function Comparador() {
  const [orden, setOrden] = useState("precio");

  const rows = useMemo(() => {
    const arr = [...proveedoresMock];
    if (orden === "precio") arr.sort((a, b) => a.precioRelativo - b.precioRelativo);
    if (orden === "lead") arr.sort((a, b) => a.leadTimeDias - b.leadTimeDias);
    if (orden === "rating") arr.sort((a, b) => b.rating - a.rating);
    if (orden === "cumplimiento") arr.sort((a, b) => b.cumplimiento - a.cumplimiento);
    return arr;
  }, [orden]);

  return (
    <EcomLayout
      title="Comparador de proveedores"
      subtitle="Comparación por precio, lead time, verificación y cumplimiento."
      rightSlot={
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="rounded-2xl px-3 py-2 bg-white/90 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-yellow-300/70"
        >
          <option value="precio">Orden: Precio</option>
          <option value="lead">Orden: Lead time</option>
          <option value="rating">Orden: Rating</option>
          <option value="cumplimiento">Orden: Cumplimiento</option>
        </select>
      }
    >
      <section className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 text-white/70 text-sm">
          Precio relativo: <span className="text-white font-semibold">1.00 = referencia</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-white/60">
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-3">Proveedor</th>
                <th className="text-left px-6 py-3">País</th>
                <th className="text-left px-6 py-3">Verificación</th>
                <th className="text-left px-6 py-3">Precio relativo</th>
                <th className="text-left px-6 py-3">Lead time</th>
                <th className="text-left px-6 py-3">Cumplimiento</th>
                <th className="text-left px-6 py-3">Rating</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-b border-white/10 text-white/85">
                  <td className="px-6 py-4 font-semibold">{p.nombre}</td>
                  <td className="px-6 py-4">{p.pais}</td>
                  <td className="px-6 py-4">
                    {p.verificado ? (
                      <span className="inline-flex items-center gap-1 text-emerald-300">
                        <BadgeCheck className="w-4 h-4" /> Verificado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-300">
                        <ShieldAlert className="w-4 h-4" /> No verificado
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs">
                      {p.precioRelativo.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{p.leadTimeDias} días</td>
                  <td className="px-6 py-4">{p.cumplimiento}%</td>
                  <td className="px-6 py-4">⭐ {p.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </EcomLayout>
  );
}
