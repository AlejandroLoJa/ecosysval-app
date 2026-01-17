// src/pages/MapaPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ChevronDown } from "lucide-react";
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
  { title: "Perfil empresarial descargable", tier: "standard" },
  { title: "Identificación de socios comerciales", tier: "standard" },
  { title: "Integración a cadenas de valor", tier: "standard" },
  {
    title: "Propuestas comerciales con especificaciones técnicas",
    tier: "platinum",
  },
  { title: "Transacciones de compra y venta", tier: "platinum" },
  { title: "Coaching", tier: "platinum" },
  { title: "Sistema de crecimiento", tier: "platinum" },
  { title: "Recompensas", tier: "black" },
  { title: "Networking", tier: "black" },
  { title: "Financiamiento", tier: "black" },
  { title: "Desarrollo Organizacional Sustentable", tier: "black" },
];

export default function MapaPage() {
  const navigate = useNavigate();

  // Estados
  const [viewMode, setViewMode] = useState("map");
  const [filterTipo, setFilterTipo] = useState("Ambos");
  const [search, setSearch] = useState("");

  // Stats
  const comprasRealizadas = 1;
  const ventasRealizadas = 2;
  const restantesPlatino = 2;
  const sociosPotenciales = empresasMock.length;

  const empresasFiltradas = empresasMock.filter((e) => {
    const coincideTipo = filterTipo === "Ambos" ? true : e.tipo === filterTipo;
    const term = search.toLowerCase();
    const coincideSearch =
      !term ||
      e.nombre.toLowerCase().includes(term) ||
      e.productos.toLowerCase().includes(term) ||
      (e.servicios || "").toLowerCase().includes(term) ||
      e.ciudad.toLowerCase().includes(term) ||
      e.estado.toLowerCase().includes(term);

    return coincideTipo && coincideSearch;
  });

  const handleConectar = (empresa) => {
    navigate(`/formulario-comercio/${empresa.id}`, {
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
      {/* HEADER GLOBAL */}
      <MainHeader />

      {/* CONTENEDOR CON SIDEBAR + CONTENIDO */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 h-screen bg-blue-900 text-white shadow-lg overflow-y-auto">
          <SidebarMenu />
        </aside>

        {/* CONTENIDO CENTRAL */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto relative z-0">
          {/* Título + botones mapa/lista */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Posición en el sistema
              </h1>
              <p className="text-sm text-gray-500">
                Visualiza tus socios potenciales en el mapa o en formato de
                lista.
              </p>
            </div>
            <div className="inline-flex rounded-full border border-gray-200 bg-white shadow-sm">
              <button
                onClick={() => setViewMode("map")}
                className={`px-4 py-1.5 text-sm rounded-full transition ${
                  viewMode === "map"
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Ver mapa
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-1.5 text-sm rounded-full transition ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Ver lista
              </button>
            </div>
          </div>

          {/* Tarjetas de stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <StatCard
              value={comprasRealizadas}
              label={
                <>
                  <span className="block">Compras</span> realizadas
                </>
              }
            />
            <StatCard
              value={ventasRealizadas}
              label={
                <>
                  <span className="block">Ventas</span> realizadas
                </>
              }
            />
            <StatCard
              value={restantesPlatino}
              label={
                <>
                  <span className="block">Transacciones restantes</span> para
                  desbloquear rango Platino.
                </>
              }
              compact
            />
            <StatCard
              value={sociosPotenciales}
              label={
                <>
                  <span className="block">Socios</span> potenciales
                </>
              }
              highlight
            />
          </div>

          {/* Buscador + filtros */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar por sector, productos, servicios, ubicación..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterTipo("Cliente")}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  filterTipo === "Cliente"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Cliente
              </button>
              <button
                onClick={() => setFilterTipo("Proveedor")}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  filterTipo === "Proveedor"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Proveedor
              </button>
              <button
                onClick={() => setFilterTipo("Ambos")}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  filterTipo === "Ambos"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Ambos
              </button>
            </div>
          </div>

          {/* Vista mapa/lista */}
          <div className="mb-8 relative z-0">
            {viewMode === "map" ? (
              <Mapa empresas={empresasFiltradas} zoom={5} />
            ) : (
              <ListaEmpresas
                empresas={empresasFiltradas}
                onConectar={handleConectar}
              />
            )}
          </div>

          {/* Beneficios por nivel */}
          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Beneficios del Ecosistema
            </h2>
            {beneficiosNiveles.map((b, index) => (
              <BenefitBar key={index} title={b.title} tier={b.tier} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------- Componentes auxiliares ---------- */

function StatCard({ value, label, compact = false, highlight = false }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow p-4 text-center border ${
        highlight ? "border-blue-500" : "border-gray-100"
      }`}
    >
      <div
        className={`${
          compact ? "text-3xl" : "text-4xl"
        } font-bold ${highlight ? "text-blue-600" : "text-blue-700"}`}
      >
        {value}
      </div>
      <div className="mt-2 text-gray-700 leading-snug text-sm">{label}</div>
    </div>
  );
}

function ListaEmpresas({ empresas, onConectar }) {
  if (!empresas.length)
    return (
      <div className="p-8 text-center text-gray-500">No hay resultados.</div>
    );

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {empresas.map((e) => (
        <div
          key={e.id}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
        >
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">ID: {e.id}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  e.tipo === "Cliente"
                    ? "bg-green-50 text-green-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {e.tipo}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">{e.nombre}</h3>
            <p className="text-sm text-gray-600">Prods: {e.productos}</p>
            <p className="text-sm text-gray-500">📍 {e.ciudad}</p>
          </div>
          <button
            className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700"
            onClick={() => onConectar && onConectar(e)}
          >
            Conectar ahora
          </button>
        </div>
      ))}
    </div>
  );
}

function BenefitBar({ title, tier }) {
  let bgClass = "";
  if (tier === "standard")
    bgClass = "bg-gradient-to-r from-[#006E90] to-[#004C6D]";
  else if (tier === "platinum")
    bgClass = "bg-gradient-to-r from-[#9A7B4F] to-[#7A5C32]";
  else if (tier === "black")
    bgClass = "bg-gradient-to-r from-[#2D2D2D] to-[#000000]";

  return (
    <div
      className={`${bgClass} text-white rounded-lg px-4 py-3 flex items-center justify-between shadow-sm cursor-pointer`}
    >
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-1.5 rounded-full">
          <Lock className="w-4 h-4 text-white" />
        </div>
        <span>{title}</span>
      </div>
      <ChevronDown className="w-5 h-5 text-white/80" />
    </div>
  );
}
