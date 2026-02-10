// src/pages/Tendencias.jsx
import React, { useMemo, useState } from "react";
import MainHeader from "../components/MainHeader";
import SidebarMenu from "../components/SidebarMenu";
import {
  TrendingUp,
  Search,
  Filter,
  Sparkles,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  MapPin,
  Tag,
  BarChart3,
  LineChart as LineIcon,
  BadgeCheck,
  Lightbulb,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

/* ---------------- Mock data (luego lo conectas a backend) ---------------- */

// Eventos de demanda (lo que están pidiendo empresas)
const demandEventsMock = [
  // MX
  { id: 1, pais: "México", sector: "Construcción", item: "Madera de pino", tipo: "Producto", semana: "S1", count: 18, unidad: "m³", tendencia: 0.92 },
  { id: 2, pais: "México", sector: "Construcción", item: "Acero laminado", tipo: "Producto", semana: "S1", count: 10, unidad: "Ton", tendencia: 0.71 },
  { id: 3, pais: "México", sector: "Logística", item: "Transporte nacional", tipo: "Servicio", semana: "S1", count: 9, unidad: "Rutas", tendencia: 0.66 },
  { id: 4, pais: "México", sector: "Textil", item: "Textil industrial", tipo: "Producto", semana: "S1", count: 6, unidad: "Lotes", tendencia: 0.58 },

  { id: 5, pais: "México", sector: "Construcción", item: "Madera de pino", tipo: "Producto", semana: "S2", count: 24, unidad: "m³", tendencia: 0.95 },
  { id: 6, pais: "México", sector: "Construcción", item: "Acero laminado", tipo: "Producto", semana: "S2", count: 13, unidad: "Ton", tendencia: 0.74 },
  { id: 7, pais: "México", sector: "Logística", item: "Transporte nacional", tipo: "Servicio", semana: "S2", count: 11, unidad: "Rutas", tendencia: 0.70 },
  { id: 8, pais: "México", sector: "Textil", item: "Textil industrial", tipo: "Producto", semana: "S2", count: 8, unidad: "Lotes", tendencia: 0.61 },

  // USA
  { id: 9, pais: "Estados Unidos", sector: "Construcción", item: "Lumber (Pine)", tipo: "Producto", semana: "S1", count: 14, unidad: "m³", tendencia: 0.78 },
  { id: 10, pais: "Estados Unidos", sector: "Automotriz", item: "Componentes OEM", tipo: "Producto", semana: "S1", count: 7, unidad: "Lotes", tendencia: 0.64 },
  { id: 11, pais: "Estados Unidos", sector: "Logística", item: "Cross-border MX↔USA", tipo: "Servicio", semana: "S1", count: 9, unidad: "Rutas", tendencia: 0.73 },

  { id: 12, pais: "Estados Unidos", sector: "Construcción", item: "Lumber (Pine)", tipo: "Producto", semana: "S2", count: 17, unidad: "m³", tendencia: 0.83 },
  { id: 13, pais: "Estados Unidos", sector: "Automotriz", item: "Componentes OEM", tipo: "Producto", semana: "S2", count: 9, unidad: "Lotes", tendencia: 0.69 },
  { id: 14, pais: "Estados Unidos", sector: "Logística", item: "Cross-border MX↔USA", tipo: "Servicio", semana: "S2", count: 11, unidad: "Rutas", tendencia: 0.77 },

  // CAN
  { id: 15, pais: "Canadá", sector: "Construcción", item: "Madera estructural", tipo: "Producto", semana: "S1", count: 8, unidad: "m³", tendencia: 0.62 },
  { id: 16, pais: "Canadá", sector: "Automotriz", item: "Networking proveedores", tipo: "Servicio", semana: "S1", count: 6, unidad: "Paquetes", tendencia: 0.57 },
  { id: 17, pais: "Canadá", sector: "Construcción", item: "Madera estructural", tipo: "Producto", semana: "S2", count: 12, unidad: "m³", tendencia: 0.74 },
  { id: 18, pais: "Canadá", sector: "Automotriz", item: "Networking proveedores", tipo: "Servicio", semana: "S2", count: 7, unidad: "Paquetes", tendencia: 0.61 },
];

// “No atendidas” = solicitudes que te llegaron (o detectaste) y no pudiste cerrar por falta de stock / capacidad
const unmetDemandMock = [
  {
    id: "ud-001",
    pais: "México",
    estado: "Jalisco",
    sector: "Construcción",
    item: "Madera de pino",
    motivo: "Sin inventario",
    cantidad: "15 m³",
    fecha: "2026-02-03",
    empresas: 5,
    score: 92,
  },
  {
    id: "ud-002",
    pais: "México",
    estado: "CDMX",
    sector: "Logística",
    item: "Transporte nacional",
    motivo: "Capacidad limitada",
    cantidad: "2 rutas/semana",
    fecha: "2026-02-05",
    empresas: 3,
    score: 81,
  },
  {
    id: "ud-003",
    pais: "Estados Unidos",
    estado: "Texas",
    sector: "Logística",
    item: "Cross-border MX↔USA",
    motivo: "Sin partner aduanal",
    cantidad: "1 ruta/semana",
    fecha: "2026-02-01",
    empresas: 2,
    score: 77,
  },
];

// Recomendaciones (acciones sugeridas)
function buildRecommendations({ topItem, sector, pais }) {
  const recs = [];

  if (topItem) {
    recs.push({
      id: "r1",
      titulo: `Adquirir stock / capacidad: ${topItem.item}`,
      desc: `Alta demanda detectada en ${pais}. Considera abastecerte o aliarte con un proveedor para capturar pedidos recurrentes.`,
      action: "Crear plan de abastecimiento",
      icon: Package,
    });
    recs.push({
      id: "r2",
      titulo: `Publicar oferta y activar alcance`,
      desc: `Crea una publicación/oferta destacada con ${topItem.item} y condiciones. Aumenta visibilidad ante empresas buscando ese ítem.`,
      action: "Publicar oferta",
      icon: ArrowUpRight,
    });
  }

  recs.push({
    id: "r3",
    titulo: `Buscar alianzas por sector: ${sector || "tu sector"}`,
    desc: `Conecta con empresas complementarias para cubrir demanda (logística, insumos, certificaciones, financiamiento).`,
    action: "Ver alianzas",
    icon: BadgeCheck,
  });

  recs.push({
    id: "r4",
    titulo: `Configurar alertas inteligentes`,
    desc: `Define palabras clave, países y monto mínimo. Recibe alertas cuando la demanda suba o aparezcan oportunidades similares.`,
    action: "Configurar alertas",
    icon: Sparkles,
  });

  return recs;
}

/* ---------------- UI helpers ---------------- */
const glassCard =
  "rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-2xl";

const chipBase =
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-extrabold";

function scoreChip(score) {
  if (score >= 85) return "border-emerald-300/20 bg-emerald-500/15 text-emerald-200";
  if (score >= 70) return "border-amber-300/20 bg-amber-500/15 text-amber-200";
  return "border-red-300/20 bg-red-500/15 text-red-200";
}

export default function Tendencias() {
  const [pais, setPais] = useState("México");
  const [sector, setSector] = useState("Todos");
  const [tipo, setTipo] = useState("Todos"); // Producto | Servicio | Todos
  const [q, setQ] = useState("");
  const [periodo, setPeriodo] = useState("Últimas 2 semanas");

  const paises = ["México", "Estados Unidos", "Canadá"];
  const sectores = useMemo(() => {
    const list = Array.from(new Set(demandEventsMock.map((d) => d.sector)));
    return ["Todos", ...list];
  }, []);

  const filtrados = useMemo(() => {
    const term = q.trim().toLowerCase();
    return demandEventsMock.filter((d) => {
      const okPais = d.pais === pais;
      const okSector = sector === "Todos" ? true : d.sector === sector;
      const okTipo = tipo === "Todos" ? true : d.tipo === tipo;
      const okSearch =
        !term ||
        d.item.toLowerCase().includes(term) ||
        d.sector.toLowerCase().includes(term);

      return okPais && okSector && okTipo && okSearch;
    });
  }, [pais, sector, tipo, q]);

  // Top items agrupados
  const topItems = useMemo(() => {
    const map = new Map();
    for (const d of filtrados) {
      const key = `${d.item}__${d.tipo}__${d.sector}`;
      const prev = map.get(key) || { item: d.item, tipo: d.tipo, sector: d.sector, total: 0, unidad: d.unidad, trend: 0 };
      prev.total += d.count;
      prev.trend = Math.max(prev.trend, d.tendencia);
      map.set(key, prev);
    }
    return Array.from(map.values()).sort((a, b) => b.total - a.total).slice(0, 8);
  }, [filtrados]);

  const topItem = topItems[0] || null;

  // Serie para línea (demanda por semana)
  const lineSeries = useMemo(() => {
    const weeks = ["S1", "S2", "S3", "S4"];
    const totals = new Map(weeks.map((w) => [w, 0]));
    for (const d of filtrados) totals.set(d.semana, (totals.get(d.semana) || 0) + d.count);
    return weeks
      .filter((w) => totals.get(w) !== undefined)
      .map((w) => ({ semana: w, demanda: totals.get(w) || 0 }));
  }, [filtrados]);

  // Barras: top items
  const barSeries = useMemo(() => topItems.map((t) => ({ name: t.item, total: t.total })), [topItems]);

  // Unmet demand del país/sector
  const unmet = useMemo(() => {
    const term = q.trim().toLowerCase();
    return unmetDemandMock.filter((u) => {
      const okPais = u.pais === pais;
      const okSector = sector === "Todos" ? true : u.sector === sector;
      const okSearch = !term || u.item.toLowerCase().includes(term) || u.motivo.toLowerCase().includes(term);
      return okPais && okSector && okSearch;
    }).sort((a, b) => b.score - a.score);
  }, [pais, sector, q]);

  const kpiDemanda = useMemo(() => filtrados.reduce((acc, d) => acc + d.count, 0), [filtrados]);
  const kpiNoAtendida = useMemo(() => unmet.reduce((acc, u) => acc + u.empresas, 0), [unmet]);
  const kpiTendencias = topItems.length;
  const kpiOpportunityScore = useMemo(() => {
    if (!topItem) return 0;
    // Score simple: mezcla tendencia (0-1) y volumen
    const volumeScore = Math.min(100, Math.round((topItem.total / 30) * 100));
    const trendScore = Math.round(topItem.trend * 100);
    return Math.round((volumeScore * 0.55) + (trendScore * 0.45));
  }, [topItem]);

  const recommendations = useMemo(
    () => buildRecommendations({ topItem, sector: sector === "Todos" ? (topItem?.sector || "General") : sector, pais }),
    [topItem, sector, pais]
  );

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover flex flex-col"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <MainHeader showSearch={true} />

      <div className="flex flex-1">
        <aside className="w-64 bg-blue-900 text-white shadow-lg hidden md:block">
          <SidebarMenu />
        </aside>

        <main className="flex-1 p-6 relative">
          <div className="absolute inset-0 bg-black/25 -z-10" />

          <div className="mx-auto w-full max-w-6xl space-y-6">
            {/* Header */}
            <div className={`${glassCard} px-6 py-5`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-yellow-300" />
                  </div>

                  <div>
                    <h1 className="text-white font-extrabold text-xl md:text-2xl">
                      Tendencias de mercado
                    </h1>
                    <p className="text-white/70 text-sm mt-1 max-w-2xl">
                      Detecta qué están solicitando las empresas, identifica demanda no atendida y recibe sugerencias
                      para capturar oportunidades por país, sector y tipo de operación.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={`${chipBase} border-white/10 bg-white/5 text-white/80`}>
                        <MapPin className="w-3.5 h-3.5" />
                        {pais}
                      </span>
                      <span className={`${chipBase} border-white/10 bg-white/5 text-white/80`}>
                        <Tag className="w-3.5 h-3.5" />
                        {sector === "Todos" ? "Todos los sectores" : sector}
                      </span>
                      <span className={`${chipBase} border-white/10 bg-white/5 text-white/80`}>
                        <Filter className="w-3.5 h-3.5" />
                        {periodo}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => alert("Mock: actualizar / sincronizar tendencias")}
                    className="rounded-full bg-white/10 border border-white/10 px-5 py-2 text-sm font-extrabold text-white/90 hover:bg-white/15 transition"
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Mock: configurar alertas")}
                    className="rounded-full bg-[#ffcf43] px-5 py-2 text-sm font-extrabold text-[#071a33] shadow hover:brightness-105 transition"
                  >
                    Configurar alertas
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className={`${glassCard} p-5`}>
              <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto_auto_auto] items-end">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Buscar productos/servicios (ej: pino, logística, acero...)"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-yellow-400/60"
                  />
                </div>

                <Select value={pais} onChange={setPais} label="País" options={paises} />
                <Select value={sector} onChange={setSector} label="Sector" options={sectores} />
                <Select value={tipo} onChange={setTipo} label="Tipo" options={["Todos", "Producto", "Servicio"]} />
                <Select value={periodo} onChange={setPeriodo} label="Periodo" options={["Últimas 2 semanas", "Últimos 30 días", "Últimos 90 días"]} />
              </div>
            </div>

            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Kpi
                title="Demanda detectada"
                value={kpiDemanda}
                subtitle="Total de solicitudes / señales"
                icon={BarChart3}
              />
              <Kpi
                title="No atendidas"
                value={kpiNoAtendida}
                subtitle="Empresas afectadas"
                icon={AlertTriangle}
                accent="warn"
              />
              <Kpi
                title="Tendencias activas"
                value={kpiTendencias}
                subtitle="Productos/servicios top"
                icon={LineIcon}
              />
              <Kpi
                title="Opportunity score"
                value={`${kpiOpportunityScore}%`}
                subtitle="Potencial estimado"
                icon={Sparkles}
                accent="good"
              />
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className={`${glassCard} p-6`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-white font-extrabold">Demanda por semana</div>
                    <div className="text-white/60 text-sm">
                      Señales agregadas (filtrado por país/sector/tipo)
                    </div>
                  </div>
                  <span className={`${chipBase} border-white/10 bg-white/5 text-white/80`}>
                    <TrendingUp className="w-3.5 h-3.5 text-yellow-300" />
                    {topItem ? `Top: ${topItem.item}` : "Sin datos"}
                  </span>
                </div>

                <div className="mt-5 h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineSeries}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="semana" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="demanda" strokeWidth={3} dot />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className={`${glassCard} p-6`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-white font-extrabold">Ranking de tendencias</div>
                    <div className="text-white/60 text-sm">
                      Top ítems por volumen total detectado
                    </div>
                  </div>
                  <span className={`${chipBase} border-white/10 bg-white/5 text-white/80`}>
                    <Package className="w-3.5 h-3.5 text-yellow-300" />
                    {tipo}
                  </span>
                </div>

                <div className="mt-5 h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barSeries}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" hide />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="total" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid gap-2">
                  {topItems.slice(0, 5).map((t) => (
                    <div
                      key={t.item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-white font-semibold truncate">{t.item}</div>
                        <div className="text-white/60 text-xs truncate">
                          {t.sector} • {t.tipo} • unidad: {t.unidad}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-yellow-300 font-extrabold">{t.total}</div>
                        <div className="text-white/55 text-[11px]">volumen</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Unmet demand + Recommendations */}
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              {/* Unmet demand */}
              <div className={`${glassCard} p-6`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-white font-extrabold">Demanda no atendida</div>
                    <div className="text-white/60 text-sm">
                      Casos donde hubo intención de compra/venta pero no se cerró (stock/capacidad/partner).
                    </div>
                  </div>

                  <span className={`${chipBase} border-red-300/20 bg-red-500/15 text-red-200`}>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Señales críticas
                  </span>
                </div>

                {unmet.length === 0 ? (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/70">
                    No hay registros de demanda no atendida con estos filtros.
                  </div>
                ) : (
                  <div className="mt-5 grid gap-3">
                    {unmet.map((u) => (
                      <div
                        key={u.id}
                        className="rounded-3xl border border-white/10 bg-white/5 p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-white font-extrabold truncate">{u.item}</div>
                            <div className="text-white/60 text-sm mt-1">
                              {u.sector} • {u.estado}, {u.pais}
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className={`${chipBase} border-white/10 bg-black/25 text-white/80`}>
                                <ArrowDownLeft className="w-3.5 h-3.5" />
                                {u.cantidad}
                              </span>
                              <span className={`${chipBase} border-white/10 bg-black/25 text-white/80`}>
                                Motivo: {u.motivo}
                              </span>
                              <span className={`${chipBase} ${scoreChip(u.score)}`}>
                                Opportunity {u.score}%
                              </span>
                            </div>

                            <div className="mt-3 text-white/60 text-xs">
                              Detectado: <span className="text-white/80 font-semibold">{u.fecha}</span> • Empresas:{" "}
                              <span className="text-white/80 font-semibold">{u.empresas}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              className="rounded-xl bg-[#ffcf43] px-4 py-2 text-sm font-extrabold text-[#071a33] shadow hover:brightness-105 transition"
                              onClick={() => alert(`Mock: generar plan de abastecimiento para "${u.item}"`)}
                            >
                              Capturar oportunidad
                            </button>
                            <button
                              type="button"
                              className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-extrabold text-white/90 hover:bg-white/15 transition"
                              onClick={() => alert(`Mock: buscar proveedores/alianzas para "${u.item}"`)}
                            >
                              Buscar aliados
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommendations */}
              <div className={`${glassCard} p-6`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-white font-extrabold">Recomendaciones</div>
                    <div className="text-white/60 text-sm">
                      Acciones sugeridas basadas en señales del mercado.
                    </div>
                  </div>

                  <span className={`${chipBase} border-emerald-300/20 bg-emerald-500/15 text-emerald-200`}>
                    <Lightbulb className="w-3.5 h-3.5" />
                    Smart
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {recommendations.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div key={r.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-2xl border border-white/10 bg-black/25 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-yellow-300" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-white font-extrabold">{r.titulo}</div>
                            <div className="text-white/65 text-sm mt-1">{r.desc}</div>

                            <button
                              type="button"
                              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-extrabold text-white/90 hover:bg-white/15 transition"
                              onClick={() => alert(`Mock: ${r.action}`)}
                            >
                              {r.action}
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-5">
                  <div className="text-white font-extrabold flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-emerald-300" />
                    Consejo pro
                  </div>
                  <p className="text-white/65 text-sm mt-2 leading-relaxed">
                    Si un ítem aparece como tendencia en 2+ semanas y además hay demanda no atendida,
                    es una señal fuerte para: <strong>comprar inventario</strong>, <strong>conseguir proveedor</strong>{" "}
                    o <strong>publicar oferta</strong> con condiciones claras.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Select({ label, value, onChange, options }) {
  return (
    <div className="w-full">
      <div className="text-[11px] text-white/60 mb-1">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none
                   focus:ring-2 focus:ring-yellow-400/60"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0b1630] text-white">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Kpi({ title, value, subtitle, icon: Icon, accent }) {
  const accentClass =
    accent === "good"
      ? "border-emerald-300/20 bg-emerald-500/10"
      : accent === "warn"
      ? "border-amber-300/20 bg-amber-500/10"
      : "border-white/10 bg-black/55";

  return (
    <div className={`rounded-3xl border ${accentClass} backdrop-blur-xl shadow-2xl p-5`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-white/65 text-xs font-bold uppercase tracking-wider">{title}</div>
          <div className="text-white text-2xl font-extrabold mt-2">{value}</div>
          <div className="text-white/55 text-sm mt-1">{subtitle}</div>
        </div>
        <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
          <Icon className="w-5 h-5 text-yellow-300" />
        </div>
      </div>
    </div>
  );
}
