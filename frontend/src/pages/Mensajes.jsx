// src/pages/Mensajes.jsx
import React, { useMemo, useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";
import { mensajesMock } from "../data/mensajesMock";
import { Search, Mail, MailOpen, ArrowLeft, X } from "lucide-react";

export default function Mensajes() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);

  const mensajes = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return mensajesMock;

    return mensajesMock.filter((m) => {
      const a = (m.asunto || "").toLowerCase();
      const r = (m.remitente || "").toLowerCase();
      const p = (m.preview || "").toLowerCase();
      return a.includes(term) || r.includes(term) || p.includes(term);
    });
  }, [q]);

  const unreadCount = useMemo(
    () => (mensajesMock || []).filter((m) => !m.leido).length,
    []
  );

  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader title="ECOSYSVAL" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white shadow-lg hidden md:block">
          <SidebarMenu />
        </aside>

        {/* Contenido */}
        <main className="flex-1 relative overflow-hidden">
          {/* Fondo (igual que venimos trabajando) */}
          <div
            className="absolute inset-0 -z-40 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/fondo.png')" }}
          />
          <div className="absolute inset-0 -z-30 bg-gradient-to-br from-black/70 via-black/35 to-black/70" />
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,rgba(255,209,102,0.16),transparent_60%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(36,70,139,0.24),transparent_55%)]" />

          <div className="mx-auto w-full max-w-7xl px-6 py-10">
            {/* Header de página */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#ffd166]" />
                  Bandeja de entrada
                </div>

                <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-white drop-shadow">
                  Mensajes{" "}
                  <span className="text-[#ffd166]">de socios y contactos</span>
                </h1>

                <p className="mt-2 text-sm text-white/75 max-w-2xl">
                  Revisa, filtra y gestiona conversaciones dentro del ecosistema.
                </p>

                <div className="mt-4 h-1 w-56 rounded bg-[#ffd166]" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/90 backdrop-blur">
                  No leídos:{" "}
                  <strong className="text-white">{unreadCount}</strong>
                </span>
              </div>
            </div>

            {/* Grid: lista + detalle */}
            <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
              {/* LISTA */}
              <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-white/10">
                  <div className="relative">
                    <Search className="w-4 h-4 text-white/50 absolute left-3 top-3" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Buscar mensajes..."
                      className="w-full rounded-2xl border border-white/10 bg-black/20 pl-9 pr-3 py-2.5 text-sm text-white/90 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#ffd166]/40"
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip text="Todos" active />
                    <Chip text="No leídos" />
                    <Chip text="Socios" />
                    <Chip text="Proveedores" />
                  </div>
                </div>

                <div className="max-h-[650px] overflow-y-auto">
                  {mensajes.length === 0 ? (
                    <div className="p-10 text-center text-white/70">
                      <div className="mx-auto mb-3 h-12 w-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white/70" />
                      </div>
                      No hay mensajes que coincidan con tu búsqueda.
                    </div>
                  ) : (
                    mensajes.map((msg, idx) => {
                      const isSelected = selected?.id === msg.id;
                      const unread = !msg.leido;

                      return (
                        <button
                          key={msg.id}
                          type="button"
                          onClick={() => setSelected(msg)}
                          className={[
                            "w-full text-left px-5 py-4 flex gap-4 transition",
                            idx !== mensajes.length - 1 ? "border-b border-white/10" : "",
                            unread ? "bg-white/5" : "bg-transparent",
                            isSelected ? "bg-[#ffd166]/10" : "hover:bg-white/5",
                          ].join(" ")}
                        >
                          <div className="mt-0.5">
                            <div
                              className={[
                                "h-10 w-10 rounded-2xl border flex items-center justify-center",
                                unread
                                  ? "border-[#ffd166]/30 bg-[#ffd166]/10"
                                  : "border-white/10 bg-white/5",
                              ].join(" ")}
                            >
                              {unread ? (
                                <Mail className="w-5 h-5 text-[#ffd166]" />
                              ) : (
                                <MailOpen className="w-5 h-5 text-white/70" />
                              )}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm font-extrabold text-white truncate">
                                {msg.remitente}
                              </p>
                              <p className="text-[11px] text-white/50 shrink-0">
                                {msg.tiempo}
                              </p>
                            </div>

                            <p className="mt-1 text-xs font-semibold text-[#ffd166] truncate">
                              {msg.asunto}
                            </p>

                            <p className="mt-1 text-xs text-white/70 line-clamp-2">
                              {msg.preview}
                            </p>

                            <div className="mt-2 flex items-center gap-2">
                              {unread && (
                                <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-200">
                                  Nuevo
                                </span>
                              )}
                              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/60">
                                Conversación
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </section>

              {/* DETALLE */}
              <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white/70" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-white">
                        Detalle del mensaje
                      </div>
                      <div className="text-xs text-white/60">
                        Selecciona un mensaje para ver el contenido.
                      </div>
                    </div>
                  </div>

                  {selected && (
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="h-9 w-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80"
                      title="Cerrar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {!selected ? (
                  <div className="p-10 text-center text-white/70">
                    <div className="mx-auto mb-4 h-14 w-14 rounded-3xl border border-white/10 bg-white/5 flex items-center justify-center">
                      <MailOpen className="w-7 h-7 text-white/70" />
                    </div>
                    <p className="text-white/85 font-semibold">
                      Aún no has seleccionado un mensaje
                    </p>
                    <p className="text-sm text-white/60 mt-2 max-w-md mx-auto">
                      Usa la lista de la izquierda para abrir una conversación y revisar
                      la información.
                    </p>
                  </div>
                ) : (
                  <div className="p-6">
                    {/* Header del mensaje */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-xs text-white/60">Remitente</div>
                        <div className="text-lg font-extrabold text-white">
                          {selected.remitente}
                        </div>

                        <div className="mt-2 text-xs text-white/60">Asunto</div>
                        <div className="text-sm font-semibold text-[#ffd166]">
                          {selected.asunto}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                          {selected.tiempo}
                        </span>
                        {!selected.leido && (
                          <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                            Nuevo
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cuerpo */}
                    <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                      <div className="text-xs font-semibold text-white/70 mb-2">
                        Mensaje
                      </div>
                      <p className="text-sm text-white/85 whitespace-pre-wrap leading-relaxed">
                        {/* Si luego agregas msg.body lo muestras aquí.
                            Por ahora usamos preview como contenido */}
                        {selected.preview}
                      </p>
                    </div>

                    {/* Acciones (placeholder) */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() => setSelected(null)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                      </button>

                      <button
                        type="button"
                        onClick={() => alert("Luego conectamos respuesta real 😉")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffd166] px-5 py-2 text-sm font-extrabold text-slate-900 shadow hover:brightness-95 transition"
                      >
                        Responder
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Chip({ text, active = false }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold",
        active
          ? "border-[#ffd166]/30 bg-[#ffd166]/15 text-[#ffd166]"
          : "border-white/10 bg-white/5 text-white/70",
      ].join(" ")}
    >
      {text}
    </span>
  );
}
