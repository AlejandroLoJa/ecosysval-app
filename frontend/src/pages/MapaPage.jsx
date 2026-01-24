// src/pages/MapaPage.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  ChevronDown,
  Map as MapIcon,
  List as ListIcon,
  Users,
  ShoppingCart,
  Handshake,
  Search,
} from "lucide-react";
import Mapa from "../components/Mapa";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";

const empresasMock = [
  {
    id: "0000123",
    tipo: "Cliente",
    nombre: "Maderas del Centro",
    productos: "Madera",
    servicios: null,
    ciudad: "Ciudad de México",
    estado: "CDMX",
    lat: 19.4326,
    lng: -99.1332,
  },
  {
    id: "0000124",
    tipo: "Proveedor",
    nombre: "Transporte del Sur",
    productos: "Madera",
    servicios: "Transporte",
    ciudad: "Chiapas",
    estado: "Chiapas",
    lat: 16.751,
    lng: -93.1169,
  },
  {
    id: "0000125",
    tipo: "Proveedor",
    nombre: "Textiles Hidalgo",
    productos: "Textilería",
    servicios: null,
    ciudad: "Pachuca",
    estado: "Hidalgo",
    lat: 20.0911,
    lng: -98.7624,
  },
  {
    id: "0000126",
    tipo: "Cliente",
    nombre: "Acero del Pacífico",
    productos: "Acero",
    servicios: null,
    ciudad: "Guadalajara",
    estado: "Jalisco",
    lat: 20.6597,
    lng: -103.3496,
  },
];

const beneficiosNiveles = [
  { title: "Perfil empresarial descargable", tier: "standard", detail: "Descarga un PDF con datos clave, actividad y capacidades." },
  { title: "Identificación de socios comerciales", tier: "standard", detail: "Encuentra aliados por sector, ubicación y capacidad." },
  { title: "Integración a cadenas de valor", tier: "standard", detail: "Conecta roles cliente/proveedor para aumentar eficiencia." },
  { title: "Propuestas comerciales con especificaciones técnicas", tier: "platinum", detail: "Genera propuestas formales con requerimientos técnicos." },
  { title: "Transacciones de compra y venta", tier: "platinum", detail: "Compra/venta dentro del ecosistema con trazabilidad." },
  { title: "Coaching", tier: "platinum", detail: "Acompañamiento para cierre comercial y crecimiento." },
  { title: "Sistema de crecimiento", tier: "platinum", detail: "Seguimiento a metas, desempeño y escalamiento." },
  { title: "Recompensas", tier: "black", detail: "Beneficios por actividad y desempeño dentro del sistema." },
  { title: "Networking", tier: "black", detail: "Acceso a red premium y encuentros con tomadores de decisión." },
  { title: "Financiamiento", tier: "black", detail: "Opciones de financiación e intermediación según perfil." },
  { title: "Desarrollo Organizacional Sustentable", tier: "black", detail: "Programas para sostenibilidad, cultura y desempeño." },
];

