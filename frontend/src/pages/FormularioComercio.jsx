// src/pages/FormularioComercio.jsx
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// Agregamos los iconos que faltaban: Bell y MessageSquare
import { ChevronLeft, Bell, MessageSquare } from "lucide-react"; 

const unidadesMock = ["Ninguna", "Toneladas", "Kilogramos", "Piezas", "Litros"];
const productosMock = ["Madera refinada", "Acero laminado", "Textil industrial"];
const serviciosMock = ["Asesoría", "Transporte", "Almacenamiento"];

export default function FormularioComercio() {
  const { empresaId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { empresaNombre, empresaTipo, ciudad, estado } = location.state || {};

  const [tipoOperacion, setTipoOperacion] = useState("producto");
  const [tipoTransaccion, setTipoTransaccion] = useState("compra");

  const [formProducto, setFormProducto] = useState({
    producto: "",
    cantidad: "",
    unidad: "Ninguna",
    descripcion: "",
  });

  const [formServicio, setFormServicio] = useState({
    servicio: "",
    descripcion: "",
  });

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setFormProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleServicioChange = (e) => {
    const { name, value } = e.target;
    setFormServicio((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      empresaId,
      empresaNombre,
      empresaTipo,
      ciudad,
      estado,
      tipoOperacion,
      tipoTransaccion,
      detalle: tipoOperacion === "producto" ? formProducto : formServicio,
    };

    console.log("Payload comercio:", payload);
    alert("Solicitud de comercio registrada (mock).");
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: "url('/fondo.png')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Capa oscura (overlay) */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>

      {/* 🔹 ENCABEZADO ACTUALIZADO */}
      <header className="relative z-10 flex items-center justify-between bg-blue-900 px-6 py-3 shadow-lg text-white">
        
        {/* Izquierda: Volver (Solo ícono) + Título */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 text-white transition-all"
            title="Volver"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          
          <div className="h-8 w-px bg-blue-700 mx-1 hidden sm:block"></div>
          <span className="text-xl font-bold tracking-tight">ECOSYSVAL</span>
        </div>

        {/* Derecha: Iconos y Perfil (Igual que en MapaPage) */}
        <div className="flex items-center gap-6">
          <MessageSquare className="w-6 h-6 cursor-pointer hover:text-blue-200 transition-colors" />
          <Bell className="w-6 h-6 cursor-pointer hover:text-blue-200 transition-colors" />
          
          <div className="flex items-center gap-3 cursor-pointer pl-4 border-l border-blue-800">
            {/* Nombre visible solo en pantallas medianas o más grandes */}
            <div className="text-right hidden md:block leading-tight">
              <div className="font-semibold text-sm">Alejandro Lopez</div>
              <div className="text-xs text-blue-300">Usuario</div>
            </div>
            <img
              src="/avatar.png"
              alt="Usuario"
              className="w-9 h-9 rounded-full border-2 border-blue-400 bg-gray-200"
            />
          </div>
        </div>

      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row lg:items-start">
        
        {/* === COLUMNA IZQUIERDA: Contexto === */}
        <section className="w-full rounded-2xl bg-white/95 backdrop-blur-sm p-6 shadow-xl lg:w-1/3 border border-white/20">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">
            Formulario de comercio
          </h2>

          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Para realizar el proceso de comercio, selecciona el producto o
            servicio que vas a solicitar u ofrecer a la empresa seleccionada.
          </p>

          <div className="mt-6 rounded-xl bg-blue-50/80 p-5 border border-blue-100">
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                  Empresa Objetivo
                </span>
                <div className="text-lg font-bold text-gray-900 mt-1">
                  {empresaNombre || "Empresa Desconocida"}
                </div>
                <div className="text-xs text-gray-500 font-mono mt-1">ID: {empresaId}</div>
              </div>

              {(ciudad || estado) && (
                <div>
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                    Ubicación
                  </span>
                  <div className="text-sm text-gray-700 mt-1">
                    {ciudad && `${ciudad}, `} {estado}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-yellow-50 border border-yellow-100">
            <p className="text-xs text-yellow-800 font-medium leading-relaxed">
              ⚠️ La oferta de comercio está sujeta a aprobación. Usa este espacio para iniciar una negociación clara.
            </p>
          </div>
        </section>

        {/* === COLUMNA DERECHA: Formulario === */}
        <section className="w-full rounded-2xl bg-white/95 backdrop-blur-sm p-8 shadow-xl lg:w-2/3 border border-white/20">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Detalle de la operación
              </h3>
              <p className="text-sm text-gray-500">
                Define los parámetros de la transacción.
              </p>
            </div>

            <div className="flex bg-gray-100 p-1 rounded-full">
              <button
                type="button"
                onClick={() => setTipoOperacion("producto")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                  tipoOperacion === "producto"
                    ? "bg-white text-blue-700 shadow"
                    : "text-gray-500 hover:text-gray-700 bg-transparent shadow-none"
                }`}
              >
                Producto
              </button>
              <button
                type="button"
                onClick={() => setTipoOperacion("servicio")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                  tipoOperacion === "servicio"
                    ? "bg-white text-blue-700 shadow"
                    : "text-gray-500 hover:text-gray-700 bg-transparent shadow-none"
                }`}
              >
                Servicio
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="block text-sm font-semibold text-gray-700 mb-3">
                Tipo de Transacción
              </span>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${tipoTransaccion === 'compra' ? 'border-blue-600' : 'border-gray-300'}`}>
                    {tipoTransaccion === 'compra' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                  </div>
                  <input
                    type="radio"
                    className="hidden"
                    name="tipoTransaccion"
                    value="compra"
                    checked={tipoTransaccion === "compra"}
                    onChange={() => setTipoTransaccion("compra")}
                  />
                  <span className={`text-sm ${tipoTransaccion === 'compra' ? 'text-blue-700 font-medium' : 'text-gray-600 group-hover:text-gray-800'}`}>Compra</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${tipoTransaccion === 'venta' ? 'border-blue-600' : 'border-gray-300'}`}>
                     {tipoTransaccion === 'venta' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                  </div>
                  <input
                    type="radio"
                    className="hidden"
                    name="tipoTransaccion"
                    value="venta"
                    checked={tipoTransaccion === "venta"}
                    onChange={() => setTipoTransaccion("venta")}
                  />
                  <span className={`text-sm ${tipoTransaccion === 'venta' ? 'text-blue-700 font-medium' : 'text-gray-600 group-hover:text-gray-800'}`}>Venta</span>
                </label>
              </div>
            </div>

            {tipoOperacion === "producto" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
                  <select
                    name="producto"
                    value={formProducto.producto}
                    onChange={handleProductoChange}
                    className="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    required
                  >
                    <option value="">Seleccione un producto...</option>
                    {productosMock.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                  <input
                    type="number"
                    name="cantidad"
                    min="0"
                    placeholder="0.00"
                    value={formProducto.cantidad}
                    onChange={handleProductoChange}
                    className="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                  <select
                    name="unidad"
                    value={formProducto.unidad}
                    onChange={handleProductoChange}
                    className="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  >
                    {unidadesMock.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción / Notas</label>
                  <textarea
                    name="descripcion"
                    rows={3}
                    value={formProducto.descripcion}
                    onChange={handleProductoChange}
                    className="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                    placeholder="Especificaciones técnicas..."
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 animate-fadeIn">
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                  <select
                    name="servicio"
                    value={formServicio.servicio}
                    onChange={handleServicioChange}
                    className="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    required
                  >
                    <option value="">Seleccione un servicio...</option>
                    {serviciosMock.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del alcance</label>
                  <textarea
                    name="descripcion"
                    rows={5}
                    value={formServicio.descripcion}
                    onChange={handleServicioChange}
                    className="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="Detalles sobre tiempos, entregables y condiciones..."
                  />
                </div>
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <span>Enviar Solicitud</span>
            
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}