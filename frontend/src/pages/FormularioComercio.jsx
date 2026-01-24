// src/pages/FormularioComercio.jsx
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import MainHeader from "../components/MainHeader";
import SidebarMenu from "../components/SidebarMenu";

const unidadesMock = ["Ninguna", "Toneladas", "Kilogramos", "Piezas", "Litros"];
const productosMock = ["Madera refinada", "Acero laminado", "Textil industrial"];
const serviciosMock = ["Asesoría", "Transporte", "Almacenamiento"];

export default function FormularioComercio() {
  const { empresaId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ MapaPage manda: { nombre, tipo, productos, servicios, ciudad, estado }
  const state = location.state || {};
  const empresaNombre = state.nombre || state.empresaNombre || "Empresa";
  const empresaTipo = state.tipo || state.empresaTipo || "—";
  const ciudad = state.ciudad || "—";
  const estado = state.estado || "—";
  const productos = state.productos || "—";
  const servicios = state.servicios || "—";

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
      className="min-h-screen bg-fixed bg-center bg-cover flex flex-col"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      {/* ✅ MainHeader REAL (el mismo del resto del sistema) */}
      <MainHeader showSearch={true} showBack={true} />

      <div className="flex flex-1">
        {/* ✅ Sidebar igual que las demás páginas */}
        <aside className="w-64 bg-blue-900 text-white shadow-lg hidden md:block">
          <SidebarMenu />
        </aside>

        {/* Contenido */}
        <main className="flex-1 p-6 relative">
          {/* Overlay para contraste */}
          <div className="absolute inset-0 bg-black/25 -z-10" />

          <div className="mx-auto w-full max-w-6xl grid gap-6 lg:grid-cols-[360px_1fr]">
            {/* IZQUIERDA */}
            <section className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-2xl p-6 text-white h-fit">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-extrabold">Formulario de comercio</h2>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Selecciona si vas a negociar un <strong>producto</strong> o un{" "}
                    <strong>servicio</strong> y define si es <strong>compra</strong>{" "}
                    o <strong>venta</strong>.
                  </p>
                </div>

                <span className="hidden sm:inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/80">
                  Negociación clara
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-[11px] font-bold text-yellow-300/90 uppercase tracking-wider">
                  Empresa objetivo
                </div>

                <div className="mt-2 text-lg font-extrabold">{empresaNombre}</div>

                <div className="mt-1 text-xs text-white/60 font-mono">
                  ID: {empresaId}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <Info label="Tipo" value={empresaTipo} />
                  <Info label="Ubicación" value={`${ciudad}, ${estado}`} />
                  <Info label="Productos" value={productos} />
                  <Info label="Servicios" value={servicios} />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-4">
                <p className="text-xs text-yellow-100/90 leading-relaxed">
                  ⚠️ La solicitud está sujeta a aprobación. Entre más claro el alcance,
                  más rápido se gestiona.
                </p>
              </div>
            </section>

            {/* DERECHA */}
            <section className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-2xl p-6 md:p-8 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-extrabold">Detalle de la operación</h3>
                  <p className="text-sm text-white/70">
                    Define los parámetros principales de la transacción.
                  </p>
                </div>

                <div className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 p-1">
                  <button
                    type="button"
                    onClick={() => setTipoOperacion("producto")}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                      tipoOperacion === "producto"
                        ? "bg-white text-[#071a33]"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    Producto
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoOperacion("servicio")}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                      tipoOperacion === "servicio"
                        ? "bg-white text-[#071a33]"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    Servicio
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                  <span className="block text-sm font-semibold text-white/90 mb-3">
                    Tipo de transacción
                  </span>

                  <div className="flex gap-3">
                    <ChipRadio
                      label="Compra"
                      active={tipoTransaccion === "compra"}
                      onClick={() => setTipoTransaccion("compra")}
                    />
                    <ChipRadio
                      label="Venta"
                      active={tipoTransaccion === "venta"}
                      onClick={() => setTipoTransaccion("venta")}
                    />
                  </div>
                </div>

                {tipoOperacion === "producto" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <Label text="Producto *" />
                      <select
                        name="producto"
                        value={formProducto.producto}
                        onChange={handleProductoChange}
                        className={fieldClass}
                        required
                      >
                        <option value="">Selecciona un producto...</option>
                        {productosMock.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label text="Cantidad *" />
                      <input
                        type="number"
                        name="cantidad"
                        min="0"
                        placeholder="0"
                        value={formProducto.cantidad}
                        onChange={handleProductoChange}
                        className={fieldClass}
                        required
                      />
                    </div>

                    <div>
                      <Label text="Unidad" />
                      <select
                        name="unidad"
                        value={formProducto.unidad}
                        onChange={handleProductoChange}
                        className={fieldClass}
                      >
                        {unidadesMock.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <Label text="Descripción / Notas" />
                      <textarea
                        name="descripcion"
                        rows={4}
                        value={formProducto.descripcion}
                        onChange={handleProductoChange}
                        className={textareaClass}
                        placeholder="Especificaciones técnicas, calidad, tiempos, condiciones..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <Label text="Servicio *" />
                      <select
                        name="servicio"
                        value={formServicio.servicio}
                        onChange={handleServicioChange}
                        className={fieldClass}
                        required
                      >
                        <option value="">Selecciona un servicio...</option>
                        {serviciosMock.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label text="Descripción del alcance" />
                      <textarea
                        name="descripcion"
                        rows={6}
                        value={formServicio.descripcion}
                        onChange={handleServicioChange}
                        className={textareaClass}
                        placeholder="Detalles sobre tiempos, entregables y condiciones..."
                      />
                    </div>
                  </div>
                )}

                <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/15 transition"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#ffcf43] px-6 py-3 text-sm font-extrabold text-[#071a33] shadow hover:brightness-105 transition"
                  >
                    <Send className="w-4 h-4" />
                    Enviar solicitud
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* Helpers */
const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-300/40";

const textareaClass =
  "w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-300/40 resize-y";

function Label({ text }) {
  return (
    <span className="mb-1.5 block text-xs font-bold text-white/80 uppercase tracking-wider">
      {text}
    </span>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="text-[11px] text-white/55">{label}</div>
      <div className="text-sm font-semibold text-white truncate">{value}</div>
    </div>
  );
}

function ChipRadio({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${
        active
          ? "bg-blue-600/90 border-blue-400/40 text-white shadow"
          : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}
