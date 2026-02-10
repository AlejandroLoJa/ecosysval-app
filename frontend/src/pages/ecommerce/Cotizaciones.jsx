// src/pages/ecommerce/Cotizaciones.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FileText, Truck, TrendingUp } from "lucide-react";
import EcomLayout from "./_EcomLayout";
import { FX_MOCK, PAISES, productosMock } from "../../data/ecommerceMock";

export default function Cotizaciones() {
  const location = useLocation();
  const navigate = useNavigate();

  const preselect = location.state?.selectedId || "";

  const [selectedId, setSelectedId] = useState(preselect);
  const [destino, setDestino] = useState("MX");
  const [cantidad, setCantidad] = useState(10);

  const item = useMemo(
    () => productosMock.find((x) => x.id === selectedId) || null,
    [selectedId]
  );

  const calc = useMemo(() => {
    if (!item) return null;

    // descuento por volumen (demo)
    const disc =
      cantidad >= 100 ? 0.12 : cantidad >= 50 ? 0.08 : cantidad >= 20 ? 0.04 : 0;

    const subtotal = item.precioBase * cantidad * (1 - disc);

    // logística estimada (demo)
    const lead = item.tiemposEntrega?.[destino] ?? 7;
    const logistics = Math.max(25, subtotal * 0.02) + lead * 3;

    // convertir moneda (demo)
    const outCurrency = PAISES.find((p) => p.code === destino)?.currency || "MXN";
    const converted = convert(subtotal + logistics, item.moneda, outCurrency);

    return {
      disc,
      subtotal,
      logistics,
      lead,
      outCurrency,
      totalConverted: converted,
    };
  }, [item, destino, cantidad]);

  return (
    <EcomLayout
      title="Cotizaciones inteligentes"
      subtitle="Volumen + logística + lead time + conversión de moneda (demo)."
      rightSlot={
        <button
          onClick={() => navigate("/ecommerce/marketplace")}
          className="rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition px-4 py-3 text-white/90 shadow-lg"
        >
          Volver al Marketplace
        </button>
      }
    >
      <section className="grid gap-4 lg:grid-cols-[1fr_420px]">
        <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="text-white/70 text-xs font-semibold">Producto / Servicio</label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="mt-1 w-full rounded-2xl px-3 py-2.5 bg-white/90 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-yellow-300/70"
              >
                <option value="">Selecciona…</option>
                {productosMock.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} ({p.moneda})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-white/70 text-xs font-semibold">Destino</label>
              <select
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                className="mt-1 w-full rounded-2xl px-3 py-2.5 bg-white/90 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-yellow-300/70"
              >
                {PAISES.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-white/70 text-xs font-semibold">Cantidad</label>
              <input
                type="number"
                min={1}
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value || 1))}
                className="mt-1 w-full rounded-2xl px-3 py-2.5 bg-white/90 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-yellow-300/70"
              />
              <div className="text-white/50 text-xs mt-1">
                Descuento demo según volumen.
              </div>
            </div>
          </div>

          {!item ? (
            <div className="mt-6 text-white/70">
              Selecciona un producto para generar una cotización.
            </div>
          ) : (
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <Card label="Precio base" value={formatMoney(item.precioBase, item.moneda)} />
              <Card label="Unidad" value={item.unidad} />
              <Card label="Incoterm" value={item.incoterm} />

              <div className="md:col-span-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-white/85">
                <div className="text-xs text-white/60">Notas</div>
                <div className="mt-1 text-sm">
                  Lead time estimado según destino y costo logístico demo. Luego lo conectamos con API real.
                </div>
              </div>

              <div className="md:col-span-3 flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => navigate("/ecommerce/checkout", { state: { selectedId: item.id } })}
                  className="rounded-2xl bg-yellow-400 px-5 py-3 font-semibold text-slate-900 shadow hover:brightness-95 transition inline-flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Continuar a checkout
                </button>

                <button
                  onClick={() => navigate(`/ecommerce/producto/${item.id}`)}
                  className="rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition px-5 py-3 text-white/90 shadow-lg"
                >
                  Ver detalle
                </button>
              </div>
            </div>
          )}
        </div>

        {/* resumen */}
        <aside className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6 h-fit">
          <div className="text-white font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-yellow-300" />
            Resumen de cotización
          </div>

          {!calc ? (
            <div className="mt-4 text-white/70 text-sm">
              Aquí verás el total estimado cuando selecciones un producto.
            </div>
          ) : (
            <div className="mt-4 space-y-3 text-white/85 text-sm">
              <Row label="Descuento por volumen" value={`${Math.round(calc.disc * 100)}%`} />
              <Row label="Subtotal" value={formatMoney(calc.subtotal, item.moneda)} />
              <Row
                label={
                  <span className="inline-flex items-center gap-2">
                    <Truck className="w-4 h-4" /> Logística estimada
                  </span>
                }
                value={formatMoney(calc.logistics, item.moneda)}
              />
              <Row label="Lead time" value={`${calc.lead} días`} />

              <div className="h-px bg-white/10 my-2" />

              <Row
                label={<span className="font-semibold text-white">Total (convertido)</span>}
                value={
                  <span className="font-extrabold text-white">
                    {formatMoney(calc.totalConverted, calc.outCurrency)}
                  </span>
                }
              />

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-white/70 text-xs">
                Conversión demo. Luego lo conectamos con tipo de cambio real.
              </div>
            </div>
          )}
        </aside>
      </section>
    </EcomLayout>
  );
}

function Card({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
      <div className="text-white/60 text-[11px]">{label}</div>
      <div className="text-white font-bold mt-0.5">{value}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-white/60">{label}</div>
      <div className="text-right">{value}</div>
    </div>
  );
}

function formatMoney(v, currency) {
  try {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(v);
  } catch {
    return `${currency} ${v}`;
  }
}

function convert(amount, from, to) {
  if (from === to) return amount;

  // normalizar a USD
  let usd = amount;
  if (from === "MXN") usd = amount / FX_MOCK.USD_MXN;
  if (from === "CAD") usd = amount / FX_MOCK.USD_CAD;

  // usd a destino
  if (to === "USD") return usd;
  if (to === "MXN") return usd * FX_MOCK.USD_MXN;
  if (to === "CAD") return usd * FX_MOCK.USD_CAD;

  return amount;
}
