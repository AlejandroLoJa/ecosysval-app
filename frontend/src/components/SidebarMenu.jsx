import React from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Inicio", route: "/" },
  { label: "Mi Perfil", route: "/perfil" },
  { label: "Grupos Empresariales", route: "/grupos" },
  { label: "Ofertas de Empleo", route: "/empleos" },
  { label: "Recomendaciones", route: "/recomendaciones" },
  { label: "Blogs y Artículos", route: "/blogs" },
  { label: "Herramientas financieras", route: "/finanzas" },
  { label: "E-commerce", route: "/ecommerce" },
  { label: "Buzón Oportunidades", route: "/oportunidades" },
  { label: "Alianzas y Colaboraciones", route: "/alianzas" },
  { label: "Tendencias de Mercado", route: "/tendencias" },
  { label: "Favoritos", route: "/favoritos" },
  { label: "Contactos", route: "/contactos" },
  { label: "Foros", route: "/foros" },
  { label: "Capacitación-Cursos", route: "/cursos" },
  { label: "Top Mundial", route: "/top" },
  { label: "Mis Publicaciones", route: "/publicaciones" },
  { label: "Ajustes", route: "/ajustes" },
  { label: "Mapa", route: "/mapa" },
];

export default function SidebarMenu({ onItemClick }) {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-blue-900 text-white h-screen fixed left-0 top-0 flex flex-col py-6 px-3 overflow-y-auto shadow-lg">
      <nav className="space-y-2">
        {menuItems.map(({ label, route }) => (
          <button
            key={label}
            className="flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-blue-700 transition text-left focus:outline-none font-medium"
            onClick={() => {
              if (onItemClick) {
                onItemClick(label);
              }
              navigate(route);
            }}
          >
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
