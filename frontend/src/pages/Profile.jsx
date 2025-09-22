import React, { useEffect, useState, useRef } from "react";
import {
    Bell,
    MessageSquare,
    UserCircle,
    LogOut,
    ChevronDown,
    Camera,
    Image as ImageIcon,
    Video,
    BarChart3,
    Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [profileBanner, setProfileBanner] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const API_URL = "http://localhost:3000";

    // ===============================
    // Cargar datos del usuario
    // ===============================
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const isLoggedIn = !!storedUser;
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            // Cargar imágenes desde el backend
            fetch(`${API_URL}/users/${parsedUser.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setProfilePic(data.profile_image ? `${API_URL}${data.profile_image}` : null);
                    setProfileBanner(data.banner_image ? `${API_URL}${data.banner_image}` : null);
                })
                .catch((err) => console.error("Error al cargar datos:", err));
        }
    }, []);

    // ===============================
    // Cerrar sesión
    // ===============================
    const handleLogout = () => {
        localStorage.clear();
        setMenuOpen(false);
        navigate("/login");
        setTimeout(() => window.location.reload(), 100);
    };

    // ===============================
    // Subir imagen de perfil
    // ===============================
    const handleProfilePicUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${API_URL}/users/${user.id}/profile-image`, {
                method: "PATCH",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setProfilePic(`${API_URL}${data.user.profile_image}`);
            } else {
                console.error("Error en el servidor:", data.message);
            }
        } catch (error) {
            console.error("Error al subir imagen de perfil:", error);
        }
    };

    // ===============================
    // Subir imagen de banner
    // ===============================
    const handleBannerUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${API_URL}/users/${user.id}/banner-image`, {
                method: "PATCH",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setProfileBanner(`${API_URL}${data.user.banner_image}`);
            } else {
                console.error("Error en el servidor:", data.message);
            }
        } catch (error) {
            console.error("Error al subir imagen de banner:", error);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
                No hay usuario logueado ❌
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-fixed bg-center bg-cover flex flex-col"
            style={{ backgroundImage: "url('/fondo.png')" }}
        >
            {/* ===============================
          HEADER
      =============================== */}
            <header className="bg-blue-900 text-white flex items-center justify-between px-6 py-3 shadow-lg">
                <div className="font-bold text-xl">OMEC</div>

                {/* Barra de búsqueda */}
                <div className="flex-1 mx-6">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full px-4 py-2 rounded-full text-black focus:outline-none"
                    />
                </div>

                {/* Íconos y menú de usuario */}
                <div className="flex items-center gap-4 relative" ref={menuRef}>
                    <MessageSquare className="w-6 h-6 cursor-pointer hover:text-yellow-400" />
                    <Bell className="w-6 h-6 cursor-pointer hover:text-yellow-400" />

                    {/* Menú desplegable */}
                    <div
                        className="flex items-center gap-2 cursor-pointer select-none"
                        onClick={() => setMenuOpen((s) => !s)}
                    >
                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt="avatar"
                                className="w-8 h-8 rounded-full border"
                            />
                        ) : (
                            <UserCircle className="w-8 h-8 text-gray-300" />
                        )}
                        <span className="font-semibold">{user.name}</span>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-180" : ""
                                }`}
                        />
                    </div>

                    {menuOpen && (
                        <div className="absolute right-0 top-12 bg-white text-black shadow-lg rounded-lg w-48 z-50">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded-md"
                            >
                                <LogOut className="w-5 h-5 text-red-500" />
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* ===============================
    BANNER
=============================== */}
            <div className="relative h-64 bg-gray-300 shadow-md">
                {profileBanner ? (
                    <img
                        src={profileBanner}
                        alt="Banner"
                        className="w-full h-64 object-cover rounded-t-lg"
                    />
                ) : (
                    <div className="w-full h-64 bg-gray-400 flex items-center justify-center text-white text-lg">
                        Sin imagen de portada
                    </div>
                )}

                {/* Botón para cambiar banner */}
                <label className="absolute top-3 right-3 bg-blue-700 cursor-pointer rounded-full p-2 shadow-md hover:bg-blue-800 transition-all">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBannerUpload}
                    />
                    <Camera className="w-5 h-5 text-white" />
                </label>
            </div>

            {/* ===INFO PERFIL CON TRANSPARENCIA Y BORDES REDONDEADOS=== */}
            <div className="relative bg-white/5 backdrop-blur-md shadow-md rounded-lg -mt-12 mx-6 p-6 flex items-center gap-6 border border-gray-200">
                {/* Foto de perfil a la izquierda */}
                <div className="relative -mt-16">
                    {profilePic ? (
                        <img
                            src={profilePic}
                            alt="avatar"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                    ) : (
                        <UserCircle className="w-32 h-32 text-gray-400 border-4 border-white rounded-full shadow-lg" />
                    )}

                    {/* Botón cambiar foto */}
                    <label className="absolute bottom-0 right-0 bg-blue-600 cursor-pointer rounded-full p-2 shadow-md hover:bg-blue-700">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePicUpload}
                        />
                        <Camera className="w-4 h-4 text-white" />
                    </label>
                </div>

                {/* Información usuario */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                    <p className="text-gray-700 max-w-2xl">
                        Innovador y apasionado por la tecnología. Con experiencia en
                        desarrollo de soluciones digitales, liderazgo estratégico y
                        transformación digital.
                    </p>
                </div>
            </div>

            {/* ===============================
          BARRA DE ACCIONES
      =============================== */}
            <div className="w-full flex justify-center mt-[-16px] relative z-20">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-lg rounded-full px-6 py-2 flex items-center gap-4">
                    <button className="flex flex-col items-center group" title="Publicar Imagen">
                        <div className="w-10 h-10 flex items-center justify-center border-2 border-blue-900 rounded-md group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                            <ImageIcon className="w-5 h-5 text-blue-900 group-hover:text-white" />
                        </div>
                    </button>

                    <button className="flex flex-col items-center group" title="Publicar Video">
                        <div className="w-10 h-10 flex items-center justify-center border-2 border-blue-900 rounded-md group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                            <Video className="w-5 h-5 text-blue-900 group-hover:text-white" />
                        </div>
                    </button>

                    <button className="flex flex-col items-center group" title="Estadísticas">
                        <div className="w-10 h-10 flex items-center justify-center border-2 border-blue-900 rounded-md group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                            <BarChart3 className="w-5 h-5 text-blue-900 group-hover:text-white" />
                        </div>
                    </button>

                    <button className="flex flex-col items-center group" title="Agregar Publicación">
                        <div className="w-10 h-10 flex items-center justify-center border-2 border-blue-900 rounded-md group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                            <Plus className="w-5 h-5 text-blue-900 group-hover:text-white" />
                        </div>
                    </button>
                </div>
            </div>

            {/* ===============================
          CONTENIDO PRINCIPAL
      =============================== */}
            <div className="flex">
                <SidebarMenu />
                <main className="flex-1 p-6">
                    <div className="flex gap-6">
                        {/* Publicaciones */}
                        <div className="flex-1">
                            <h2 className="text-lg font-bold mb-4">Mis Publicaciones</h2>
                            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    {profilePic ? (
                                        <img src={profilePic} alt="avatar" className="w-8 h-8 rounded-full" />
                                    ) : (
                                        <UserCircle className="w-8 h-8 text-gray-500" />
                                    )}
                                    <span className="font-semibold">{user.name}</span>
                                </div>
                                <p className="text-gray-700 mb-2">
                                    Aquí aparecerán tus publicaciones recientes 🚀
                                </p>
                            </div>
                        </div>

                        {/* Lado derecho */}
                        <aside className="w-80 space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
                                <h3 className="font-bold text-xl mb-3 text-blue-900">Información</h3>
                                <ul className="text-gray-700 space-y-2">
                                    <li>📩 <span className="font-semibold">Mensajes:</span> 2</li>
                                    <li>📝 <span className="font-semibold">Publicaciones:</span> 1</li>
                                    <li>👥 <span className="font-semibold">Amigos:</span> 19</li>
                                    <li>🌐 <span className="font-semibold">Web:</span> www.web.com</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200 max-w-sm mx-auto">
                                <h3 className="font-bold text-xl mb-3 text-blue-900 text-center">Membresía</h3>
                                <div className="flex justify-center">
                                    <img
                                        src="/Platino.png"
                                        alt="Membresía"
                                        className="w-32 h-40 object-contain rounded-lg shadow-sm"
                                    />
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </div>
    );
}
