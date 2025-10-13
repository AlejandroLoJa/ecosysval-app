import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Inicio", route: "/", icon: "/icons/inicio.png" },
  { label: "Mis Publicaciones", route: "/profile", icon: "/icons/mis publicaciones.png" },
  { label: "Perfil Empresarial", route: "/perfil", icon: "/icons/Mi perfil.png" },
  { label: "Grupos Empresariales", route: "/grupos", icon: "/icons/Grupos empresariales.png" },
  { label: "Ofertas de Empleo", route: "/empleos", icon: "/icons/Oferta de empleo.png" },
  { label: "Recomendaciones", route: "/recomendaciones", icon: "/icons/recomendaciones.png" },
  { label: "Blogs y Artículos", route: "/blogs", icon: "/icons/Blogs y artículos.png" },
  { label: "Herramientas Financieras", route: "/finanzas", icon: "/icons/Herramientas financieras.png" },
  { label: "E-commerce", route: "/ecommerce", icon: "/icons/E-comerce.png" },
  { label: "Buzón Oportunidades", route: "/oportunidades", icon: "/icons/Buzón de oportunidades.png" },
  { label: "Alianzas y Colaboraciones", route: "/alianzas", icon: "/icons/Alianzas y colaboraciones.png" },
  { label: "Tendencias de Mercado", route: "/tendencias", icon: "/icons/Tendencias de mercado.png" },
  { label: "Favoritos", route: "/favoritos", icon: "/icons/favoritos.png" },
  { label: "Contactos", route: "/contactos", icon: "/icons/contactos.png" },
  { label: "Foros", route: "/foros", icon: "/icons/foros.png" },
  { label: "Capacitación-Cursos", route: "/cursos", icon: "/icons/Cursos y certificaciones.png" },
  { label: "Top Mundial", route: "/top", icon: "/icons/Top mundial.png" },
  { label: "Ajustes", route: "/ajustes", icon: "/icons/ajustes.png" },
  { label: "Mapa", route: "/mapa", icon: "/icons/mapa.png" },
  { label: "Mensajes", route: "/mensajes", icon: "/icons/mensajes.png" },
];

export default function SidebarMenu({ onItemClick }) {
  return (
    <aside className="relative w-64 bg-blue-900 text-white flex flex-col py-6 px-3 shadow-xl overflow-y-auto">
      <nav className="space-y-1 relative z-10">
        {menuItems.map(({ label, route, icon }) => (
          <NavLink
            key={label}
            to={route}
            title={label}
            onClick={() => onItemClick?.(label)}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 w-full px-3 py-2 rounded-md transition-all duration-200",
                isActive
                  ? "bg-white text-blue-900 font-semibold"
                  : "bg-transparent text-white hover:bg-white hover:text-blue-900",
              ].join(" ")
            }
          >
            <img
              src={icon}
              alt={label}
              className="w-6 h-6 object-contain transition-transform duration-200 group-hover:scale-110"
            />
            <span className="text-sm">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Imagen decorativa al final */}
      <div
        className="absolute bottom-[-30px] w-full h-40 pointer-events-none"
        style={{
          backgroundImage: "url('/sidebar-pattern.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          backgroundSize: "150px",
          opacity: 0.2,
        }}
      ></div>
    </aside>
  );
}
