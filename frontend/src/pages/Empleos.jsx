import React, { useEffect, useMemo, useState } from "react";
import MainHeader from "../components/MainHeader";
import SidebarMenu from "../components/SidebarMenu";
import JobCard from "../components/JobCard";
import { X, Plus, Search, FileText, Loader2 } from "lucide-react";

const API_URL = "http://localhost:3000/empleos";

export default function Empleos() {
  const [jobs, setJobs] = useState([]);
  const [openJob, setOpenJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    empresa: "",
    ubicacion: "",
    salario: "",
    modalidad: "Presencial",
    tipoContrato: "Obra o labor",
    jornada: "Tiempo completo",
    descripcion: "",
    requisitos: "",
    beneficios: "",
    contacto: "",
    urgente: false,
  });

  useEffect(() => {
    fetchEmpleos();
  }, []);

  const fetchEmpleos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener empleos");
      const data = await response.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const publicarEmpleo = async (e) => {
    e.preventDefault();

    if (!form.titulo || !form.empresa || !form.ubicacion || !form.descripcion) {
      alert("Completa mínimo: Título, Empresa, Ubicación y Descripción.");
      return;
    }

    const { tipoContrato, ...restForm } = form;

    const dataParaEnviar = {
      ...restForm,
      tipo_contrato: tipoContrato,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataParaEnviar),
      });

      if (response.ok) {
        const nuevoJob = await response.json();
        setJobs((prev) => [nuevoJob, ...prev]);

        setForm({
          titulo: "",
          empresa: "",
          ubicacion: "",
          salario: "",
          modalidad: "Presencial",
          tipoContrato: "Obra o labor",
          jornada: "Tiempo completo",
          descripcion: "",
          requisitos: "",
          beneficios: "",
          contacto: "",
          urgente: false,
        });
      } else {
        const err = await response.json().catch(() => ({}));
        alert(err?.message || "No se pudo publicar el empleo.");
      }
    } catch (error) {
      alert("Error al guardar en la base de datos.");
    }
  };

  const eliminarEmpleo = async (id) => {
    if (!window.confirm("¿Eliminar este empleo permanentemente?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
        if (openJob?.id === id) setOpenJob(null);
      }
    } catch (error) {
      alert("Error al eliminar.");
    }
  };

  const jobsFiltrados = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return jobs;
    return jobs.filter(
      (j) =>
        (j.titulo || "").toLowerCase().includes(term) ||
        (j.empresa || "").toLowerCase().includes(term) ||
        (j.ubicacion || "").toLowerCase().includes(term) ||
        (j.descripcion || "").toLowerCase().includes(term)
    );
  }, [jobs, q]);

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover flex flex-col"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <MainHeader />

      <div className="flex flex-1">
        <aside className="hidden md:block w-64">
          <SidebarMenu />
        </aside>

        <main className="flex-1 px-4 md:px-8 py-6">
          <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[420px_1fr]">
            {/* FORMULARIO */}
            <section className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-xl p-6 h-fit">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-extrabold text-white inline-flex items-center gap-2">
                  <Plus className="w-5 h-5 text-yellow-400" />
                  Publicar oferta de empleo
                </h1>
                <span className="text-xs text-white/60">{jobs.length} creadas</span>
              </div>

              <form onSubmit={publicarEmpleo} className="grid gap-3">
                <Field label="Título *">
                  <input
                    value={form.titulo}
                    onChange={(e) => handleChange("titulo", e.target.value)}
                    className={inputCls}
                    placeholder="Analista de soporte"
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Empresa *">
                    <input
                      value={form.empresa}
                      onChange={(e) => handleChange("empresa", e.target.value)}
                      className={inputCls}
                      placeholder="Ej: OMEC"
                    />
                  </Field>
                  <Field label="Ubicación *">
                    <input
                      value={form.ubicacion}
                      onChange={(e) => handleChange("ubicacion", e.target.value)}
                      className={inputCls}
                      placeholder="Ej: CDMX"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Salario">
                    <input
                      value={form.salario}
                      onChange={(e) => handleChange("salario", e.target.value)}
                      className={inputCls}
                      placeholder="Ej: $1000"
                    />
                  </Field>
                  <Field label="Modalidad">
                    <select
                      value={form.modalidad}
                      onChange={(e) => handleChange("modalidad", e.target.value)}
                      className={selectCls}
                    >
                      <option className="text-black">Presencial</option>
                      <option className="text-black">Remoto</option>
                      <option className="text-black">Híbrido</option>
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Contrato">
                    <select
                      value={form.tipoContrato}
                      onChange={(e) => handleChange("tipoContrato", e.target.value)}
                      className={selectCls}
                    >
                      <option className="text-black">Obra o labor</option>
                      <option className="text-black">Término fijo</option>
                      <option className="text-black">Indefinido</option>
                      <option className="text-black">Prestación de servicios</option>
                    </select>
                  </Field>
                  <Field label="Jornada">
                    <select
                      value={form.jornada}
                      onChange={(e) => handleChange("jornada", e.target.value)}
                      className={selectCls}
                    >
                      <option className="text-black">Tiempo completo</option>
                      <option className="text-black">Medio tiempo</option>
                      <option className="text-black">Por horas</option>
                      <option className="text-black">Turnos rotativos</option>
                    </select>
                  </Field>
                </div>

                <Field label="Descripción *">
                  <textarea
                    value={form.descripcion}
                    onChange={(e) => handleChange("descripcion", e.target.value)}
                    className={textareaCls}
                    rows={4}
                    placeholder="Describe funciones principales..."
                  />
                </Field>

                <Field label="Requisitos">
                  <textarea
                    value={form.requisitos}
                    onChange={(e) => handleChange("requisitos", e.target.value)}
                    className={textareaCls}
                    rows={3}
                    placeholder="Ej: Bachillerato..."
                  />
                </Field>

                <Field label="Beneficios">
                  <textarea
                    value={form.beneficios}
                    onChange={(e) => handleChange("beneficios", e.target.value)}
                    className={textareaCls}
                    rows={2}
                    placeholder="Ej: Bonos, remoto, seguro..."
                  />
                </Field>

                <Field label="Contacto (correo/WhatsApp)">
                  <input
                    value={form.contacto}
                    onChange={(e) => handleChange("contacto", e.target.value)}
                    className={inputCls}
                    placeholder="correo@empresa.com / +57..."
                  />
                </Field>

                <label className="flex items-center gap-2 text-sm text-white/80">
                  <input
                    type="checkbox"
                    checked={form.urgente}
                    onChange={(e) => handleChange("urgente", e.target.checked)}
                    className="accent-yellow-400"
                  />
                  Marcar como urgente
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 font-semibold text-black shadow hover:bg-yellow-500 transition"
                >
                  <FileText className="w-5 h-5" />
                  Publicar empleo
                </button>
              </form>
            </section>

            {/* LISTA */}
            <section className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur-xl shadow-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <h2 className="text-lg font-extrabold text-white">Empleos publicados</h2>

                <div className="relative">
                  <Search className="w-4 h-4 text-white/50 absolute left-3 top-3" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="pl-9 pr-3 py-2 rounded-2xl border border-white/10 bg-white/10 text-white outline-none focus:ring-2 focus:ring-yellow-400 text-sm w-72 max-w-full placeholder:text-white/40"
                    placeholder="Buscar empleo..."
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center p-16 text-white/70">
                  <Loader2 className="w-8 h-8 animate-spin mb-3" />
                  <p>Cargando vacantes desde la base de datos...</p>
                </div>
              ) : jobsFiltrados.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                  <div className="text-4xl mb-3">💼</div>
                  <p className="text-white font-semibold">No se encontraron empleos</p>
                  <p className="text-white/60 text-sm mt-1">
                    Prueba con otro término de búsqueda.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {jobsFiltrados.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onOpen={(j) => setOpenJob(j)}
                      onApply={(j) => alert(`Aplicación enviada para: ${j.titulo}`)}
                      compact
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      {/* MODAL DETALLE */}
      {openJob && (
        <div className="fixed inset-0 z-[3000] bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h3 className="font-extrabold text-white">{openJob.titulo}</h3>
                <p className="text-xs text-white/60">
                  {openJob.empresa} • {openJob.ubicacion}
                </p>
              </div>

              <button
                onClick={() => setOpenJob(null)}
                className="h-10 w-10 rounded-full border border-white/10 hover:bg-white/10 flex items-center justify-center"
                title="Cerrar"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm text-white/80">
              <InfoRow label="Salario" value={openJob.salario || "A convenir"} />
              <InfoRow label="Modalidad" value={openJob.modalidad} />
              <InfoRow label="Contrato" value={openJob.tipo_contrato || openJob.tipoContrato} />
              <InfoRow label="Jornada" value={openJob.jornada} />
              <Block title="Descripción" text={openJob.descripcion} />

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => eliminarEmpleo(openJob.id)}
                  className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-200 hover:bg-red-500/20"
                >
                  Eliminar
                </button>

                <button
                  onClick={() => setOpenJob(null)}
                  className="rounded-2xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-500"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== estilos reutilizables ===== */
const inputCls =
  "w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-white/40";

const selectCls =
  "w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-yellow-400";

const textareaCls =
  "w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-white/40 resize-y";

/* ===== componentes ===== */
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

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <span className="text-white/60">{label}</span>
      <span className="font-semibold text-white text-right">{value}</span>
    </div>
  );
}

function Block({ title, text }) {
  if (!text) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="font-semibold text-white mb-1">{title}</div>
      <div className="text-white/75 whitespace-pre-wrap">{text}</div>
    </div>
  );
}
