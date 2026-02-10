// src/pages/Grupos.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  MapPin,
  ShieldCheck,
  CalendarDays,
  Search,
  Building2,
  BadgeCheck,
  ExternalLink,
  X,
} from "lucide-react";
import MainHeader from "../components/MainHeader";
import SidebarMenu from "../components/SidebarMenu";

const PLAN_USUARIO = "BÁSICO"; // luego lo traes del backend/contexto
const PLANES_ORDEN = ["BÁSICO", "PRO", "PREMIUM", "PLATINO"];

const gruposMock = [
  {
    id: "cam-trans-mx",
    nombre: "Cámara Nacional de Transportistas de México",
    tipo: "Cámara",
    sector: "Transporte & Logística",
    pais: "México",
    estado: "CDMX",
    miembros: 1280,
    verificados: true,
    eventosMes: 6,
    oportunidadesMes: 18,
    descripcion:
      "Agrupa empresas transportistas y operadores logísticos. Promueve estándares, alianzas y acceso a oportunidades de negocio con empresas del ecosistema.",
    requisitos: ["Registro fiscal", "Carta de afiliación", "Cumplimiento básico"],
    beneficios: [
      "Acceso a oportunidades y licitaciones",
      "Networking B2B",
      "Eventos y capacitaciones",
      "Validación de reputación del grupo",
    ],
    tags: ["Transporte", "Logística", "Cadenas de valor"],
    nivelAcceso: "BÁSICO",
  },
  {
    id: "asoc-trans-jal",
    nombre: "Asociación de Transportes de Jalisco",
    tipo: "Asociación",
    sector: "Transporte",
    pais: "México",
    estado: "Jalisco",
    miembros: 540,
    verificados: true,
    eventosMes: 4,
    oportunidadesMes: 11,
    descripcion:
      "Conecta empresas de transporte en Jalisco con proveedores, clientes y aliados estratégicos. Impulsa la formalización y mejora operativa.",
    requisitos: ["Registro mercantil", "Documentación de flota (si aplica)"],
    beneficios: ["Ruedas de negocio", "Convenios", "Bolsa de oportunidades"],
    tags: ["Jalisco", "Rutas", "Carga"],
    nivelAcceso: "BÁSICO",
  },
  {
    id: "cluster-auto-ont",
    nombre: "Ontario Automotive Cluster",
    tipo: "Clúster",
    sector: "Manufactura & Automotriz",
    pais: "Canadá",
    estado: "Ontario",
    miembros: 210,
    verificados: true,
    eventosMes: 3,
    oportunidadesMes: 9,
    descripcion:
      "Clúster orientado a proveeduría automotriz, innovación, supply chain y alianzas transfronterizas.",
    requisitos: ["Perfil empresarial completo", "Validación de industria"],
    beneficios: ["Alianzas", "Benchmark", "Innovación", "Cadena de suministro"],
    tags: ["Automotriz", "Supply chain", "Innovación"],
    nivelAcceso: "PRO",
  },
  {
    id: "us-logistics-alliance",
    nombre: "US Logistics & Trade Alliance",
    tipo: "Alianza",
    sector: "Comercio Exterior",
    pais: "Estados Unidos",
    estado: "Texas",
    miembros: 860,
    verificados: false,
    eventosMes: 5,
    oportunidadesMes: 21,
    descripcion:
      "Comunidad de empresas de logística, comercio exterior e import/export. Facilita conexiones con compradores y proveedores.",
    requisitos: ["Perfil verificado", "KYC empresarial"],
    beneficios: ["Networking", "Deals", "Socios estratégicos", "Ferias"],
    tags: ["Trade", "Import/Export", "Texas"],
    nivelAcceso: "PREMIUM",
  },
];

function canAccess(requiredPlan, userPlan) {
  return PLANES_ORDEN.indexOf(userPlan) >= PLANES_ORDEN.indexOf(requiredPlan);
}

function badgeByTipo(tipo) {
  switch (tipo) {
    case "Cámara":
      return "bg-blue-500/15 text-blue-200 border-blue-300/20";
    case "Asociación":
      return "bg-emerald-500/15 text-emerald-200 border-emerald-300/20";
    case "Clúster":
      return "bg-violet-500/15 text-violet-200 border-violet-300/20";
    default:
      return "bg-slate-500/15 text-slate-200 border-slate-300/20";
  }
}

function badgeByPais(pais) {
  if (pais === "México") return "bg-amber-500/15 text-amber-200 border-amber-300/20";
  if (pais === "Estados Unidos") return "bg-red-500/15 text-red-200 border-red-300/20";
  if (pais === "Canadá") return "bg-cyan-500/15 text-cyan-200 border-cyan-300/20";
  return "bg-slate-500/15 text-slate-200 border-slate-300/20";
}

