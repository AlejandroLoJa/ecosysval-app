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
  { label: "Mis Publicaciones", route: "/profile", icon: Newspaper },
  { label: "Perfil Empresarial", route: "/perfil", icon: User },
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
  { label: "Ajustes", route: "/ajustes", icon: Settings },
  { label: "Mapa", route: "/mapa", icon: Map },
];

export default function SidebarMenu({ onItemClick }) {
  return (
    <aside className="relative w-64 bg-blue-900 text-white h-screen flex flex-col shadow-xl">
      {/* Contenedor con scroll automático */}
      <div className="flex-1 overflow-y-auto relative z-10 px-3 py-6">
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
                  isActive
                    ? "bg-white text-blue-900 font-semibold"
                    : "bg-transparent text-white hover:bg-white hover:text-blue-900",
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
      </div>

      {/* Imagen decorativa al fondo */}
      <div
        className="absolute bottom-0 w-full h-32 pointer-events-none select-none"
        style={{
          backgroundImage: "url('sidebar-pattern.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          backgroundSize: "220px",
          opacity: 0.2,
        }}
      ></div>
    </aside>
  );
}
