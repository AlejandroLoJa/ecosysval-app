// src/pages/Cursos.jsx
import React, { useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";

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

    if (!form.nombre || !form.apellido || !form.email || !form.estado || !form.telefono) {
      setError("Completa los campos obligatorios.");
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
    <div className="flex flex-col min-h-screen bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/fondo.png')" }}>
      <MainHeader />

      <div className="flex flex-1">
        <aside className="w-64 hidden md:block">
          <SidebarMenu />
        </aside>

        <main className="flex-1 relative overflow-hidden">
          {/* Fondo específico */}
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center opacity-90"
            style={{ backgroundImage: "url('/fcursos.png')" }}
          />

          <section className="relative mx-auto max-w-7xl px-6 py-14 grid gap-12 md:grid-cols-2">
            {/* COPY */}
            <div className="text-white rounded-3xl bg-black/35 backdrop-blur-xl border border-white/10 shadow-2xl p-8">

              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Capacitación que impulsa{" "}
                <span className="text-yellow-400">decisiones estratégicas</span>
              </h1>

              <p className="mt-5 max-w-xl text-white/95 leading-relaxed">
                Diseñamos programas de alto impacto para fortalecer liderazgo,
                finanzas, innovación y competitividad empresarial.
              </p>

              <ul className="mt-8 space-y-3 text-white/80">
                {[
                  "Estrategia y planeación empresarial",
                  "Análisis financiero y toma de decisiones",
                  "Diseño de modelos de negocio",
                  "Nearshoring y comercio internacional",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-yellow-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid grid-cols-3 gap-6 text-white">
                <Stat value="30+" label="Años de experiencia" />
                <Stat value="200+" label="Clientes" />
                <Stat value="15" label="Países" />
              </div>
            </div>

            {/* FORMULARIO */}
            <div className="rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl p-6">
              <LogoEcosyval />

              <h2 className="mt-2 text-center text-lg font-bold text-white">
                Agenda una reunión
              </h2>
              <p className="mb-4 text-center text-xs text-white/70">
                Un consultor se comunicará contigo
              </p>

              <form onSubmit={handleSubmit} className="grid gap-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input name="nombre" label="Nombre *" value={form.nombre} onChange={handleChange} />
                  <Input name="apellido" label="Apellido *" value={form.apellido} onChange={handleChange} />
                </div>

                <Input name="email" type="email" label="Email *" value={form.email} onChange={handleChange} />

                <div className="grid sm:grid-cols-2 gap-3">
                  <Select name="estado" label="Estado *" value={form.estado} onChange={handleChange} options={ESTADOS_MX} />
                  <Input name="telefono" label="Teléfono *" value={form.telefono} onChange={handleChange} />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Input name="empresa" label="Empresa" value={form.empresa} onChange={handleChange} />
                  <Input name="cargo" label="Cargo" value={form.cargo} onChange={handleChange} />
                </div>

                <Select
                  name="interes"
                  label="Interés"
                  value={form.interes}
                  onChange={handleChange}
                  options={["Capacitación", "Curso", "Diplomado", "Asesoría"]}
                />

                <Textarea name="mensaje" label="Mensaje" value={form.mensaje} onChange={handleChange} />

                {error && <p className="text-sm text-red-400">{error}</p>}
                {ok && <p className="text-sm text-green-400">Solicitud enviada correctamente ✔</p>}

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-2 rounded-2xl bg-yellow-400 py-3 font-extrabold text-black hover:bg-yellow-500 transition disabled:opacity-60"
                >
                  {sending ? "Enviando..." : "Agendar ahora"}
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ===== Helpers ===== */

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <label className="text-xs text-white/70">
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </label>
  );
}

function Textarea({ label, name, value, onChange }) {
  return (
    <label className="text-xs text-white/70">
      {label}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </label>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <label className="text-xs text-white/70">
      {label}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option value="">Selecciona…</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-black">
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
      <div className="text-2xl font-extrabold text-yellow-400">{value}</div>
      <div className="text-xs text-white/70">{label}</div>
    </div>
  );
}

function LogoEcosyval() {
  return (
    <div className="flex justify-center mb-3">
      <img src="/Logo.png" alt="Ecosysval" className="h-20 object-contain" />
    </div>
  );
}

const ESTADOS_MX = ["CDMX", "Jalisco", "Nuevo León", "Puebla", "Yucatán"];
