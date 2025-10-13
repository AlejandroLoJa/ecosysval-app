import React, { useEffect, useState, useRef } from "react";
import {
    Bell,
    MessageSquare,
    UserCircle,
    LogOut,
    ChevronDown,
    Camera,
    Edit,
    Trash2,
    X,
    Image as ImageIcon,
    Video,
    Send
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

    // Estados de publicaciones
    const [publicaciones, setPublicaciones] = useState([]);
    const [nuevoTexto, setNuevoTexto] = useState("");
    const [imagenFile, setImagenFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [subiendo, setSubiendo] = useState(false);

    // Estados para edición
    const [editandoId, setEditandoId] = useState(null);
    const [textoEditado, setTextoEditado] = useState("");

    const API_URL = "http://localhost:3000";

    // ===============================
    // Cargar datos del usuario y sus publicaciones
    // ===============================
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            cargarUsuarioYPublicaciones(parsedUser.id);
        }
    }, []);

    const cargarUsuarioYPublicaciones = async (idUsuario) => {
        try {
            // Cargar datos del usuario
            const resUser = await fetch(`${API_URL}/users/${idUsuario}`);
            const dataUser = await resUser.json();
            setProfilePic(dataUser.profile_image ? `${API_URL}${dataUser.profile_image}` : null);
            setProfileBanner(dataUser.banner_image ? `${API_URL}${dataUser.banner_image}` : null);

            // Cargar publicaciones del usuario
            const resPosts = await fetch(`${API_URL}/posts/user/${idUsuario}`);
            const dataPosts = await resPosts.json();
            setPublicaciones(dataPosts);
        } catch (error) {
            console.error("Error al cargar datos del perfil:", error);
        }
    };

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
            if (data.success) setProfilePic(`${API_URL}${data.user.profile_image}`);
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
            if (data.success) setProfileBanner(`${API_URL}${data.user.banner_image}`);
        } catch (error) {
            console.error("Error al subir imagen de banner:", error);
        }
    };

    // ===============================
    // Publicar nueva publicación
    // ===============================
    const publicar = async () => {
        if (!nuevoTexto && !imagenFile && !videoFile) {
            alert("Por favor, agrega texto, imagen o video para publicar");
            return;
        }

        setSubiendo(true);

        const formData = new FormData();
        formData.append("userId", user.id.toString());
        formData.append("content", nuevoTexto);

        // Agregar archivos
        if (imagenFile) {
            formData.append("files", imagenFile);
        }
        if (videoFile) {
            formData.append("files", videoFile);
        }

        try {
            console.log("Enviando publicación...");

            const res = await fetch(`${API_URL}/posts`, {
                method: "POST",
                body: formData,
            });

            const responseData = await res.json();
            console.log("Respuesta del servidor:", responseData);

            if (res.ok) {
                // Limpiar formulario
                setNuevoTexto("");
                setImagenFile(null);
                setVideoFile(null);
                setImagenPreview(null);
                setVideoPreview(null);

                // Recargar publicaciones
                await cargarUsuarioYPublicaciones(user.id);
                alert("¡Publicación creada exitosamente!");
            } else {
                console.error("Error al crear publicación:", responseData);
                alert("Error al crear publicación: " + (responseData.message || "Error desconocido"));
            }
        } catch (error) {
            console.error("Error al publicar:", error);
            alert("Error de conexión al publicar");
        } finally {
            setSubiendo(false);
        }
    };

    // ===============================
    // Eliminar publicación
    // ===============================
    const eliminarPublicacion = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
            return;
        }

        try {
            const res = await fetch(`${API_URL}/posts/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                await cargarUsuarioYPublicaciones(user.id);
                alert("Publicación eliminada exitosamente");
            } else {
                console.error("Error al eliminar publicación:", res.status);
                alert("Error al eliminar publicación");
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Error de conexión al eliminar");
        }
    };

    // ===============================
    // Editar publicación
    // ===============================
    const iniciarEdicion = (pub) => {
        setEditandoId(pub.id);
        setTextoEditado(pub.content);
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        setTextoEditado("");
    };

    const guardarEdicion = async (id) => {
        if (!textoEditado.trim()) {
            alert("El contenido no puede estar vacío");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/posts/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: textoEditado,
                }),
            });

            if (res.ok) {
                setEditandoId(null);
                setTextoEditado("");
                await cargarUsuarioYPublicaciones(user.id);
                alert("Publicación actualizada exitosamente");
            } else {
                console.error("Error al editar publicación:", res.status);
                alert("Error al editar publicación");
            }
        } catch (error) {
            console.error("Error al editar:", error);
            alert("Error de conexión al editar");
        }
    };

    // ===============================
    // Manejar selección de archivos
    // ===============================
    const handleImagenSeleccionada = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert("Por favor, selecciona un archivo de imagen válido");
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                alert("La imagen es demasiado grande. Máximo 10MB permitido.");
                return;
            }

            setImagenFile(file);
            setVideoFile(null); // Remover video si hay imagen
            setVideoPreview(null);

            // Crear preview
            const reader = new FileReader();
            reader.onloadend = () => setImagenPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleVideoSeleccionado = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('video/')) {
                alert("Por favor, selecciona un archivo de video válido");
                return;
            }

            if (file.size > 50 * 1024 * 1024) {
                alert("El video es demasiado grande. Máximo 50MB permitido.");
                return;
            }

            setVideoFile(file);
            setImagenFile(null); // Remover imagen si hay video
            setImagenPreview(null);

            // Crear preview
            const reader = new FileReader();
            reader.onloadend = () => setVideoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // ===============================
    // Remover archivos de previsualización
    // ===============================
    const removerImagen = () => {
        setImagenFile(null);
        setImagenPreview(null);
    };

    const removerVideo = () => {
        setVideoFile(null);
        setVideoPreview(null);
    };

    // ===============================
    // Render
    // ===============================
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
            {/* HEADER */}
            <header className="bg-blue-900 text-white flex items-center justify-between px-6 py-3 shadow-lg">
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
                        <ChevronDown
                            className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-180" : ""}`}
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

            {/* BANNER */}
            <div className="relative h-64 bg-gray-300 shadow-md">
                {profileBanner ? (
                    <img src={profileBanner} alt="Banner" className="w-full h-64 object-cover rounded-t-lg" />
                ) : (
                    <div className="w-full h-64 bg-gray-400 flex items-center justify-center text-white text-lg">
                        Sin imagen de portada
                    </div>
                )}
                <label className="absolute top-3 right-3 bg-blue-700 cursor-pointer rounded-full p-2 shadow-md hover:bg-blue-800 transition-all">
                    <input type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
                    <Camera className="w-5 h-5 text-white" />
                </label>
            </div>

            {/* PERFIL */}
            <div className="relative bg-white/5 backdrop-blur-md shadow-md rounded-lg -mt-12 mx-6 p-6 flex items-center gap-6 border border-gray-200">
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
                    <label className="absolute bottom-0 right-0 bg-blue-600 cursor-pointer rounded-full p-2 shadow-md hover:bg-blue-700">
                        <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicUpload} />
                        <Camera className="w-4 h-4 text-white" />
                    </label>
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                    <p className="text-gray-700 max-w-2xl">
                        Innovador y apasionado por la tecnología. Con experiencia en desarrollo de soluciones digitales,
                        liderazgo estratégico y transformación digital.
                    </p>
                </div>
            </div>

            {/* BARRA DE PUBLICACIÓN */}
            <div className="w-full flex justify-center mt-4 relative z-20">
                <div className="bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg rounded-full px-6 py-3 flex items-center gap-4">
                    <label className="cursor-pointer" title="Publicar Imagen">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImagenSeleccionada}
                            className="hidden"
                        />
                        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-md">
                            <ImageIcon className="w-6 h-6 text-blue-800" />
                        </div>
                    </label>

                    <label className="cursor-pointer" title="Publicar Video">
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoSeleccionado}
                            className="hidden"
                        />
                        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-md">
                            <Video className="w-6 h-6 text-blue-800" />
                        </div>
                    </label>

                    <button
                        onClick={publicar}
                        title="Publicar"
                        disabled={(!nuevoTexto && !imagenFile && !videoFile) || subiendo}
                        className="w-12 h-12 flex items-center justify-center bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {subiendo ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Send className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="flex">
                <SidebarMenu />
                <main className="flex-1 p-6">
                    <div className="flex gap-6">
                        {/* Publicaciones */}
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-6 text-blue-900">Mis Publicaciones</h2>

                            {/* Área de nueva publicación */}
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
                                <textarea
                                    value={nuevoTexto}
                                    onChange={(e) => setNuevoTexto(e.target.value)}
                                    placeholder="¿Qué deseas compartir hoy?"
                                    className="w-full border border-gray-300 p-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none mb-4"
                                    rows="4"
                                ></textarea>

                                {/* Previsualización de imagen */}
                                {imagenPreview && (
                                    <div className="relative mt-2 mb-4">
                                        <img src={imagenPreview} alt="Previsualización" className="max-w-full max-h-64 rounded-lg shadow-md" />
                                        <button
                                            onClick={removerImagen}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                {/* Previsualización de video */}
                                {videoPreview && (
                                    <div className="relative mt-2 mb-4">
                                        <video controls className="max-w-full max-h-64 rounded-lg shadow-md">
                                            <source src={videoPreview} />
                                        </video>
                                        <button
                                            onClick={removerVideo}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                {/* Indicador de estado */}
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-sm text-gray-500">
                                        {nuevoTexto && `Caracteres: ${nuevoTexto.length}`}
                                        {(imagenFile || videoFile) && ` • Archivo listo`}
                                    </span>
                                    <button
                                        onClick={publicar}
                                        disabled={(!nuevoTexto && !imagenFile && !videoFile) || subiendo}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {subiendo ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Publicando...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Publicar
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Lista de publicaciones */}
                            {publicaciones.length === 0 ? (
                                <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-600">
                                    <div className="text-4xl mb-4">🚀</div>
                                    <h3 className="text-xl font-semibold mb-2">Aún no tienes publicaciones</h3>
                                    <p className="text-gray-500">Comparte tus ideas, imágenes o videos con la comunidad</p>
                                </div>
                            ) : (
                                publicaciones.map((pub) => (
                                    <div key={pub.id} className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                {profilePic ? (
                                                    <img src={profilePic} alt="avatar" className="w-10 h-10 rounded-full" />
                                                ) : (
                                                    <UserCircle className="w-10 h-10 text-gray-500" />
                                                )}
                                                <div>
                                                    <p className="font-semibold text-blue-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(pub.createdAt).toLocaleString('es-ES', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Botones de editar y eliminar */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => iniciarEdicion(pub)}
                                                    className="text-blue-600 hover:text-blue-800 transition p-2 rounded-full hover:bg-blue-50"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => eliminarPublicacion(pub.id)}
                                                    className="text-red-600 hover:text-red-800 transition p-2 rounded-full hover:bg-red-50"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Contenido de la publicación */}
                                        {editandoId === pub.id ? (
                                            <div className="space-y-3">
                                                <textarea
                                                    value={textoEditado}
                                                    onChange={(e) => setTextoEditado(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                                                    rows="3"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => guardarEdicion(pub.id)}
                                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                        Guardar
                                                    </button>
                                                    <button
                                                        onClick={cancelarEdicion}
                                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-gray-700 text-lg mb-4">{pub.content}</p>
                                                {pub.image && (
                                                    <div className="w-full flex justify-center mt-2">
                                                        <img
                                                            src={`${API_URL}${pub.image.startsWith('/') ? pub.image : `/${pub.image}`}`}
                                                            alt="Publicación"
                                                            className="max-w-full max-h-[600px] rounded-lg shadow-md object-contain border border-gray-200 bg-black/5"
                                                        />
                                                    </div>
                                                )}


                                                {pub.video && (
                                                    <video
                                                        controls
                                                        src={`${API_URL}${pub.video.startsWith('/') ? pub.video : `/${pub.video}`}`}
                                                        className="w-full rounded-lg mt-2 shadow-md max-h-96"
                                                    />
                                                )}

                                            </>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* PANEL DERECHO */}
                        <aside className="w-80 space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
                                <h3 className="font-bold text-xl mb-3 text-blue-900">Información</h3>
                                <ul className="text-gray-700 space-y-2">
                                    <li>📩 <b>Mensajes:</b> 2</li>
                                    <li>📝 <b>Publicaciones:</b> {publicaciones.length}</li>
                                    <li>👥 <b>Amigos:</b> 19</li>
                                    <li>🌐 <b>Web:</b> www.web.com</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
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