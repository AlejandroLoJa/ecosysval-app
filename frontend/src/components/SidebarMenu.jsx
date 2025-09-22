import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  User,
  Building2,
  Briefcase,
  ThumbsUp,
  FileText,
  Calculator,
  ShoppingCart,
  Inbox,
  Handshake,
  TrendingUp,
  Star,
  Contact,
  MessageSquare,
  GraduationCap,
  Trophy,
  Newspaper,
  Settings,
  Map,
} from "lucide-react";

const menuItems = [
  { label: "Inicio", route: "/", icon: Home },
  { label: "Mi Perfil", route: "/perfil", icon: User },
  { label: "Grupos Empresariales", route: "/grupos", icon: Building2 },
  { label: "Ofertas de Empleo", route: "/empleos", icon: Briefcase },
  { label: "Recomendaciones", route: "/recomendaciones", icon: ThumbsUp },
  { label: "Blogs y Artículos", route: "/blogs", icon: FileText },
  { label: "Herramientas financieras", route: "/finanzas", icon: Calculator },
  { label: "E-commerce", route: "/ecommerce", icon: ShoppingCart },
  { label: "Buzón Oportunidades", route: "/oportunidades", icon: Inbox },
  { label: "Alianzas y Colaboraciones", route: "/alianzas", icon: Handshake },
  { label: "Tendencias de Mercado", route: "/tendencias", icon: TrendingUp },
  { label: "Favoritos", route: "/favoritos", icon: Star },
  { label: "Contactos", route: "/contactos", icon: Contact },
  { label: "Foros", route: "/foros", icon: MessageSquare },
  { label: "Capacitación-Cursos", route: "/cursos", icon: GraduationCap },
  { label: "Top Mundial", route: "/top", icon: Trophy },
  { label: "Mis Publicaciones", route: "/publicaciones", icon: Newspaper },
  { label: "Ajustes", route: "/ajustes", icon: Settings },
  { label: "Mapa", route: "/mapa", icon: Map },
];

export default function SidebarMenu({ onItemClick }) {
  return (
    <aside className="w-64 bg-blue-900 text-white min-h-[calc(100vh-12rem)] flex flex-col py-6 px-3 overflow-y-auto shadow-xl">
      <nav className="space-y-1">
        {menuItems.map(({ label, route, icon: Icon }) => (
          <NavLink
            key={label}
            to={route}
            title={label}
            onClick={() => onItemClick?.(label)}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 w-full px-3 py-2 rounded-md transition-all duration-200 text-left leading-tight group",
                // Fondo siempre azul por defecto
                isActive
                  ? "bg-white text-blue-900 font-semibold" // Activo: fondo blanco, texto azul
                  : "bg-transparent text-white hover:bg-white hover:text-blue-900", // Hover: fondo blanco, texto azul
              ].join(" ")
            }
          >
            <Icon
              className="w-5 h-5 shrink-0 transition-colors duration-200 
              group-hover:text-blue-900 
              group-[.active]:text-blue-900 text-yellow-300"
            />
            <span className="break-words">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
