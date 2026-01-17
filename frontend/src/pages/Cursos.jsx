// src/pages/Cursos.jsx
import React, { useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";

/**
 * Cursos.jsx
 * - Fondo hero con estética OMEC/ecosyval (hexágonos, dorados, azules, diagonales)
 * - Formulario de contacto para agendar/requerir capacitaciones y cursos
 */

const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:3000";

export default function Cursos() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    estado: "",
    telefono: "",
    empresa: "",
    cargo: "",
    interes: "Capacitación",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);

    // Validación mínima
    if (!form.nombre || !form.apellido || !form.email || !form.estado || !form.telefono) {
      setError("Por favor completa nombre, apellido, email, estado y teléfono.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`${API_URL}/contact/capacitaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("No se pudo enviar el formulario");
      setOk(true);
      setForm({
        nombre: "",
        apellido: "",
        email: "",
        estado: "",
        telefono: "",
        empresa: "",
        cargo: "",
        interes: "Capacitación",
        mensaje: "",
      });
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER GLOBAL (mismo de Profile, Mapa, Recompensas, etc.) */}
      <MainHeader
        title="ECOSYSVAL"
        showSearch={true}
        showBack={false}
      />

      <div className="flex flex-1">
        {/* MENÚ LATERAL */}
        <aside className="w-64 h-screen bg-blue-900 text-white shadow-lg overflow-y-auto">
          <SidebarMenu />
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 relative overflow-hidden">
          {/* Fondo desde /public/fcursos.png, SOLO en el área de contenido */}
          <div
            className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/fcursos.png')" }}
          />

          <section className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-20 pt-12 md:flex-row md:gap-12 md:px-10 lg:pt-16">
            {/* Columna izquierda: copy */}
            <div className="w-full md:flex-1">
              <h1 className="text-3xl font-extrabold leading-snug sm:text-4xl md:text-5xl text-white drop-shadow-md">
                Lleva a tu organización hacia el{" "}
                <span className="text-[#ffd166]">Alto Desempeño</span>
              </h1>

              <p className="mt-4 max-w-xl text-white/90 drop-shadow">
                Prepara a tus líderes y equipos para transformar y mejorar sus
                resultados en escenarios complejos e inciertos.
              </p>

              <div className="mt-6 h-1 w-40 rounded bg-[#ffd166]" />

              <ul className="mt-6 space-y-3 text-white/90">
                {[
                  "Herramientas de posicionamiento estratégico empresarial",
                  "Análisis financiero para la toma de decisiones",
                  "Diseño de Plan de Negocios",
                  "Nearshoring y comercio internacional",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#ffd166]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid max-w-lg grid-cols-3 gap-6 text-white">
                <Stat value="30+" label="Años de experiencia" />
                <Stat value="200+" label="Clientes en todo el mundo" />
                <Stat value="150+" label="Consultores en 15 países" />
              </div>
            </div>

            {/* Columna derecha: formulario */}
            <div className="w-full md:w-[480px]">
              <div className="rounded-2xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-md">
                <div className="mb-4">
                  <LogoEcosyval />
                  <h2 className="mt-2 text-center text-lg font-bold text-slate-800">
                    AGENDA UNA REUNIÓN AHORA
                  </h2>
                  <p className="text-center text-xs text-slate-500">
                    Déjanos tus datos y te contactaremos a la brevedad.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input
                      name="nombre"
                      label="Nombre *"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      name="apellido"
                      label="Apellido *"
                      value={form.apellido}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Input
                    name="email"
                    type="email"
                    label="E-mail *"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Select
                      name="estado"
                      label="Estado *"
                      value={form.estado}
                      onChange={handleChange}
                      options={ESTADOS_MX}
                      required
                    />
                    <Input
                      name="telefono"
                      label="Teléfono *"
                      value={form.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input
                      name="empresa"
                      label="Empresa *"
                      value={form.empresa}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      name="cargo"
                      label="Cargo *"
                      value={form.cargo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Select
                      name="interes"
                      label="Interés"
                      value={form.interes}
                      onChange={handleChange}
                      options={["Capacitación", "Curso", "Diplomado", "Asesoría"]}
                    />
                  </div>

                  <Textarea
                    name="mensaje"
                    label="Mensaje (opcional)"
                    value={form.mensaje}
                    onChange={handleChange}
                    rows={3}
                  />

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  {ok && (
                    <p className="rounded-md bg-green-50 p-2 text-center text-sm text-green-700">
                      ¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto pronto.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffd166] px-5 py-3 font-semibold text-slate-900 shadow hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sending ? "Enviando..." : "Agendar ahora"}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/*** UI helpers ***/
function Input({ label, name, value, onChange, type = "text", required }) {
  return (
    <label className="text-sm">
      <span className="mb-1 block text-xs font-semibold text-slate-600">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-slate-300/70 bg-white px-3 py-2 text-slate-800 outline-none ring-[#ffd166]/30 focus:border-[#ffd166] focus:ring"
      />
    </label>
  );
}

function Textarea({ label, name, value, onChange, rows = 3 }) {
  return (
    <label className="text-sm">
      <span className="mb-1 block text-xs font-semibold text-slate-600">{label}</span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full resize-y rounded-lg border border-slate-300/70 bg-white px-3 py-2 text-slate-800 outline-none ring-[#ffd166]/30 focus:border-[#ffd166] focus:ring"
      />
    </label>
  );
}

function Select({ label, name, value, onChange, options, required }) {
  return (
    <label className="text-sm">
      <span className="mb-1 block text-xs font-semibold text-slate-600">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-slate-300/70 bg-white px-3 py-2 text-slate-800 outline-none ring-[#ffd166]/30 focus:border-[#ffd166] focus:ring"
      >
        <option value="">Selecciona…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="text-xs text-white/80">{label}</div>
    </div>
  );
}

function LogoEcosyval() {
  // Logo.png ubicado en /public/Logo.png
  return (
    <div className="flex items-center justify-center mb-2">
      <img
        src="/Logo.png"
        alt="Ecosistema de Cadenas de Valor"
        className="h-28 mx-auto object-contain"
      />
    </div>
  );
}

/** Hex grid background (SVG) */
function HexGrid({ className = "", color = "#f2c94c" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="hex"
          width="40"
          height="35"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1)"
        >
          <path
            d="M10 0 L30 0 L40 17.5 L30 35 L10 35 L0 17.5 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            opacity="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
}

/** Dots background (SVG) */
function DotsPattern({ className = "" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

// Lista corta de estados para demo; rellena con los que necesites
const ESTADOS_MX = [
  "Aguascalientes",
  "Baja California",
  "CDMX",
  "Jalisco",
  "Nuevo León",
  "Puebla",
  "Yucatán",
];
