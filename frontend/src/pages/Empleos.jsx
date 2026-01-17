import React, { useEffect, useMemo, useState } from "react";
import MainHeader from "../components/MainHeader";
import SidebarMenu from "../components/SidebarMenu";
import JobCard from "../components/JobCard";
import { X, Plus, Search, FileText, Loader2 } from "lucide-react";

// Cambia esta URL según sea necesario
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

    // --- CARGAR DATOS DEL BACKEND ---
    useEffect(() => {
        fetchEmpleos();
    }, []);

    const fetchEmpleos = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Error al obtener empleos");
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    // --- PUBLICAR EN EL BACKEND ---
    const publicarEmpleo = async (e) => {
        e.preventDefault();

        if (!form.titulo || !form.empresa || !form.ubicacion || !form.descripcion) {
            alert("Completa mínimo: Título, Empresa, Ubicación y Descripción.");
            return;
        }

        // Mapeamos tipoContrato a tipo_contrato para que el DTO de NestJS lo reciba bien
        const {
            tipoContrato,
            ...restForm
        } = form;

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

                // Resetear formulario a valores iniciales
                setForm({
                    titulo: "", empresa: "", ubicacion: "", salario: "",
                    modalidad: "Presencial", tipoContrato: "Obra o labor",
                    jornada: "Tiempo completo", descripcion: "",
                    requisitos: "", beneficios: "", contacto: "", urgente: false,
                });
            }
        } catch (error) {
            alert("Error al guardar en la base de datos.");
        }
    };

    // --- ELIMINAR DEL BACKEND ---
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
        return jobs.filter((j) =>
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
                <aside className="w-64 bg-blue-900 text-white shadow-lg hidden md:block">
                    <SidebarMenu />
                </aside>

                <main className="flex-1 p-6">
                    <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[420px_1fr]">

                        {/* FORMULARIO (Mantenido IDÉNTICO a tu original) */}
                        <section className="rounded-2xl bg-white/90 backdrop-blur-md border shadow-sm p-6 h-fit">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-lg font-bold text-slate-900 inline-flex items-center gap-2">
                                    <Plus className="w-5 h-5" />
                                    Publicar oferta de empleo
                                </h1>
                                <span className="text-xs text-slate-500">
                                    {jobs.length} creadas
                                </span>
                            </div>

                            <form onSubmit={publicarEmpleo} className="grid gap-3">
                                <Field label="Título *">
                                    <input
                                        value={form.titulo}
                                        onChange={(e) => handleChange("titulo", e.target.value)}
                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                                        placeholder="Analista de soporte"
                                    />
                                </Field>

                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Empresa *">
                                        <input
                                            value={form.empresa}
                                            onChange={(e) => handleChange("empresa", e.target.value)}
                                            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                                            placeholder="Ej: OMEC"
                                        />
                                    </Field>
                                    <Field label="Ubicación *">
                                        <input
                                            value={form.ubicacion}
                                            onChange={(e) => handleChange("ubicacion", e.target.value)}
                                            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                                            placeholder="Ej: CMX Ciudad de Mexico"
                                        />
                                    </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Salario">
                                        <input
                                            value={form.salario}
                                            onChange={(e) => handleChange("salario", e.target.value)}
                                            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                                            placeholder="Ej: $1000"
                                        />
                                    </Field>
                                    <Field label="Modalidad">
                                        <select
                                            value={form.modalidad}
                                            onChange={(e) => handleChange("modalidad", e.target.value)}
                                            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                                        >
                                            <option>Presencial</option>
                                            <option>Remoto</option>
                                            <option>Híbrido</option>
                                        </select>
                                    </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Contrato">
                                        <select
                                            value={form.tipoContrato}
                                            onChange={(e) => handleChange("tipoContrato", e.target.value)}
                                            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                                        >
                                            <option>Obra o labor</option>
                                            <option>Término fijo</option>
                                            <option>Indefinido</option>
                                            <option>Prestación de servicios</option>
                                        </select>
                                    </Field>
                                    <Field label="Jornada">
                                        <select
                                            value={form.jornada}
                                            onChange={(e) => handleChange("jornada", e.target.value)}
                                            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                                        >
                                            <option>Tiempo completo</option>
                                            <option>Medio tiempo</option>
                                            <option>Por horas</option>
                                            <option>Turnos rotativos</option>
                                        </select>
                                    </Field>
                                </div>

                                <Field label="Descripción *">
                                    <textarea
                                        value={form.descripcion}
                                        onChange={(e) => handleChange("descripcion", e.target.value)}
                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400 resize-y"
                                        rows={4}
                                        placeholder="Describe funciones principales..."
                                    />
                                </Field>

                                <Field label="Requisitos">
                                    <textarea
                                        value={form.requisitos}
                                        onChange={(e) => handleChange("requisitos", e.target.value)}
                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400 resize-y"
                                        rows={3}
                                        placeholder="Ej: Bachillerato..."
                                    />
                                </Field>

                                <Field label="Beneficios">
                                    <textarea
                                        value={form.beneficios}
                                        onChange={(e) => handleChange("beneficios", e.target.value)}
                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400 resize-y"
                                        rows={2}
                                    />
                                </Field>

                                <Field label="Contacto (correo/WhatsApp)">
                                    <input
                                        value={form.contacto}
                                        onChange={(e) => handleChange("contacto", e.target.value)}
                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </Field>

                                <label className="flex items-center gap-2 text-sm text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={form.urgente}
                                        onChange={(e) => handleChange("urgente", e.target.checked)}
                                    />
                                    Marcar como urgente
                                </label>

                                <button
                                    type="submit"
                                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-slate-900 shadow hover:brightness-95 transition"
                                >
                                    <FileText className="w-5 h-5" />
                                    Publicar empleo
                                </button>
                            </form>
                        </section>

                        {/* LISTA DE EMPLEOS */}
                        <section className="rounded-2xl bg-white/70 backdrop-blur-md border shadow-sm p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h2 className="text-lg font-bold text-slate-900">Empleos publicados</h2>
                                <div className="relative">
                                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                                    <input
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                        className="pl-9 pr-3 py-2 rounded-xl border bg-white outline-none focus:ring-2 focus:ring-yellow-400 text-sm w-72 max-w-full"
                                        placeholder="Buscar empleo..."
                                    />
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center p-20 text-slate-500">
                                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                                    <p>Cargando vacantes desde la base de datos...</p>
                                </div>
                            ) : jobsFiltrados.length === 0 ? (
                                <div className="rounded-2xl bg-white p-10 text-center border">
                                    <div className="text-4xl mb-3">💼</div>
                                    <p className="text-slate-700 font-semibold">No se encontraron empleos</p>
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
                <div className="fixed inset-0 z-[3000] bg-black/40 flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b">
                            <div>
                                <h3 className="font-bold text-slate-900">{openJob.titulo}</h3>
                                <p className="text-xs text-slate-500">{openJob.empresa} • {openJob.ubicacion}</p>
                            </div>
                            <button onClick={() => setOpenJob(null)} className="h-9 w-9 rounded-full border hover:bg-slate-50 flex items-center justify-center">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-5 space-y-4 text-sm text-slate-700">
                            <InfoRow label="Salario" value={openJob.salario || "A convenir"} />
                            <InfoRow label="Modalidad" value={openJob.modalidad} />
                            <InfoRow label="Contrato" value={openJob.tipo_contrato || openJob.tipoContrato} />
                            <InfoRow label="Jornada" value={openJob.jornada} />
                            <Block title="Descripción" text={openJob.descripcion} />
                            <div className="flex items-center justify-between pt-2">
                                <button onClick={() => eliminarEmpleo(openJob.id)} className="rounded-xl border px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                    Eliminar
                                </button>
                                <button onClick={() => setOpenJob(null)} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
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

// Componentes auxiliares (mantenidos igual)
function Field({ label, children }) {
    return (
        <label className="block">
            <span className="block text-xs font-semibold text-slate-600 mb-1">{label}</span>
            {children}
        </label>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex items-start justify-between gap-6">
            <span className="text-slate-500">{label}</span>
            <span className="font-medium text-slate-900 text-right">{value}</span>
        </div>
    );
}

function Block({ title, text }) {
    if (!text) return null;
    return (
        <div className="rounded-xl border bg-slate-50 p-4">
            <div className="font-semibold text-slate-900 mb-1">{title}</div>
            <div className="text-slate-700 whitespace-pre-wrap">{text}</div>
        </div>
    );
}