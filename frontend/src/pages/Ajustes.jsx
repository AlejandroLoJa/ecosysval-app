// src/pages/Ajustes.jsx
import React, { useEffect, useMemo, useState } from "react";
import MainHeader from "../components/MainHeader";
import SidebarMenu from "../components/SidebarMenu";
import {
  Shield,
  Bell,
  Palette,
  Globe,
  User,
  KeyRound,
  Download,
  Link2,
  Trash2,
  Save,
  Moon,
  Sun,
} from "lucide-react";

const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:3000";

export default function Ajustes() {
  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  // ✅ Estados (mock / localStorage)
  const [profile, setProfile] = useState({
    nombre: storedUser?.name || storedUser?.nombre || "",
    email: storedUser?.email || "",
    empresa: storedUser?.empresa || "",
    telefono: storedUser?.telefono || "",
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sesiones: true,
    alertLogin: true,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    mensajes: true,
    recompensas: false,
    comercio: true,
  });

  const [appearance, setAppearance] = useState({
    theme: "dark", // "dark" | "light"
    accent: "gold", // gold | blue | emerald
    density: "comfortable", // compact | comfortable
  });

  const [region, setRegion] = useState({
    idioma: "es",
    pais: "MX",
    zona: "America/Mexico_City",
    moneda: "MXN",
  });

  const [integrations, setIntegrations] = useState({
    quickbooks: false,
    stripe: false,
    paypal: false,
    shopify: false,
  });

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  // cargar ajustes guardados (si existen)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("settings_ecosysval") || "null");
      if (!saved) return;

      if (saved.profile) setProfile((p) => ({ ...p, ...saved.profile }));
      if (saved.security) setSecurity((s) => ({ ...s, ...saved.security }));
      if (saved.notifications) setNotifications((n) => ({ ...n, ...saved.notifications }));
      if (saved.appearance) setAppearance((a) => ({ ...a, ...saved.appearance }));
      if (saved.region) setRegion((r) => ({ ...r, ...saved.region }));
      if (saved.integrations) setIntegrations((i) => ({ ...i, ...saved.integrations }));
    } catch {
      // ignore
    }
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // ✅ mientras conectas backend: guardamos en localStorage
      const payload = { profile, security, notifications, appearance, region, integrations };
      localStorage.setItem("settings_ecosysval", JSON.stringify(payload));

      // (Opcional) cuando tengas endpoint:
      // await fetch(`${API_URL}/settings`, { method:"POST", headers:{...}, body: JSON.stringify(payload) })

      showToast("✅ Ajustes guardados correctamente.");
    } catch (e) {
      showToast("❌ No se pudieron guardar los ajustes.");
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const payload = { profile, security, notifications, appearance, region, integrations };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ecosysval-ajustes.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("⬇️ Exportación lista.");
  };

  const handleDangerReset = () => {
    localStorage.removeItem("settings_ecosysval");
    showToast("🧹 Ajustes locales reiniciados.");
  };

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover flex flex-col"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <MainHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64">
          <SidebarMenu />
        </aside>

        {/* Content */}
        <main className="flex-1 px-4 md:px-8 py-6">
          <div className="mx-auto max-w-6xl space-y-5">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="rounded-3xl border border-white/10 bg-black/65 backdrop-blur-xl shadow-xl px-5 py-4">
                <h1 className="text-white font-extrabold text-lg md:text-xl">
                  Ajustes
                  <span className="text-white/60 font-semibold"> • Preferencias y seguridad</span>
                </h1>
                <p className="text-white/60 text-sm mt-1 max-w-2xl">
                  Personaliza tu experiencia, configura notificaciones, seguridad e integraciones.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExport}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition px-4 py-3 text-white/90 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Exportar
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#ffd166] hover:brightness-95 transition px-5 py-3 font-semibold text-slate-900 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Col izquierda */}
              <div className="lg:col-span-7 space-y-5">
                <GlassCard title="Cuenta" subtitle="Datos visibles y de contacto" icon={<User className="w-5 h-5" />}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field
                      label="Nombre"
                      value={profile.nombre}
                      onChange={(v) => setProfile((p) => ({ ...p, nombre: v }))}
                      placeholder="Tu nombre"
                    />
                    <Field
                      label="Empresa"
                      value={profile.empresa}
                      onChange={(v) => setProfile((p) => ({ ...p, empresa: v }))}
                      placeholder="Nombre de tu empresa"
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={profile.email}
                      onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
                      placeholder="correo@dominio.com"
                    />
                    <Field
                      label="Teléfono"
                      value={profile.telefono}
                      onChange={(v) => setProfile((p) => ({ ...p, telefono: v }))}
                      placeholder="+52 ..."
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-sm text-white/85">
                      Foto de perfil (se gestiona desde Perfil Empresarial)
                      <div className="text-xs text-white/55">
                        Cuando conectes backend, aquí puedes subir/editar.
                      </div>
                    </div>
                    <span className="text-[11px] rounded-full bg-white/10 px-3 py-1 text-white/70">
                      Próximamente
                    </span>
                  </div>
                </GlassCard>

                <GlassCard
                  title="Seguridad"
                  subtitle="Protege tu cuenta"
                  icon={<Shield className="w-5 h-5" />}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Toggle
                      label="Autenticación 2FA"
                      desc="Recomendado para accesos internacionales."
                      value={security.twoFactor}
                      onChange={(v) => setSecurity((s) => ({ ...s, twoFactor: v }))}
                    />
                    <Toggle
                      label="Alertas de inicio"
                      desc="Notifica inicios de sesión sospechosos."
                      value={security.alertLogin}
                      onChange={(v) => setSecurity((s) => ({ ...s, alertLogin: v }))}
                    />
                    <Toggle
                      label="Gestión de sesiones"
                      desc="Permite ver/cerrar sesiones activas."
                      value={security.sesiones}
                      onChange={(v) => setSecurity((s) => ({ ...s, sesiones: v }))}
                    />

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                      <div>
                        <div className="text-white/90 font-semibold text-sm flex items-center gap-2">
                          <KeyRound className="w-4 h-4 text-[#ffd166]" />
                          Cambiar contraseña
                        </div>
                        <div className="text-xs text-white/60 mt-1">
                          Se implementa con endpoint de backend.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast("🔐 Próximamente: cambio de contraseña.")}
                        className="rounded-xl bg-white/10 hover:bg-white/15 transition px-4 py-2 text-xs text-white/85"
                      >
                        Abrir
                      </button>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard
                  title="Notificaciones"
                  subtitle="Controla lo que recibes"
                  icon={<Bell className="w-5 h-5" />}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Toggle
                      label="Email"
                      desc="Resumen y alertas importantes."
                      value={notifications.email}
                      onChange={(v) => setNotifications((n) => ({ ...n, email: v }))}
                    />
                    <Toggle
                      label="Push"
                      desc="Alertas en la app."
                      value={notifications.push}
                      onChange={(v) => setNotifications((n) => ({ ...n, push: v }))}
                    />
                    <Toggle
                      label="Mensajes"
                      desc="Mensajes de socios/contactos."
                      value={notifications.mensajes}
                      onChange={(v) => setNotifications((n) => ({ ...n, mensajes: v }))}
                    />
                    <Toggle
                      label="Comercio"
                      desc="Cotizaciones, solicitudes y pedidos."
                      value={notifications.comercio}
                      onChange={(v) => setNotifications((n) => ({ ...n, comercio: v }))}
                    />
                    <Toggle
                      label="Recompensas"
                      desc="Beneficios y promociones."
                      value={notifications.recompensas}
                      onChange={(v) => setNotifications((n) => ({ ...n, recompensas: v }))}
                    />
                  </div>
                </GlassCard>
              </div>

              {/* Col derecha */}
              <div className="lg:col-span-5 space-y-5">
                <GlassCard
                  title="Apariencia"
                  subtitle="Tema, acento y densidad"
                  icon={<Palette className="w-5 h-5" />}
                >
                  <div className="grid grid-cols-1 gap-4">
                    <Segmented
                      label="Tema"
                      value={appearance.theme}
                      options={[
                        { value: "dark", label: "Oscuro", icon: <Moon className="w-4 h-4" /> },
                        { value: "light", label: "Claro", icon: <Sun className="w-4 h-4" /> },
                      ]}
                      onChange={(v) => setAppearance((a) => ({ ...a, theme: v }))}
                    />

                    <Select
                      label="Acento"
                      value={appearance.accent}
                      options={[
                        { value: "gold", label: "Dorado (Ecosysval)" },
                        { value: "blue", label: "Azul" },
                        { value: "emerald", label: "Esmeralda" },
                      ]}
                      onChange={(v) => setAppearance((a) => ({ ...a, accent: v }))}
                    />

                    <Select
                      label="Densidad"
                      value={appearance.density}
                      options={[
                        { value: "compact", label: "Compacto" },
                        { value: "comfortable", label: "Cómodo" },
                      ]}
                      onChange={(v) => setAppearance((a) => ({ ...a, density: v }))}
                    />

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
                      Tip: cuando conectemos esto al backend, puedes aplicar el tema global con clases en
                      <span className="text-white/90 font-semibold"> body </span>
                      o usando un contexto.
                    </div>
                  </div>
                </GlassCard>

                <GlassCard
                  title="Región e idioma"
                  subtitle="Preparado para MX, USA y Canadá"
                  icon={<Globe className="w-5 h-5" />}
                >
                  <div className="grid grid-cols-1 gap-4">
                    <Select
                      label="Idioma"
                      value={region.idioma}
                      options={[
                        { value: "es", label: "Español" },
                        { value: "en", label: "English" },
                        { value: "fr", label: "Français" },
                      ]}
                      onChange={(v) => setRegion((r) => ({ ...r, idioma: v }))}
                    />

                    <Select
                      label="País"
                      value={region.pais}
                      options={[
                        { value: "MX", label: "México" },
                        { value: "US", label: "Estados Unidos" },
                        { value: "CA", label: "Canadá" },
                      ]}
                      onChange={(v) => setRegion((r) => ({ ...r, pais: v }))}
                    />

                    <Select
                      label="Zona horaria"
                      value={region.zona}
                      options={[
                        { value: "America/Mexico_City", label: "America/Mexico_City" },
                        { value: "America/New_York", label: "America/New_York" },
                        { value: "America/Los_Angeles", label: "America/Los_Angeles" },
                        { value: "America/Toronto", label: "America/Toronto" },
                        { value: "America/Vancouver", label: "America/Vancouver" },
                      ]}
                      onChange={(v) => setRegion((r) => ({ ...r, zona: v }))}
                    />

                    <Select
                      label="Moneda"
                      value={region.moneda}
                      options={[
                        { value: "MXN", label: "MXN — Peso mexicano" },
                        { value: "USD", label: "USD — US Dollar" },
                        { value: "CAD", label: "CAD — Canadian Dollar" },
                      ]}
                      onChange={(v) => setRegion((r) => ({ ...r, moneda: v }))}
                    />
                  </div>
                </GlassCard>

                <GlassCard
                  title="Integraciones"
                  subtitle="Conecta tu operación"
                  icon={<Link2 className="w-5 h-5" />}
                >
                  <div className="grid grid-cols-1 gap-3">
                    <Toggle
                      label="QuickBooks"
                      desc="Sincroniza contabilidad (ideal para USA/CA)."
                      value={integrations.quickbooks}
                      onChange={(v) => setIntegrations((i) => ({ ...i, quickbooks: v }))}
                    />
                    <Toggle
                      label="Stripe"
                      desc="Cobros internacionales (checkout)."
                      value={integrations.stripe}
                      onChange={(v) => setIntegrations((i) => ({ ...i, stripe: v }))}
                    />
                    <Toggle
                      label="PayPal"
                      desc="Pagos B2B y marketplace."
                      value={integrations.paypal}
                      onChange={(v) => setIntegrations((i) => ({ ...i, paypal: v }))}
                    />
                    <Toggle
                      label="Shopify"
                      desc="Conecta catálogo e inventario."
                      value={integrations.shopify}
                      onChange={(v) => setIntegrations((i) => ({ ...i, shopify: v }))}
                    />
                  </div>
                </GlassCard>

                <GlassCard title="Zona de riesgo" subtitle="Acciones avanzadas" icon={<Trash2 className="w-5 h-5" />}>
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                    <div className="text-white/90 font-semibold text-sm">
                      Reiniciar ajustes locales
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      Solo afecta la configuración guardada en este navegador (no borra tu cuenta).
                    </div>
                    <button
                      type="button"
                      onClick={handleDangerReset}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-red-500/20 hover:bg-red-500/25 transition px-4 py-2 text-xs text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                      Reiniciar
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-white/90 font-semibold text-sm">
                      Cerrar cuenta (Próximamente)
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      Esta acción se habilita con validación y soporte.
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast("⛔ Próximamente: cierre de cuenta.")}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 transition px-4 py-2 text-xs text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                      Solicitar
                    </button>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[9999] rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl px-4 py-3 text-white shadow-2xl">
          <div className="text-sm">{toast}</div>
        </div>
      )}
    </div>
  );
}

