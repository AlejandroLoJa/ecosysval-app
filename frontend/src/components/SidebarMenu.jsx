import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Inicio", route: "/inicio", icon: "/icons/inicio.png" },
  { label: "Mis Publicaciones", route: "/profile", icon: "/icons/mis publicaciones.png" },
  { label: "Perfil Empresarial", route: "/perfil", icon: "/icons/Mi perfil.png" },
  { label: "Grupos Empresariales", route: "/grupos", icon: "/icons/Grupos empresariales.png" },
  { label: "Ofertas de Empleo", route: "/empleos", icon: "/icons/Oferta de empleo.png" },

  { type: "divider", label: "Crecimiento" },

  { label: "Blogs y Artículos", route: "/blogs", icon: "/icons/Blogs y artículos.png" },
  { label: "Capacitación-Cursos", route: "/cursos", icon: "/icons/Cursos y certificaciones.png" },
  { label: "Recompensas", route: "/recompensas", icon: "/icons/recompensas.png" },
  { label: "Top Mundial", route: "/top-mundial", icon: "/icons/Top mundial.png" },

  { type: "divider", label: "Negocio" },

  { label: "Herramientas Financieras", route: "/finanzas", icon: "/icons/Herramientas financieras.png" },
  { label: "E-commerce", route: "/ecommerce", icon: "/icons/E-comerce.png" },
  { label: "Buzón Oportunidades", route: "/oportunidades", icon: "/icons/Buzón de oportunidades.png" },
  { label: "Alianzas y Colaboraciones", route: "/alianzas", icon: "/icons/Alianzas y colaboraciones.png" },
  { label: "Tendencias de Mercado", route: "/tendencias", icon: "/icons/Tendencias de mercado.png" },

  { type: "divider", label: "Red" },

  { label: "Recomendaciones", route: "/recomendaciones", icon: "/icons/recomendaciones.png" },
  { label: "Favoritos", route: "/favoritos", icon: "/icons/favoritos.png" },
  { label: "Contactos", route: "/contactos", icon: "/icons/contactos.png" },
  { label: "Eventos", route: "/eventos", icon: "/icons/foros.png" },
  { label: "Mensajes", route: "/mensajes", icon: "/icons/mensajes.png" },

  { type: "divider", label: "Sistema" },

  { label: "Posición en el sistema", route: "/mapa", icon: "/icons/mapa.png" },
  { label: "Ajustes", route: "/ajustes", icon: "/icons/ajustes.png" },
];

export default function SidebarMenu({ onItemClick }) {
  return (
    <aside className="relative w-64 h-full text-white overflow-hidden">
      {/* Fondo premium (gradiente + glass) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071326] via-[#071a33] to-[#050b18]" />
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />

      {/* Brillo decorativo */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />

      {/* Contenido */}
      <div className="relative flex flex-col h-full py-6 px-3">
        {/* Logo/Marca arriba (opcional, puedes quitarlo si ya está en MainHeader) */}
        <div className="px-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-yellow-400/15 border border-yellow-300/20 flex items-center justify-center">
              <span className="text-yellow-200 font-black">E</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-wide">ECOSYSVAL</div>
              <div className="text-[11px] text-white/60">Ecosistema empresarial</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto pr-1 space-y-1">
          {menuItems.map((item, idx) => {
            if (item.type === "divider") {
              return (
                <div key={`div-${idx}`} className="pt-3 pb-1 px-2">
                  <div className="text-[11px] uppercase tracking-widest text-white/50">
                    {item.label}
                  </div>
                  <div className="mt-2 h-px bg-white/10" />
                </div>
              );
            }

            const { label, route, icon } = item;

            return (
              <NavLink
                key={label}
                to={route}
                title={label}
                onClick={() => onItemClick?.(label)}
                className={({ isActive }) =>
                  [
                    "group relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all",
                    "hover:bg-white/8",
                    isActive
                      ? "bg-white/10 ring-1 ring-white/10"
                      : "bg-transparent",
                  ].join(" ")
                }
              >
                {/* Indicador lateral (activo) */}
                <span
                  className={({ isActive }) =>
                    [
                      "absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-full transition-all",
                      isActive ? "bg-yellow-300" : "bg-transparent",
                    ].join(" ")
                  }
                />

                {/* Icon */}
                <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition">
                  <img src={icon} alt={label} className="w-5 h-5 object-contain opacity-90" />
                </div>

                {/* Texto */}
                <span className="text-sm text-white/85 group-hover:text-white transition">
                  {label}
                </span>

                {/* Punto acento cuando activo */}
                <span
                  className={({ isActive }) =>
                    [
                      "ml-auto h-2 w-2 rounded-full transition",
                      isActive ? "bg-yellow-300" : "bg-white/10 group-hover:bg-white/20",
                    ].join(" ")
                  }
                />
              </NavLink>
            );
          })}
        </nav>

        {/* Decoración inferior */}
        <div className="mt-4 px-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/70">Tip</div>
            <div className="text-[12px] text-white/85 mt-1">
              Publica ofertas y conecta con empresas en minutos.
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-[-30px] left-0 w-full h-40 pointer-events-none"
          style={{
            backgroundImage: "url('/sidebar-pattern.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
            backgroundSize: "150px",
            opacity: 0.12,
          }}
        />
      </div>
    </aside>
  );
}
