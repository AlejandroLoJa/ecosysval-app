import React, { useEffect, useState } from "react";
import {
  Camera,
  Building2,
  Pencil,
  Save,
  X,
  Loader2,
  CheckCircle2,
  FileDown,
} from "lucide-react";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";

const API_URL = "http://localhost:3000";
const EMPRESA_ID_DEFAULT = 1;

const OPCIONES_SCIAN = [
  { codigo: "522320", descripcion: "Otros servicios de intermediación crediticia" },
  { codigo: "541511", descripcion: "Servicios de desarrollo de software a la medida" },
  { codigo: "541512", descripcion: "Servicios de consultoría en tecnologías de información" },
  { codigo: "611430", descripcion: "Escuelas de capacitación para el trabajo" },
];

export default function Perfil() {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    razonSocial: "",
    correo: "",
    ambito: "",
    ubicacion: "",
    representante: "",
    paginaWeb: "",
    logo: "",
    volumenVentas: "",
    empleados: 0,
    antiguedad: "",
    mision: "",
    vision: "",
    sucursales: "",
    socios: "",
    importaciones: false,
    exportaciones: false,
    productos: "",
    servicios: "",
    objetivos: "",
    scianCodigo: "",
    scianDescripcion: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [stats] = useState({ compras: 1, ventas: 2, restantes: 2 });

  useEffect(() => {
    cargarEmpresa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function cargarEmpresa() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/empresas/${EMPRESA_ID_DEFAULT}`);
      if (res.ok) {
        const data = await res.json();
        setEmpresa(data);
        setForm({
          razonSocial: data.razonSocial ?? "",
          correo: data.correo ?? "",
          ambito: data.ambito ?? "",
          ubicacion: data.ubicacion ?? "",
          representante: data.representante ?? "",
          paginaWeb: data.paginaWeb ?? "",
          logo: data.logo ?? "",
          volumenVentas: data.volumenVentas ?? "",
          empleados: data.empleados ?? 0,
          antiguedad: data.antiguedad ?? "",
          mision: data.mision ?? "",
          vision: data.vision ?? "",
          sucursales: data.sucursales ?? "",
          socios: data.socios ?? "",
          importaciones: !!data.importaciones,
          exportaciones: !!data.exportaciones,
          productos: data.productos ?? "",
          servicios: data.servicios ?? "",
          objetivos: data.objetivos ?? "",
          scianCodigo: data.scianCodigo ?? "",
          scianDescripcion: data.scianDescripcion ?? "",
        });
      } else if (res.status === 404) {
        setEmpresa(null);
        setEditMode(true);
      } else {
        throw new Error(`Error ${res.status}`);
      }
    } catch (e) {
      setError("No se pudo cargar el perfil empresarial.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function onChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function onToggle(field) {
    setForm((f) => ({ ...f, [field]: !f[field] }));
  }

  function handleLogoSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
  }

  async function subirLogoSiCorresponde(empresaId) {
    if (!logoFile) return null;

    const fd = new FormData();
    fd.append("file", logoFile);

    const res = await fetch(`${API_URL}/empresas/${empresaId}/logo`, {
      method: "PATCH",
      body: fd,
    });

    if (!res.ok) {
      console.warn("No se pudo subir el logo (endpoint opcional).");
      return null;
    }

    const data = await res.json();
    return data?.logo || null;
  }

  async function guardar() {
    setSaving(true);
    setError("");
    try {
      let saved;

      if (empresa?.id) {
        const res = await fetch(`${API_URL}/empresas/${empresa.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Error al actualizar");
        saved = await res.json();
      } else {
        const res = await fetch(`${API_URL}/empresas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Error al crear");
        saved = await res.json();
      }

      const nuevoLogoUrl = await subirLogoSiCorresponde(saved.id);
      const empresaFinal = nuevoLogoUrl ? { ...saved, logo: nuevoLogoUrl } : saved;

      setEmpresa(empresaFinal);
      setForm((f) => ({ ...f, logo: empresaFinal.logo || "" }));
      setLogoFile(null);
      setLogoPreview(null);
      setEditMode(false);
    } catch (e) {
      console.error(e);
      setError("No se pudo guardar la información.");
    } finally {
      setSaving(false);
    }
  }

  function cancelarEdicion() {
    if (empresa) {
      setForm({
        razonSocial: empresa.razonSocial ?? "",
        correo: empresa.correo ?? "",
        ambito: empresa.ambito ?? "",
        ubicacion: empresa.ubicacion ?? "",
        representante: empresa.representante ?? "",
        paginaWeb: empresa.paginaWeb ?? "",
        logo: empresa.logo ?? "",
        volumenVentas: empresa.volumenVentas ?? "",
        empleados: empresa.empleados ?? 0,
        antiguedad: empresa.antiguedad ?? "",
        mision: empresa.mision ?? "",
        vision: empresa.vision ?? "",
        sucursales: empresa.sucursales ?? "",
        socios: empresa.socios ?? "",
        importaciones: !!empresa.importaciones,
        exportaciones: !!empresa.exportaciones,
        productos: empresa.productos ?? "",
        servicios: empresa.servicios ?? "",
        objetivos: empresa.objetivos ?? "",
        scianCodigo: empresa.scianCodigo ?? "",
        scianDescripcion: empresa.scianDescripcion ?? "",
      });
    }
    setLogoFile(null);
    setLogoPreview(null);
    setEditMode(false);
  }

  async function descargarPDF() {
    if (!empresa?.id) return;
    setDownloading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/empresas/${empresa.id}/reporte`);
      if (!res.ok) throw new Error("Error al generar PDF");
      const data = await res.json();

      if (data?.url) {
        const link = document.createElement("a");
        link.href = `${API_URL}${data.url}`;
        link.download = `perfil_${(empresa.razonSocial || "empresa").replace(/\s+/g, "_")}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setError("No se recibió la URL del archivo.");
      }
    } catch (e) {
      console.error(e);
      setError("No se pudo generar el PDF.");
    } finally {
      setDownloading(false);
    }
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/fondo.png')", backgroundSize: "cover" }}
      >
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl px-6 py-4 inline-flex items-center">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Cargando información empresarial...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover flex flex-col"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <MainHeader showSearch={true} showBack={false} />

      <div className="flex flex-1">
        <aside className="hidden md:block w-64">
          <SidebarMenu />
        </aside>

        <main className="flex-1 px-4 md:px-8 py-6">
          <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* FORM */}
            <section className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-xl p-6 md:p-7 space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-white">
                    Perfil Empresarial
                  </h1>
                  <p className="text-white/60 text-sm mt-1">
                    Gestiona la información pública de tu empresa y su actividad SCIAN.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {!editMode ? (
                    <>
                      {empresa ? (
                        <button
                          onClick={() => setEditMode(true)}
                          className="bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-2xl transition shadow inline-flex items-center gap-2 border border-white/10"
                        >
                          <Pencil className="w-4 h-4" />
                          Editar
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditMode(true)}
                          className="bg-emerald-500/90 hover:bg-emerald-500 text-black px-4 py-2 rounded-2xl transition shadow inline-flex items-center gap-2 font-semibold"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Crear perfil
                        </button>
                      )}

                      <button
                        onClick={descargarPDF}
                        disabled={downloading || !empresa?.id}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-2xl transition shadow inline-flex items-center gap-2 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {downloading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <FileDown className="w-4 h-4" />
                        )}
                        Descargar PDF
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={guardar}
                        disabled={saving}
                        className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-2xl transition shadow inline-flex items-center gap-2 font-semibold disabled:opacity-60"
                      >
                        {saving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Guardar
                      </button>

                      <button
                        onClick={cancelarEdicion}
                        className="bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-2xl transition shadow inline-flex items-center gap-2 border border-white/10"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </button>
                    </>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-2xl bg-red-500/15 text-red-200 border border-red-500/30">
                  {error}
                </div>
              )}

              {/* GRID PRINCIPAL */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  <Field
                    label="Razón social"
                    edit={editMode}
                    value={form.razonSocial}
                    onChange={(v) => onChange("razonSocial", v)}
                    placeholder="Nombre legal de la empresa"
                  />
                  <Field
                    label="Correo electrónico"
                    edit={editMode}
                    value={form.correo}
                    onChange={(v) => onChange("correo", v)}
                    placeholder="correo@empresa.com"
                  />
                  <Field
                    label="Ámbito"
                    edit={editMode}
                    value={form.ambito}
                    onChange={(v) => onChange("ambito", v)}
                    placeholder="Sector o industria"
                  />
                  <Field
                    label="Ubicación"
                    edit={editMode}
                    value={form.ubicacion}
                    onChange={(v) => onChange("ubicacion", v)}
                    placeholder="Ciudad, país"
                  />
                  <Field
                    label="Representante legal"
                    edit={editMode}
                    value={form.representante}
                    onChange={(v) => onChange("representante", v)}
                    placeholder="Nombre del representante"
                  />
                  <Field
                    label="Página web"
                    edit={editMode}
                    value={form.paginaWeb}
                    onChange={(v) => onChange("paginaWeb", v)}
                    placeholder="https://empresa.com"
                  />

                  {/* SCIAN */}
                  <div className="md:col-span-2 xl:col-span-3">
                    <p className="text-sm text-white/60">Actividad económica (SCIAN)</p>

                    {editMode ? (
                      <select
                        className="mt-1 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400"
                        value={form.scianCodigo || ""}
                        onChange={(e) => {
                          const codigo = e.target.value;
                          const opcion = OPCIONES_SCIAN.find((o) => o.codigo === codigo);
                          setForm((f) => ({
                            ...f,
                            scianCodigo: codigo,
                            scianDescripcion: opcion?.descripcion || "",
                          }));
                        }}
                      >
                        <option value="" className="text-black">
                          Selecciona una actividad…
                        </option>
                        {OPCIONES_SCIAN.map((o) => (
                          <option key={o.codigo} value={o.codigo} className="text-black">
                            {o.codigo} — {o.descripcion}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-white/90 mt-2">
                        {form.scianCodigo ? (
                          <>
                            <span className="font-semibold text-white">{form.scianCodigo}</span>
                            <span className="text-white/70"> — {form.scianDescripcion}</span>
                          </>
                        ) : (
                          <span className="text-white/60">—</span>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {/* LOGO */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 flex flex-col items-center justify-center relative">
                  {logoPreview || form.logo ? (
                    <img
                      src={
                        logoPreview ||
                        (form.logo?.startsWith("http")
                          ? form.logo
                          : `${API_URL}${form.logo || ""}`)
                      }
                      alt="Logo Empresa"
                      className="w-40 h-40 object-contain rounded-2xl border border-white/10 bg-black/20 shadow"
                    />
                  ) : (
                    <div className="w-40 h-40 flex items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                      <Building2 className="w-12 h-12 text-white/60" />
                    </div>
                  )}

                  {editMode && (
                    <label className="absolute bottom-4 right-4 bg-yellow-400 cursor-pointer rounded-full p-3 shadow-md hover:bg-yellow-500 transition">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoSelect}
                      />
                      <Camera className="w-4 h-4 text-black" />
                    </label>
                  )}

                  <div className="mt-4 text-center">
                    <p className="text-white font-semibold">Logo</p>
                    <p className="text-white/60 text-xs">
                      Recomendado: PNG con fondo transparente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Datos adicionales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Field
                  label="Volumen de ventas anual"
                  edit={editMode}
                  value={form.volumenVentas}
                  onChange={(v) => onChange("volumenVentas", v)}
                  placeholder="Ej. 1.000.000 - 5.000.000 MXN"
                />
                <Field
                  label="Empleados"
                  type="number"
                  edit={editMode}
                  value={form.empleados}
                  onChange={(v) => onChange("empleados", Number(v))}
                  placeholder="0"
                />
                <Field
                  label="Antigüedad"
                  edit={editMode}
                  value={form.antiguedad}
                  onChange={(v) => onChange("antiguedad", v)}
                  placeholder="Ej. Más de 10 años"
                />
              </div>

              {/* Misión / Visión */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  label="Misión"
                  textarea
                  edit={editMode}
                  value={form.mision}
                  onChange={(v) => onChange("mision", v)}
                  placeholder="Propósito y razón de ser"
                />
                <Field
                  label="Visión"
                  textarea
                  edit={editMode}
                  value={form.vision}
                  onChange={(v) => onChange("vision", v)}
                  placeholder="A dónde quiere llegar la empresa"
                />
              </div>

              {/* Sucursales / Socios */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  label="Sucursales"
                  edit={editMode}
                  value={form.sucursales}
                  onChange={(v) => onChange("sucursales", v)}
                  placeholder="Listado o /"
                />
                <Field
                  label="Principales socios comerciales"
                  edit={editMode}
                  value={form.socios}
                  onChange={(v) => onChange("socios", v)}
                  placeholder="Listado o /"
                />
              </div>

              {/* Importaciones / Exportaciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ToggleCard
                  label="Importaciones"
                  value={form.importaciones}
                  edit={editMode}
                  onToggle={() => onToggle("importaciones")}
                />
                <ToggleCard
                  label="Exportaciones"
                  value={form.exportaciones}
                  edit={editMode}
                  onToggle={() => onToggle("exportaciones")}
                />
              </div>

              {/* Productos / Servicios */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  label="Productos"
                  edit={editMode}
                  value={form.productos}
                  onChange={(v) => onChange("productos", v)}
                  placeholder="/"
                />
                <Field
                  label="Servicios"
                  edit={editMode}
                  value={form.servicios}
                  onChange={(v) => onChange("servicios", v)}
                  placeholder="/"
                />
              </div>

              {/* ODS */}
              <Field
                label="Objetivos de Desarrollo Sostenible"
                edit={editMode}
                value={form.objetivos}
                onChange={(v) => onChange("objetivos", v)}
                placeholder="/"
              />
            </section>

            {/* PANEL DERECHO */}
            <aside className="space-y-4">
              <StatCard value={stats.compras} title="Compras realizadas" />
              <StatCard value={stats.ventas} title="Ventas realizadas" />

              <div className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-xl p-6 text-center">
                <div className="text-5xl font-extrabold text-yellow-400">
                  {stats.restantes}
                </div>
                <div className="mt-2 text-white/75 leading-snug">
                  Transacciones restantes para desbloquear el rango Platino.
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- Componentes ---------- */

function Field({
  label,
  value,
  onChange,
  edit = false,
  textarea = false,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <p className="text-sm text-white/60">{label}</p>

      {edit ? (
        textarea ? (
          <textarea
            className="mt-1 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-white/40"
            rows={3}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            className="mt-1 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-white/40"
            value={value ?? (type === "number" ? 0 : "")}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        )
      ) : (
        <p className="mt-2 text-white/90 break-all">{String(value ?? "") || "—"}</p>
      )}
    </div>
  );
}

function ToggleCard({ label, value, edit, onToggle }) {
  const active = !!value;

  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur-xl shadow p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">{label}</p>
          <p className="text-white/60 text-xs mt-1">
            Estado: {active ? "Sí" : "No"}
          </p>
        </div>

        {edit ? (
          <button
            onClick={onToggle}
            className={`w-14 h-7 rounded-full transition border border-white/10 ${
              active ? "bg-yellow-400" : "bg-white/20"
            }`}
            title="Cambiar"
            type="button"
          >
            <span
              className={`block w-6 h-6 bg-black/80 rounded-full transform transition ${
                active ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        ) : (
          <span className={`text-xl font-bold ${active ? "text-yellow-400" : "text-white/40"}`}>
            {active ? "✔" : "✖"}
          </span>
        )}
      </div>
    </div>
  );
}

function StatCard({ value, title }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-xl p-6 text-center">
      <div className="text-5xl font-extrabold text-yellow-400">{value}</div>
      <div className="mt-2 text-white/75">{title}</div>
    </div>
  );
}