export default function MapaPage() {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("map"); // map | list
  const [filterTipo, setFilterTipo] = useState("Ambos"); // Cliente | Proveedor | Ambos
  const [search, setSearch] = useState("");
  const [openBenefitIndex, setOpenBenefitIndex] = useState(null);

  // Stats (demo)
  const comprasRealizadas = 1;
  const ventasRealizadas = 2;
  const restantesPlatino = 2;

  const empresasFiltradas = useMemo(() => {
    const term = search.trim().toLowerCase();

    return empresasMock.filter((e) => {
      const coincideTipo = filterTipo === "Ambos" ? true : e.tipo === filterTipo;
      const coincideSearch =
        !term ||
        (e.nombre || "").toLowerCase().includes(term) ||
        (e.productos || "").toLowerCase().includes(term) ||
        (e.servicios || "").toLowerCase().includes(term) ||
        (e.ciudad || "").toLowerCase().includes(term) ||
        (e.estado || "").toLowerCase().includes(term);

      return coincideTipo && coincideSearch;
    });
  }, [filterTipo, search]);

  const sociosPotenciales = empresasFiltradas.length;

  const handleConectar = (empresa) => {
    navigate(`/formulario-comercio/`, {
      state: {
        empresaId: empresa.id,
        nombre: empresa.nombre,
        tipo: empresa.tipo,
        productos: empresa.productos,
        servicios: empresa.servicios,
        ciudad: empresa.ciudad,
        estado: empresa.estado,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />

      <div className="flex flex-1">
        <aside className="w-64 h-screen bg-blue-900 text-white shadow-lg overflow-y-auto">
          <SidebarMenu />
        </aside>

        <main
          className="flex-1 relative overflow-y-auto"
          style={{
            backgroundImage: "url('/fondo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* overlay para contraste */}
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] -z-10" />

          <div className="p-6">
            {/* Header del módulo */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-xl px-5 py-4">
                <h1 className="text-white font-extrabold text-lg md:text-xl">
                  Posición en el sistema
                </h1>
                <p className="text-white/70 text-sm mt-1 max-w-2xl">
                  Visualiza socios potenciales en mapa o lista. Filtra por tipo, sector y ubicación.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-black/60 bg-black/60 backdrop-blur-xl shadow-lg px-4 py-2">
                  <Users className="w-4 h-4 text-white/80" />
                  <span className="text-sm text-white/80">Resultados:</span>
                  <span className="text-sm font-extrabold text-yellow-300">{sociosPotenciales}</span>
                </div>

                <div className="inline-flex rounded-full border border-black/60 bg-black/75 backdrop-blur-xl shadow-lg p-1">
                  <button
                    onClick={() => setViewMode("map")}
                    className={`px-4 py-2 text-sm rounded-full transition inline-flex items-center gap-2 ${
                      viewMode === "map"
                        ? "bg-yellow-400 text-slate-900 font-semibold"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <MapIcon className="w-4 h-4" />
                    Mapa
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 text-sm rounded-full transition inline-flex items-center gap-2 ${
                      viewMode === "list"
                        ? "bg-yellow-400 text-slate-900 font-semibold"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <ListIcon className="w-4 h-4" />
                    Lista
                  </button>
                </div>
              </div>
            </div>

            {/* Stats premium */}
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
              <StatCard icon={ShoppingCart} value={comprasRealizadas} label="Compras realizadas" />
              <StatCard icon={Handshake} value={ventasRealizadas} label="Ventas realizadas" />
              <StatCard icon={Lock} value={restantesPlatino} label="Restantes para rango Platino" compact />
              <StatCard icon={Users} value={sociosPotenciales} label="Socios potenciales (filtrados)" highlight />
            </div>

            {/* Buscador + chips */}
            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl p-4 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, productos, servicios, ciudad, estado..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-full pl-11 pr-4 py-2.5 text-sm bg-white/90 text-slate-900 placeholder:text-slate-500 outline-none
                               focus:ring-2 focus:ring-yellow-300/70 transition"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Chip label="Cliente" active={filterTipo === "Cliente"} onClick={() => setFilterTipo("Cliente")} />
                  <Chip label="Proveedor" active={filterTipo === "Proveedor"} onClick={() => setFilterTipo("Proveedor")} />
                  <Chip label="Ambos" active={filterTipo === "Ambos"} onClick={() => setFilterTipo("Ambos")} />
                </div>
              </div>
            </div>

            {/* Layout PRO: mapa sticky + lista (o solo uno según view) */}
            <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
              {/* Columna Mapa */}
              {viewMode === "map" && (
                <section className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <h2 className="text-white font-bold">Mapa de socios</h2>
                      <p className="text-white/60 text-xs">
                        Usa el zoom y selecciona empresas para ver ubicación.
                      </p>
                    </div>
                    <span className="text-[11px] text-white/70 border border-white/10 bg-white/10 rounded-full px-3 py-1">
                      Vista interactiva
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                      <Mapa empresas={empresasFiltradas} zoom={5} />
                    </div>
                  </div>
                </section>
              )}

              {/* Columna Lista (siempre útil, en map queda al lado) */}
              {(viewMode === "map" || viewMode === "list") && (
                <section
                  className={`rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-xl overflow-hidden ${
                    viewMode === "list" ? "xl:col-span-2" : ""
                  }`}
                >
                  <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <h2 className="text-white font-bold">Socios potenciales</h2>
                      <p className="text-white/60 text-xs">
                        Filtrados por tu búsqueda y tipo seleccionado.
                      </p>
                    </div>
                    <span className="text-[11px] text-yellow-300 border border-yellow-300/20 bg-yellow-400/10 rounded-full px-3 py-1">
                      {sociosPotenciales} resultados
                    </span>
                  </div>

                  <div className="p-4 max-h-[560px] overflow-y-auto">
                    <ListaEmpresas empresas={empresasFiltradas} onConectar={handleConectar} />
                  </div>
                </section>
              )}
            </div>

            {/* Beneficios ACCORDION */}
            <section className="mt-8">
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-white font-extrabold text-lg md:text-xl">
                    Beneficios del Ecosistema
                  </h2>
                  <p className="text-white/60 text-sm">
                    Despliega cada beneficio para ver qué incluye y el nivel requerido.
                  </p>
                </div>

                <span className="text-[11px] text-white/70 border border-white/10 bg-white/10 rounded-full px-3 py-1">
                  Standard • Platinum • Black
                </span>
              </div>

              <div className="space-y-3">
                {beneficiosNiveles.map((b, idx) => {
                  const open = openBenefitIndex === idx;
                  return (
                    <AccordionItem
                      key={idx}
                      title={b.title}
                      detail={b.detail}
                      tier={b.tier}
                      open={open}
                      onToggle={() => setOpenBenefitIndex(open ? null : idx)}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- UI ---------- */

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm border transition ${
        active
          ? "bg-yellow-400 text-slate-900 border-yellow-400 font-semibold"
          : "bg-white/10 text-white/85 border-white/10 hover:bg-white/15"
      }`}
    >
      {label}
    </button>
  );
}

function StatCard({ icon: Icon, value, label, compact = false, highlight = false }) {
  return (
    <div
      className={`rounded-3xl border backdrop-blur-xl shadow-xl p-4 flex items-center gap-4 ${
        highlight ? "bg-yellow-400/15 border-yellow-300/30" : "bg-black/40 border-white/10"
      }`}
    >
      <div
        className={`h-11 w-11 rounded-2xl flex items-center justify-center border ${
          highlight
            ? "bg-yellow-400/15 border-yellow-300/25 text-yellow-300"
            : "bg-white/10 border-white/10 text-white/80"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>

      <div className="min-w-0">
        <div
          className={`font-extrabold ${compact ? "text-2xl" : "text-3xl"} ${
            highlight ? "text-yellow-300" : "text-white"
          }`}
        >
          {value}
        </div>
        <div className={`text-sm ${highlight ? "text-white/85" : "text-white/70"} truncate`}>
          {label}
        </div>
      </div>
    </div>
  );
}

function ListaEmpresas({ empresas, onConectar }) {
  if (!empresas.length) {
    return (
      <div className="p-10 text-center text-white/70">
        No hay resultados con esos filtros.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {empresas.map((e) => (
        <div
          key={e.id}
          className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-lg p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/60">ID: {e.id}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full border ${
                    e.tipo === "Cliente"
                      ? "bg-emerald-400/10 text-emerald-200 border-emerald-300/20"
                      : "bg-sky-400/10 text-sky-200 border-sky-300/20"
                  }`}
                >
                  {e.tipo}
                </span>
              </div>

              <h3 className="mt-1 font-semibold text-white truncate">{e.nombre}</h3>

              <p className="text-sm text-white/70 mt-1">
                <span className="text-white/60">Productos:</span> {e.productos}
              </p>

              {e.servicios && (
                <p className="text-sm text-white/70">
                  <span className="text-white/60">Servicios:</span> {e.servicios}
                </p>
              )}

              <p className="text-sm text-white/60 mt-1">
                📍 {e.ciudad} • {e.estado}
              </p>
            </div>

            <button
              onClick={() => onConectar?.(e)}
              className="shrink-0 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:brightness-95 transition"
            >
              Conectar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AccordionItem({ title, detail, tier, open, onToggle }) {
  const { pill, bar } = getTierStyles(tier);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/5 transition"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`h-9 w-9 rounded-xl border ${bar} flex items-center justify-center`}>
            <Lock className="w-4 h-4 text-white/85" />
          </div>

          <div className="min-w-0 text-left">
            <div className="text-white font-semibold truncate">{title}</div>
            <div className={`mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] ${pill}`}>
              Nivel: {tierLabel(tier)}
            </div>
          </div>
        </div>

        <ChevronDown className={`w-5 h-5 text-white/70 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1 text-sm text-white/75">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            {detail || "Detalle no disponible."}
          </div>
        </div>
      )}
    </div>
  );
}

function tierLabel(tier) {
  if (tier === "standard") return "STANDARD";
  if (tier === "platinum") return "PLATINO";
  return "BLACK";
}

function getTierStyles(tier) {
  if (tier === "standard") {
    return {
      pill: "bg-sky-400/10 text-sky-200 border-sky-300/20",
      bar: "bg-gradient-to-r from-[#006E90]/70 to-[#004C6D]/70 border-white/10",
    };
  }
  if (tier === "platinum") {
    return {
      pill: "bg-yellow-400/10 text-yellow-200 border-yellow-300/20",
      bar: "bg-gradient-to-r from-[#9A7B4F]/70 to-[#7A5C32]/70 border-white/10",
    };
  }
  return {
    pill: "bg-white/10 text-white/80 border-white/15",
    bar: "bg-gradient-to-r from-[#2D2D2D]/75 to-[#000000]/75 border-white/10",
  };
}
