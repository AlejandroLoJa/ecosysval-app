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

// Catálogo inicial de actividades SCIAN (puedes ampliarlo luego)
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

  // form state para editar/crear
  const [form, setForm] = useState({
    razonSocial: "",
    correo: "",
    ambito: "",
    ubicacion: "",
    representante: "",
    paginaWeb: "",
    logo: "", // URL ya almacenada
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
    // NUEVO
    scianCodigo: "",
    scianDescripcion: "",
  });

  // manejo del logo
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  // Panel derecho: stats dummy (o puedes traerlas del backend si las tienes)
  const [stats, setStats] = useState({ compras: 1, ventas: 2, restantes: 2 });

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
        // No existe: modo creación
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
    // Requiere endpoint PATCH /empresas/:id/logo -> FormData { file }
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
        // actualizar
        const res = await fetch(`${API_URL}/empresas/${empresa.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Error al actualizar");
        saved = await res.json();
      } else {
        // crear
        const res = await fetch(`${API_URL}/empresas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Error al crear");
        saved = await res.json();
      }

      // Subir logo si se seleccionó archivo (endpoint opcional)
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
      // reset al estado original
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

  // ===== Descargar PDF =====
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
        link.download = `perfil_${(empresa.razonSocial || "empresa").replace(
          /\s+/g,
          "_"
        )}.pdf`;
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
      <div className="min-h-screen flex items-center justify-center text-blue-800">
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        Cargando información empresarial...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER GLOBAL REUTILIZABLE */}
      <MainHeader
        showSearch={true}     // muestra el buscador
        showBack={false}      // sin botón de "volver" aquí
        title="ECOSYSVAL"     // texto de la izquierda
      />

      <div className="flex flex-1">
        {/* ======= MENÚ LATERAL ======= */}
        <aside className="w-64 h-screen bg-blue-900 text-white shadow-lg overflow-y-auto">
          <SidebarMenu />
        </aside>

        {/* ======= CONTENIDO PRINCIPAL ======= */}
        <main
          className="flex-1 p-6 flex gap-6"
          style={{
            backgroundImage: "url('/fondo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* ======= FORMULARIO PERFIL ======= */}
          <section className="flex-1 space-y-6 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Perfil Empresarial
              </h1>

              <div className="flex gap-2">
                {!editMode ? (
                  <>
                    {empresa ? (
                      <button
                        onClick={() => setEditMode(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow inline-flex items-center gap-2"
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditMode(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow inline-flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Crear perfil
                      </button>
                    )}
                    <button
                      onClick={descargarPDF}
                      disabled={downloading}
                      className="bg-blue-600/80 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow inline-flex items-center gap-2 disabled:opacity-60"
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
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow inline-flex items-center gap-2 disabled:opacity-60"
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
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition shadow inline-flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-700 border border-red-200">
                {error}
              </div>
            )}

            {/* Información principal */}
            <div className="grid grid-cols-3 gap-6">
              {/* RAZÓN SOCIAL */}
              <Field
                label="Razón social"
                edit={editMode}
                value={form.razonSocial}
                onChange={(v) => onChange("razonSocial", v)}
                placeholder="Nombre legal de la empresa"
              />

              {/* CORREO */}
              <Field
                label="Correo electrónico"
                edit={editMode}
                value={form.correo}
                onChange={(v) => onChange("correo", v)}
                placeholder="correo@empresa.com"
              />

              {/* LOGO EDITABLE */}
              <div className="row-span-3 flex flex-col items-center justify-center relative">
                {logoPreview || form.logo ? (
                  <img
                    src={
                      logoPreview ||
                      (form.logo?.startsWith("http")
                        ? form.logo
                        : `${API_URL}${form.logo || ""}`)
                    }
                    alt="Logo Empresa"
                    className="w-32 h-32 object-contain rounded-lg border shadow bg-white"
                  />

                ) : (
                  <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-lg border">
                    <Building2 className="w-12 h-12 text-gray-500" />
                  </div>
                )}

                {editMode && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 cursor-pointer rounded-full p-2 shadow-md hover:bg-blue-700 transition">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoSelect}
                    />
                    <Camera className="w-4 h-4 text-white" />
                  </label>
                )}
              </div>

              {/* ÁMBITO */}
              <Field
                label="Ámbito"
                edit={editMode}
                value={form.ambito}
                onChange={(v) => onChange("ambito", v)}
                placeholder="Sector o industria"
              />

              {/* UBICACIÓN */}
              <Field
                label="Ubicación"
                edit={editMode}
                value={form.ubicacion}
                onChange={(v) => onChange("ubicacion", v)}
                placeholder="Ciudad, país"
              />

              {/* REPRESENTANTE */}
              <Field
                label="Representante legal"
                edit={editMode}
                value={form.representante}
                onChange={(v) => onChange("representante", v)}
                placeholder="Nombre del representante"
              />

              {/* PÁGINA WEB */}
              <Field
                label="Página web"
                edit={editMode}
                value={form.paginaWeb}
                onChange={(v) => onChange("paginaWeb", v)}
                placeholder="https://empresa.com"
              />

              {/* Actividad económica (SCIAN) */}
              <div className="col-span-3">
                <p className="text-sm text-gray-500">Actividad económica (SCIAN)</p>

                {editMode ? (
                  <select
                    className="mt-1 w-full border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={form.scianCodigo || ""}
                    onChange={(e) => {
                      const codigo = e.target.value;
                      const opcion = OPCIONES_SCIAN.find(
                        (o) => o.codigo === codigo
                      );
                      setForm((f) => ({
                        ...f,
                        scianCodigo: codigo,
                        scianDescripcion: opcion?.descripcion || "",
                      }));
                    }}
                  >
                    <option value="">Selecciona una actividad…</option>
                    {OPCIONES_SCIAN.map((o) => (
                      <option key={o.codigo} value={o.codigo}>
                        {o.codigo} — {o.descripcion}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="font-normal break-all">
                    {form.scianCodigo
                      ? `${form.scianCodigo} — ${form.scianDescripcion}`
                      : "—"}
                  </p>
                )}
              </div>
            </div>

            {/* Datos adicionales */}
            <div className="grid grid-cols-3 gap-6">
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
            <div className="grid grid-cols-2 gap-6">
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
            <div className="grid grid-cols-2 gap-6">
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
            <div className="grid grid-cols-2 gap-6">
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
            <div className="grid grid-cols-2 gap-6">
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

          {/* ======= PANEL DERECHO ======= */}
          <aside className="w-80 shrink-0 space-y-4">
            <StatCard
              value={stats.compras}
              label={
                <>
                  <span className="block">Compras</span> realizadas
                </>
              }
            />
            <StatCard
              value={stats.ventas}
              label={
                <>
                  <span className="block">Ventas</span> realizadas
                </>
              }
            />
            <div className="bg-white rounded-2xl shadow p-5 text-center">
              <div className="text-4xl font-bold text-blue-600">
                {stats.restantes}
              </div>
              <div className="mt-2 text-gray-700 leading-snug">
                Transacciones restantes para desbloquear el rango Platino.
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

/* ---------- Componentes reutilizables ---------- */

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
      <p className="text-sm text-gray-500">{label}</p>
      {edit ? (
        textarea ? (
          <textarea
            className="mt-1 w-full border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows={3}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            className="mt-1 w-full border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={value ?? (type === "number" ? 0 : "")}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        )
      ) : (
        <p className="font-normal break-all">{String(value ?? "") || "—"}</p>
      )}
    </div>
  );
}

function ToggleCard({ label, value, edit, onToggle }) {
  const active = !!value;
  return (
    <div
      className={`p-4 rounded-lg border ${active
        ? "bg-green-50 border-green-200 text-green-700"
        : "bg-red-50 border-red-200 text-red-700"
        }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{label}</p>
        {edit && (
          <button
            onClick={onToggle}
            className={`w-12 h-6 rounded-full transition ${active ? "bg-green-500" : "bg-gray-300"
              }`}
            title="Cambiar"
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full transform transition ${active ? "translate-x-6" : "translate-x-1"
                }`}
            />
          </button>
        )}
      </div>
      {!edit && (
        <span className="text-xl font-normal">{active ? "✔" : "✖"}</span>
      )}
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 text-center">
      <div className="text-4xl font-bold text-blue-600">{value}</div>
      <div className="mt-2 text-gray-700 leading-tight">{label}</div>
    </div>
  );
}