/* ---------------- UI Components ---------------- */

function GlassCard({ title, subtitle, icon, children }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/65 backdrop-blur-xl shadow-xl p-5 md:p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white/85">
              {icon}
            </div>
            <div>
              <h2 className="text-white font-bold">{title}</h2>
              <p className="text-white/55 text-xs mt-0.5">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-white/70 mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 outline-none focus:ring-2 focus:ring-yellow-300/40 focus:border-yellow-300/30 transition"
      />
    </label>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-white/70 mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/90 outline-none focus:ring-2 focus:ring-yellow-300/40 focus:border-yellow-300/30 transition"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#0b1630]">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Toggle({ label, desc, value, onChange }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="text-white/90 font-semibold text-sm">{label}</div>
        <div className="text-white/55 text-xs mt-1">{desc}</div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!value)}
        className={[
          "relative inline-flex h-7 w-12 items-center rounded-full transition",
          value ? "bg-[#ffd166]" : "bg-white/15",
        ].join(" ")}
        aria-pressed={value}
      >
        <span
          className={[
            "inline-block h-5 w-5 transform rounded-full bg-[#071a33] transition",
            value ? "translate-x-6" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

function Segmented({ label, value, options, onChange }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs font-semibold text-white/70 mb-2">{label}</div>
      <div className="flex gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={[
                "flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm transition border",
                active
                  ? "bg-white/10 border-white/15 text-white"
                  : "bg-transparent border-white/10 text-white/70 hover:bg-white/8 hover:text-white",
              ].join(" ")}
            >
              {o.icon}
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
