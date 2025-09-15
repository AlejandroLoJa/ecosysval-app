import React, { useEffect, useState, useRef } from "react";
import { Bell, MessageSquare, UserCircle, LogOut, ChevronDown, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from '../components/SidebarMenu';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
        const storedPic = localStorage.getItem("profilePic");
        if (storedPic) setProfilePic(storedPic);
    }, []);

    useEffect(() => {
        const handleOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    const handleProfilePicUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            setProfilePic(base64);
            localStorage.setItem("profilePic", base64);
        };
        reader.readAsDataURL(file);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("profilePic");
        setMenuOpen(false);
        try {
            navigate("/login");
            setTimeout(() => window.location.reload(), 100);
        } catch {
            window.location.href = "/login";
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
        <div>
           
            <SidebarMenu />
            <div className="min-h-screen bg-gray-100 pl-64">
                {/* Header */}
                <header className="bg-blue-900 text-white flex items-center justify-between px-6 py-3 shadow-lg relative">
                    <div className="font-bold text-xl">OMEC</div>
                    <div className="flex-1 mx-6">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full px-4 py-2 rounded-full text-black focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-4 relative" ref={menuRef}>
                        <MessageSquare className="w-6 h-6 cursor-pointer hover:text-yellow-400" />
                        <Bell className="w-6 h-6 cursor-pointer hover:text-yellow-400" />
                        <div
                            className="flex items-center gap-2 cursor-pointer select-none"
                            onClick={() => setMenuOpen((s) => !s)}
                        >
                            {profilePic ? (
                                <img src={profilePic} alt="avatar" className="w-8 h-8 rounded-full border" />
                            ) : (
                                <UserCircle className="w-8 h-8 text-gray-300" />
                            )}
                            <span className="font-semibold">{user.name}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
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

                {/* Banner y perfil */}
                <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }}>
                    <div className="absolute bottom-4 left-6 flex items-center gap-4">
                        <div className="relative">
                            {profilePic ? (
                                <img src={profilePic} alt="avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
                            ) : (
                                <UserCircle className="w-24 h-24 text-white bg-gray-700 rounded-full border-4 border-white shadow-lg" />
                            )}
                            {/* Botón subir foto con ícono cámara */}
                            <label
                                className="absolute bottom-0 right-0 bg-blue-700 cursor-pointer rounded-full p-2 shadow-md"
                                title="Cambiar foto"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleProfilePicUpload}
                                />
                                <Camera className="w-5 h-5 text-white" />
                            </label>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray">{user.name}</h1>
                            <p className="text-sm text-gray-700">Innovador y apasionado por la tecnología.</p>
                        </div>
                    </div>
                </div>

                <main className="flex flex-1 gap-6 p-6">
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
                            <p className="text-gray-700 mb-2">Aquí aparecerán tus publicaciones recientes 🚀</p>
                        </div>
                    </div>
                    <aside className="w-80 space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-bold text-lg mb-2">Información</h3>
                            <ul className="text-gray-700 space-y-1">
                                <li>📩 Mensajes: 2</li>
                                <li>📝 Publicaciones: 1</li>
                                <li>👥 Amigos: 19</li>
                                <li>🌐 Web: www.web.com</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-bold text-lg mb-2">Membresía</h3>
                            <img src="/membresia.png" alt="Membresía" className="w-full" />
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
}