export default function Grupos() {
  const navigate = useNavigate();

  const [q, setQ] = useState("");
  const [pais, setPais] = useState("Todos");
  const [tipo, setTipo] = useState("Todos");
  const [sector, setSector] = useState("Todos");
  const [onlyVerified, setOnlyVerified] = useState(false);

  const [selected, setSelected] = useState(null);

  const paises = useMemo(
    () => ["Todos", ...Array.from(new Set(gruposMock.map((g) => g.pais)))],
    []
  );
  const tipos = useMemo(
    () => ["Todos", ...Array.from(new Set(gruposMock.map((g) => g.tipo)))],
    []
  );
  const sectores = useMemo(
    () => ["Todos", ...Array.from(new Set(gruposMock.map((g) => g.sector)))],
    []
  );

  const filtrados = useMemo(() => {
    const term = q.trim().toLowerCase();

    return gruposMock.filter((g) => {
      const okPais = pais === "Todos" ? true : g.pais === pais;
      const okTipo = tipo === "Todos" ? true : g.tipo === tipo;
      const okSector = sector === "Todos" ? true : g.sector === sector;
      const okVerified = onlyVerified ? g.verificados : true;

      const okSearch =
        !term ||
        g.nombre.toLowerCase().includes(term) ||
        g.sector.toLowerCase().includes(term) ||
        g.estado.toLowerCase().includes(term) ||
        g.pais.toLowerCase().includes(term) ||
        (g.tags || []).some((t) => t.toLowerCase().includes(term));

      return okPais && okTipo && okSector && okVerified && okSearch;
    });
  }, [q, pais, tipo, sector, onlyVerified]);

  const totalMiembros = useMemo(
    () => filtrados.reduce((acc, g) => acc + (g.miembros || 0), 0),
    [filtrados]
  );
  const totalOportunidades = useMemo(
    () => filtrados.reduce((acc, g) => acc + (g.oportunidadesMes || 0), 0),
    [filtrados]
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
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-2xl px-6 py-5">
                <h1 className="text-white font-extrabold text-xl md:text-2xl">
                  Grupos empresariales
                </h1>
                <p className="text-white/70 text-sm mt-1 max-w-2xl">
                  Cámaras, asociaciones y clústeres que agrupan empresas por industria y región.
                  Únete para potenciar networking, alianzas y oportunidades.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    Grupos verificados
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                    <Users className="w-4 h-4 text-yellow-300" />
                    Comunidad & alianzas
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                    <Building2 className="w-4 h-4 text-blue-300" />
                    Cámaras / Asociaciones / Clústeres
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-blue-50/10 text-white/90 px-4 py-2 border border-white/10 text-xs">
                  Plan actual: <strong className="text-yellow-300">{PLAN_USUARIO}</strong>
                </span>
                <button
                  className="rounded-full bg-[#ffcf43] px-5 py-2 text-sm font-extrabold text-[#071a33] shadow hover:brightness-105 transition"
                  type="button"
                  onClick={() => alert("Mock: abrir pantalla de mejora de plan")}
                >
                  Mejorar plan
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Stat value={filtrados.length} label="Grupos encontrados" icon={<Building2 className="w-5 h-5" />} />
              <Stat value={totalMiembros.toLocaleString()} label="Miembros (total)" icon={<Users className="w-5 h-5" />} />
              <Stat value={totalOportunidades} label="Oportunidades / mes" icon={<BadgeCheck className="w-5 h-5" />} />
              <Stat
                value={filtrados.filter((g) => g.verificados).length}
                label="Verificados"
                icon={<ShieldCheck className="w-5 h-5" />}
                accent
              />
            </div>

            {/* Search & filters */}
            <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-2xl p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Buscar por nombre, sector, estado, tags..."
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-yellow-400/60"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full lg:w-auto">
                  <Select value={pais} onChange={setPais} options={paises} label="País" />
                  <Select value={tipo} onChange={setTipo} options={tipos} label="Tipo" />
                  <Select value={sector} onChange={setSector} options={sectores} label="Sector" />
                  <Toggle
                    checked={onlyVerified}
                    onChange={setOnlyVerified}
                    label="Solo verificados"
                  />
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtrados.map((g) => {
                const locked = !canAccess(g.nivelAcceso, PLAN_USUARIO);

                return (
                  <article
                    key={g.id}
                    className={`rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-2xl p-5 text-white relative overflow-hidden
                    hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition`}
                  >
                    {/* glow */}
                    <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-yellow-400/10 blur-3xl" />

                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${badgeByTipo(g.tipo)}`}>
                            {g.tipo}
                          </span>
                          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${badgeByPais(g.pais)}`}>
                            {g.pais}
                          </span>
                          {g.verificados && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/20 bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold text-emerald-200">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              Verificado
                            </span>
                          )}
                          {locked && (
                            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                              Requiere {g.nivelAcceso}+
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3 text-base font-extrabold leading-snug truncate">
                          {g.nombre}
                        </h3>

                        <p className="mt-1 text-xs text-white/70 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {g.estado}
                          <span className="text-white/30">•</span>
                          {g.sector}
                        </p>
                      </div>

                      <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white/80" />
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-white/80 line-clamp-3 leading-relaxed">
                      {g.descripcion}
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                      <MiniStat value={g.miembros.toLocaleString()} label="Miembros" icon={<Users className="w-4 h-4" />} />
                      <MiniStat value={g.eventosMes} label="Eventos/mes" icon={<CalendarDays className="w-4 h-4" />} />
                      <MiniStat value={g.oportunidadesMes} label="Oport./mes" icon={<BadgeCheck className="w-4 h-4" />} />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(g.tags || []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[11px] rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/75"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelected(g)}
                        className="flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/15 transition"
                      >
                        Ver detalle
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (locked) return alert(`Tu plan es ${PLAN_USUARIO}. Requiere ${g.nivelAcceso}+`);
                          alert("Mock: Solicitud enviada al grupo ✅");
                        }}
                        className={`rounded-xl px-4 py-2.5 text-sm font-extrabold transition inline-flex items-center gap-2 ${
                          locked
                            ? "bg-white/10 text-white/50 cursor-not-allowed"
                            : "bg-[#ffcf43] text-[#071a33] hover:brightness-105"
                        }`}
                      >
                        Solicitar
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {!filtrados.length && (
              <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-2xl p-10 text-center text-white/80">
                No hay grupos con esos filtros. Prueba con otro sector o país.
              </div>
            )}
          </div>

          {/* Modal detalle */}
          {selected && (
            <GrupoModal
              grupo={selected}
              onClose={() => setSelected(null)}
              locked={!canAccess(selected.nivelAcceso, PLAN_USUARIO)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Stat({ value, label, icon, accent = false }) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-2xl p-5 text-white flex items-center gap-3 ${
        accent ? "ring-1 ring-emerald-400/30" : ""
      }`}
    >
      <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-white/80">
        {icon}
      </div>
      <div>
        <div className="text-xl font-extrabold leading-none">{value}</div>
        <div className="text-xs text-white/65 mt-1">{label}</div>
      </div>
    </div>
  );
}

function MiniStat({ value, label, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center justify-center gap-2 text-white/85 text-sm font-extrabold">
        {icon}
        {value}
      </div>
      <div className="text-[11px] text-white/60 mt-1">{label}</div>
    </div>
  );
}

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

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition
        ${checked ? "border-emerald-300/30 bg-emerald-500/15 text-emerald-100" : "border-white/10 bg-white/10 text-white/85 hover:bg-white/15"}`}
    >
      {label}
    </button>
  );
}

function GrupoModal({ grupo, onClose, locked }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#071326]/95 backdrop-blur-xl shadow-2xl text-white overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs text-white/60">Detalle del grupo</div>
            <div className="text-lg font-extrabold mt-1 truncate">{grupo.nombre}</div>
            <div className="text-sm text-white/70 mt-1">
              {grupo.tipo} • {grupo.sector} • {grupo.estado}, {grupo.pais}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid gap-6 md:grid-cols-2">
          <div>
            <div className="text-sm font-extrabold">Descripción</div>
            <p className="text-sm text-white/75 mt-2 leading-relaxed">
              {grupo.descripcion}
            </p>

            <div className="mt-5 text-sm font-extrabold">Beneficios</div>
            <ul className="mt-2 space-y-2 text-sm text-white/75">
              {grupo.beneficios.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-yellow-300" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-extrabold">Requisitos</div>
              <ul className="mt-2 space-y-2 text-sm text-white/75">
                {grupo.requisitos.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                    {r}
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <MiniStat value={grupo.miembros.toLocaleString()} label="Miembros" icon={<Users className="w-4 h-4" />} />
                <MiniStat value={grupo.eventosMes} label="Eventos/mes" icon={<CalendarDays className="w-4 h-4" />} />
                <MiniStat value={grupo.oportunidadesMes} label="Oport./mes" icon={<BadgeCheck className="w-4 h-4" />} />
              </div>

              {locked && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/75">
                  🔒 Tu plan requiere <strong>{grupo.nivelAcceso}+</strong> para solicitar unión.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/10 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/15 transition"
          >
            Cerrar
          </button>

          <button
            type="button"
            disabled={locked}
            onClick={() => alert("Mock: solicitud enviada ✅")}
            className={`rounded-xl px-6 py-3 text-sm font-extrabold transition ${
              locked
                ? "bg-white/10 text-white/50 cursor-not-allowed"
                : "bg-[#ffcf43] text-[#071a33] hover:brightness-105"
            }`}
          >
            Solicitar unión
          </button>
        </div>
      </div>
    </div>
  );
}
