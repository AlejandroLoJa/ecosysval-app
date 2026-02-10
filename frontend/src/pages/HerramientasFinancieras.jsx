// src/pages/HerramientasFinancieras.jsx
import React, { useMemo, useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";
import {
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  Calculator,
  Info,
  RefreshCcw,
} from "lucide-react";

const PAISES = [
  { code: "MX", name: "México", currency: "MXN" },
  { code: "US", name: "Estados Unidos", currency: "USD" },
  { code: "CA", name: "Canadá", currency: "CAD" },
];

const MONEDAS = ["MXN", "USD", "CAD"];

// Mock de tipo de cambio (luego viene API)
const FX_MOCK = {
  "USD_MXN": 17.2,
  "CAD_MXN": 12.7,
  "MXN_USD": 1 / 17.2,
  "MXN_CAD": 1 / 12.7,
  "USD_CAD": 1.34,
  "CAD_USD": 1 / 1.34,
};

// Mock commodities (luego viene API)
const COMMODITIES_MOCK = [
  { id: 1, name: "Acero (HRC)", unit: "USD/ton", value: 720, change: "+1.2%" },
  { id: 2, name: "Madera (Lumber)", unit: "USD/MBF", value: 520, change: "-0.6%" },
  { id: 3, name: "Petróleo (WTI)", unit: "USD/barril", value: 78.4, change: "+0.9%" },
  { id: 4, name: "Maíz", unit: "USD/bushel", value: 4.62, change: "+0.2%" },
];

const TABS = [
  { key: "resumen", label: "Resumen", icon: Wallet },
  { key: "fx", label: "Monedas", icon: ArrowLeftRight },
  { key: "commodities", label: "Mercados", icon: TrendingUp },
  { key: "pricing", label: "Precio sugerido", icon: Calculator },
];

export default function HerramientasFinancieras() {
  const [tab, setTab] = useState("resumen");

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover flex flex-col"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <MainHeader />

      <div className="flex flex-1">
        <aside className="w-64 bg-blue-900 text-white shadow-lg hidden md:block">
          <SidebarMenu />
        </aside>

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Header del módulo */}
            <div className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-xl p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-white font-extrabold text-xl md:text-2xl">
                    Herramientas financieras
                  </h1>
                  <p className="text-white/70 text-sm mt-1 max-w-2xl">
                    Toma decisiones más rápidas con indicadores, tipo de cambio, precios de mercado
                    y cálculos de rentabilidad (México, USA y Canadá).
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition px-4 py-2.5 text-white/90 shadow-lg"
                  title="Actualizar (mock)"
                  onClick={() => {
                    // luego aquí llamas tus fetch reales
                    // por ahora, solo demo visual
                    alert("Luego conectamos APIs: FX + Commodities + Indicadores");
                  }}
                >
                  <RefreshCcw className="w-4 h-4" />
                  Actualizar datos
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {TABS.map((t) => {
                const Icon = t.icon;
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTab(t.key)}
                    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 border transition shadow-sm ${
                      active
                        ? "bg-yellow-400 text-slate-900 border-yellow-300"
                        : "bg-black/40 text-white/80 border-white/10 hover:bg-black/55"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-semibold">{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Contenido */}
            {tab === "resumen" && <ResumenPanel />}
            {tab === "fx" && <FXPanel />}
            {tab === "commodities" && <CommoditiesPanel />}
            {tab === "pricing" && <PricingPanel />}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ------------------ TAB 1: RESUMEN ------------------ */
function ResumenPanel() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
        <h2 className="text-white font-bold text-lg">Resumen financiero</h2>
        <p className="text-white/70 text-sm mt-1">
          Vista rápida para decisiones: indicadores clave + alertas.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <KpiCard title="Liquidez (mock)" value="1.42" note="Saludable" />
          <KpiCard title="Margen bruto (mock)" value="28%" note="Estable" />
          <KpiCard title="Capacidad compra (mock)" value="$45,000 USD" note="Estimado" />
          <KpiCard title="Riesgo TC (mock)" value="Medio" note="MXN vs USD" />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl bg-yellow-400/20 border border-yellow-300/20 p-2">
              <Info className="w-4 h-4 text-yellow-200" />
            </div>
            <div>
              <p className="text-white font-semibold">Sugerencia</p>
              <p className="text-white/70 text-sm mt-1">
                Conecta el tipo de cambio y commodities para calcular un{" "}
                <span className="text-yellow-200 font-semibold">
                  precio mínimo recomendado
                </span>{" "}
                por país y proteger márgenes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
        <h3 className="text-white font-bold text-lg">Atajos</h3>
        <p className="text-white/70 text-sm mt-1">Acciones rápidas.</p>

        <div className="mt-5 grid gap-3">
          <QuickAction title="Convertir monedas" desc="MXN/USD/CAD con histórico." />
          <QuickAction title="Ver commodities" desc="Acero, madera, energía, agro." />
          <QuickAction title="Calcular precio sugerido" desc="Costos + margen + TC." />
        </div>
      </div>
    </section>
  );
}

function KpiCard({ title, value, note }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-white/60 text-xs font-semibold">{title}</p>
      <p className="text-white text-2xl font-extrabold mt-2">{value}</p>
      <p className="text-white/60 text-xs mt-1">{note}</p>
    </div>
  );
}

function QuickAction({ title, desc }) {
  return (
    <button
      type="button"
      className="text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-4"
      onClick={() => alert(`Luego conectamos acción: ${title}`)}
    >
      <p className="text-white font-semibold">{title}</p>
      <p className="text-white/60 text-xs mt-1">{desc}</p>
    </button>
  );
}

/* ------------------ TAB 2: MONEDAS ------------------ */
function FXPanel() {
  const [pais, setPais] = useState("MX");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("MXN");
  const [amount, setAmount] = useState("1000");

  const rateKey = `${from}_${to}`;
  const rate = FX_MOCK[rateKey] || 0;

  const result = useMemo(() => {
    const a = Number(amount || 0);
    if (!rate || Number.isNaN(a)) return 0;
    return a * rate;
  }, [amount, rate]);

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
        <h2 className="text-white font-bold text-lg">Conversor de monedas</h2>
        <p className="text-white/70 text-sm mt-1">
          Preparado para conectar API (tipo de cambio real + variación).
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="País (contexto)">
            <select
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none"
            >
              {PAISES.map((p) => (
                <option key={p.code} value={p.code} className="text-slate-900">
                  {p.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Monto">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none"
              placeholder="1000"
            />
          </Field>

          <Field label="De">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none"
            >
              {MONEDAS.map((m) => (
                <option key={m} value={m} className="text-slate-900">
                  {m}
                </option>
              ))}
            </select>
          </Field>

          <Field label="A">
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none"
            >
              {MONEDAS.map((m) => (
                <option key={m} value={m} className="text-slate-900">
                  {m}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-white/60 text-xs font-semibold">Resultado</p>
          <p className="text-white text-3xl font-extrabold mt-2">
            {formatMoney(result, to)}
          </p>
          <p className="text-white/60 text-xs mt-2">
            Tipo de cambio (mock): <span className="text-white/80">{rate || "—"}</span>
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
        <h3 className="text-white font-bold text-lg">Notas</h3>
        <p className="text-white/70 text-sm mt-2">
          Luego aquí mostramos:
        </p>
        <ul className="mt-3 space-y-2 text-white/70 text-sm">
          <li>• Variación 7 / 30 / 90 días</li>
          <li>• Alertas por volatilidad</li>
          <li>• Impacto en margen</li>
        </ul>
      </div>
    </section>
  );
}

/* ------------------ TAB 3: MERCADOS ------------------ */
function CommoditiesPanel() {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-white font-bold text-lg">Mercados / Commodities</h2>
          <p className="text-white/70 text-sm mt-1">
            Lista base. Luego lo conectamos a TradingEconomics/Nasdaq Data Link.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition px-4 py-2.5 text-white/90"
          onClick={() => alert("Luego: refrescar commodities desde API")}
        >
          <RefreshCcw className="w-4 h-4" />
          Refrescar
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr className="text-white/70">
              <th className="text-left px-4 py-3">Activo</th>
              <th className="text-left px-4 py-3">Unidad</th>
              <th className="text-right px-4 py-3">Valor</th>
              <th className="text-right px-4 py-3">Cambio</th>
            </tr>
          </thead>
          <tbody>
            {COMMODITIES_MOCK.map((c) => (
              <tr key={c.id} className="border-t border-white/10 text-white/85">
                <td className="px-4 py-3 font-semibold">{c.name}</td>
                <td className="px-4 py-3 text-white/70">{c.unit}</td>
                <td className="px-4 py-3 text-right">{c.value}</td>
                <td className="px-4 py-3 text-right">{c.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ------------------ TAB 4: PRECIO SUGERIDO ------------------ */
function PricingPanel() {
  const [pais, setPais] = useState("MX");
  const [monedaVenta, setMonedaVenta] = useState("MXN");
  const [costoBase, setCostoBase] = useState("100");
  const [logistica, setLogistica] = useState("15");
  const [otros, setOtros] = useState("10");
  const [margen, setMargen] = useState("25");

  const totalCosto = useMemo(() => {
    const a = Number(costoBase || 0);
    const b = Number(logistica || 0);
    const c = Number(otros || 0);
    return a + b + c;
  }, [costoBase, logistica, otros]);

  const precioSugerido = useMemo(() => {
    const m = Number(margen || 0) / 100;
    if (totalCosto <= 0) return 0;
    return totalCosto * (1 + m);
  }, [totalCosto, margen]);

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
        <h2 className="text-white font-bold text-lg">Precio sugerido</h2>
        <p className="text-white/70 text-sm mt-1">
          Fórmula MVP: (costo + logística + otros) + margen.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="País destino">
            <select
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none"
            >
              {PAISES.map((p) => (
                <option key={p.code} value={p.code} className="text-slate-900">
                  {p.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Moneda de venta">
            <select
              value={monedaVenta}
              onChange={(e) => setMonedaVenta(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none"
            >
              {MONEDAS.map((m) => (
                <option key={m} value={m} className="text-slate-900">
                  {m}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Costo base">
            <input
              value={costoBase}
              onChange={(e) => setCostoBase(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none"
              placeholder="100"
            />
          </Field>

          <Field label="Logística">
            <input
              value={logistica}
              onChange={(e) => setLogistica(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none"
              placeholder="15"
            />
          </Field>

          <Field label="Otros costos">
            <input
              value={otros}
              onChange={(e) => setOtros(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none"
              placeholder="10"
            />
          </Field>

          <Field label="Margen (%)">
            <input
              value={margen}
              onChange={(e) => setMargen(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none"
              placeholder="25"
            />
          </Field>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-white/60 text-xs font-semibold">Costo total</p>
            <p className="text-white text-2xl font-extrabold mt-2">
              {formatMoney(totalCosto, monedaVenta)}
            </p>
          </div>
          <div className="rounded-2xl border border-yellow-300/20 bg-yellow-400/15 p-5">
            <p className="text-yellow-100 text-xs font-semibold">Precio sugerido</p>
            <p className="text-white text-2xl font-extrabold mt-2">
              {formatMoney(precioSugerido, monedaVenta)}
            </p>
            <p className="text-white/60 text-xs mt-1">
              País: <span className="text-white/85">{pais}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
        <h3 className="text-white font-bold text-lg">Próximo paso</h3>
        <p className="text-white/70 text-sm mt-2">
          Aquí conectaremos:
        </p>
        <ul className="mt-3 space-y-2 text-white/70 text-sm">
          <li>• Tipo de cambio real (si vendes en otra moneda)</li>
          <li>• Costos por país (impuestos/logística)</li>
          <li>• Ajuste por commodity (madera/acero)</li>
        </ul>
      </div>
    </section>
  );
}

/* ------------------ Helpers ------------------ */
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-white/70 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

function formatMoney(value, currency) {
  const n = Number(value || 0);
  try {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency || ""}`;
  }
}
