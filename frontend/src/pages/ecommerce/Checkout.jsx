import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EcomLayout from "./_EcomLayout";
import { productosMock } from "../../data/ecommerceMock";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedId = location.state?.selectedId || "";

  const item = useMemo(() => productosMock.find((x) => x.id === selectedId) || null, [selectedId]);
  const [notes, setNotes] = useState("");

  return (
    <EcomLayout title="Checkout (demo)" subtitle="Simulación de compra B2B.">
      <section className="grid gap-4 lg:grid-cols-[1fr_420px]">
        <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
          <div className="text-white font-bold">Detalle</div>

          {!item ? (
            <div className="mt-3 text-white/70">No hay item seleccionado.</div>
          ) : (
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-white/85">
                <div className="text-xs text-white/60">{item.tipo} • {item.categoria}</div>
                <div className="text-white font-extrabold mt-1">{item.nombre}</div>
                <div className="text-white/60 text-sm mt-1">
                  Proveedor: <span className="text-white font-semibold">{item.proveedor.nombre}</span>
                </div>
              </div>

              <label className="block text-sm">
                <span className="block text-xs font-semibold text-white/70 mb-1">Notas de negociación</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl bg-white/90 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-300/70"
                  placeholder="Condiciones, tiempos, requisitos..."
                />
              </label>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/ecommerce/cotizaciones", { state: { selectedId } })}
                  className="rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition px-5 py-3 text-white/90 shadow-lg"
                >
                  Volver a cotización
                </button>
                <button
                  onClick={() => alert("Orden creada (demo). Luego lo conectamos con backend/pagos.")}
                  className="rounded-2xl bg-yellow-400 px-5 py-3 font-semibold text-slate-900 shadow hover:brightness-95 transition"
                >
                  Confirmar orden
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6 h-fit">
          <div className="text-white font-bold">Método de pago (demo)</div>
          <div className="mt-3 text-white/70 text-sm space-y-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">• Pago inmediato</div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">• Pago a crédito (fase 2)</div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">• Pago por hitos (fase 2)</div>
          </div>
        </aside>
      </section>
    </EcomLayout>
  );
}
