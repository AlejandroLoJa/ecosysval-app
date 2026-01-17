import React, { useEffect, useState } from "react";
import {
  UserCircle,
  Camera,
  Edit,
  Trash2,
  X,
  Image as ImageIcon,
  Video,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [profileBanner, setProfileBanner] = useState(null);

  // publicaciones
  const [publicaciones, setPublicaciones] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState("");
  const [imagenFile, setImagenFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  // edición
  const [editandoId, setEditandoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");

  const API_URL = "http://localhost:3000";
  const navigate = useNavigate();

  // ===============================
  // Cargar usuario + publicaciones
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
      const resUser = await fetch(`${API_URL}/users/${idUsuario}`);
      const dataUser = await resUser.json();

      setProfilePic(dataUser.profile_image ? `${API_URL}${dataUser.profile_image}` : null);
      setProfileBanner(dataUser.banner_image ? `${API_URL}${dataUser.banner_image}` : null);

      const resPosts = await fetch(`${API_URL}/posts/user/${idUsuario}`);
      const dataPosts = await resPosts.json();
      setPublicaciones(Array.isArray(dataPosts) ? dataPosts : []);
    } catch (error) {
      console.error("Error al cargar datos del perfil:", error);
    }
  };

  // ===============================
  // Subir imágenes
  // ===============================
  const handleProfilePicUpload = async (e) => {
    const file = e.target.files?.[0];
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

  const handleBannerUpload = async (e) => {
    const file = e.target.files?.[0];
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
  // Publicar
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

    if (imagenFile) formData.append("files", imagenFile);
    if (videoFile) formData.append("files", videoFile);

    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        body: formData,
      });

      const responseData = await res.json();

      if (res.ok) {
        setNuevoTexto("");
        setImagenFile(null);
        setVideoFile(null);
        setImagenPreview(null);
        setVideoPreview(null);
        await cargarUsuarioYPublicaciones(user.id);
      } else {
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
  // Eliminar
  // ===============================
  const eliminarPublicacion = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")) return;

    try {
      const res = await fetch(`${API_URL}/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        await cargarUsuarioYPublicaciones(user.id);
      } else {
        alert("Error al eliminar publicación");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error de conexión al eliminar");
    }
  };

  // ===============================
  // Editar
  // ===============================
  const iniciarEdicion = (pub) => {
    setEditandoId(pub.id);
    setTextoEditado(pub.content || "");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: textoEditado }),
      });

      if (res.ok) {
        setEditandoId(null);
        setTextoEditado("");
        await cargarUsuarioYPublicaciones(user.id);
      } else {
        alert("Error al editar publicación");
      }
    } catch (error) {
      console.error("Error al editar:", error);
      alert("Error de conexión al editar");
    }
  };

  // ===============================
  // Archivos (preview)
  // ===============================
  const handleImagenSeleccionada = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona un archivo de imagen válido");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("La imagen es demasiado grande. Máximo 10MB permitido.");
      return;
    }

    setImagenFile(file);
    setVideoFile(null);
    setVideoPreview(null);

    const reader = new FileReader();
    reader.onloadend = () => setImagenPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleVideoSeleccionado = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Por favor, selecciona un archivo de video válido");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      alert("El video es demasiado grande. Máximo 50MB permitido.");
      return;
    }

    setVideoFile(file);
    setImagenFile(null);
    setImagenPreview(null);

    const reader = new FileReader();
    reader.onloadend = () => setVideoPreview(reader.result);
    reader.readAsDataURL(file);
  };

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
    <div className="min-h-screen bg-fixed bg-center bg-cover flex flex-col" style={{ backgroundImage: "url('/fondo.png')" }}>
      <MainHeader showSearch={true} showBack={false} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64">
          <SidebarMenu />
        </aside>

        {/* Main */}
        <main className="flex-1 px-4 md:px-8 py-6">
          {/* ===== Banner ===== */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-2xl">
            <div className="relative h-56 md:h-64">
              {profileBanner ? (
                <img src={profileBanner} alt="Banner" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/70">
                  Sin imagen de portada
                </div>
              )}

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

              {/* botón camera */}
              <label className="absolute top-4 right-4 cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
                <div className="h-11 w-11 rounded-2xl border border-white/15 bg-white/10 hover:bg-white/15 transition flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white/90" />
                </div>
              </label>
            </div>

            {/* ===== Perfil card ===== */}
            <div className="relative px-5 md:px-7 pb-6">
              <div className="-mt-14 md:-mt-16 flex flex-col md:flex-row md:items-end gap-4">
                <div className="relative w-fit">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="avatar"
                      className="w-28 h-28 md:w-32 md:h-32 rounded-3xl border border-white/20 shadow-xl object-cover"
                    />
                  ) : (
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl border border-white/20 bg-white/10 flex items-center justify-center shadow-xl">
                      <UserCircle className="w-16 h-16 text-white/60" />
                    </div>
                  )}

                  <label className="absolute -bottom-2 -right-2 cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicUpload} />
                    <div className="h-10 w-10 rounded-2xl bg-yellow-400 hover:bg-yellow-300 transition shadow-lg flex items-center justify-center">
                      <Camera className="w-5 h-5 text-slate-900" />
                    </div>
                  </label>
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow">
                    {user.name}
                  </h1>
                  <p className="text-white/70 mt-1 max-w-3xl">
                    Innovador y apasionado por la tecnología. Con experiencia en desarrollo de soluciones digitales,
                    liderazgo estratégico y transformación digital.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== Acciones flotantes ===== */}
          <div className="mt-6 flex justify-center">
            <div className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-xl px-4 py-3 flex items-center gap-3">
              <label className="cursor-pointer" title="Publicar Imagen">
                <input type="file" accept="image/*" onChange={handleImagenSeleccionada} className="hidden" />
                <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-white/85" />
                </div>
              </label>

              <label className="cursor-pointer" title="Publicar Video">
                <input type="file" accept="video/*" onChange={handleVideoSeleccionado} className="hidden" />
                <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition flex items-center justify-center">
                  <Video className="w-5 h-5 text-white/85" />
                </div>
              </label>

              <button
                onClick={publicar}
                disabled={(!nuevoTexto && !imagenFile && !videoFile) || subiendo}
                className="h-11 px-5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 transition shadow-lg font-semibold text-slate-900 disabled:bg-white/20 disabled:text-white/60 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {subiendo ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
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

          {/* ===== Grid principal ===== */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
            {/* Columna publicaciones */}
            <section>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4">Mis Publicaciones</h2>

              {/* Crear post */}
              <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-xl p-5 md:p-6">
                <textarea
                  value={nuevoTexto}
                  onChange={(e) => setNuevoTexto(e.target.value)}
                  placeholder="¿Qué deseas compartir hoy?"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-white/50 p-4 outline-none focus:ring-2 focus:ring-yellow-300/60 resize-none"
                  rows={4}
                />

                {/* Preview imagen */}
                {imagenPreview && (
                  <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <img
                      src={imagenPreview}
                      alt="Previsualización"
                      className="w-full max-h-[420px] object-contain"
                    />
                    <button
                      onClick={removerImagen}
                      className="absolute top-3 right-3 h-10 w-10 rounded-2xl bg-black/50 hover:bg-black/70 transition flex items-center justify-center border border-white/10"
                      title="Quitar imagen"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                )}

                {/* Preview video */}
                {videoPreview && (
                  <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <video controls className="w-full max-h-[420px] object-contain">
                      <source src={videoPreview} />
                    </video>
                    <button
                      onClick={removerVideo}
                      className="absolute top-3 right-3 h-10 w-10 rounded-2xl bg-black/50 hover:bg-black/70 transition flex items-center justify-center border border-white/10"
                      title="Quitar video"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-white/60">
                    {nuevoTexto ? `Caracteres: ${nuevoTexto.length}` : " "}
                    {(imagenFile || videoFile) ? " • Archivo listo" : ""}
                  </span>

                  <button
                    onClick={publicar}
                    disabled={(!nuevoTexto && !imagenFile && !videoFile) || subiendo}
                    className="h-11 px-5 rounded-2xl bg-blue-500/90 hover:bg-blue-500 transition text-white font-semibold shadow-lg disabled:bg-white/10 disabled:text-white/50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    {subiendo ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

              {/* Lista posts */}
              <div className="mt-6 space-y-5">
                {publicaciones.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-xl p-10 text-center text-white/70">
                    <div className="text-4xl mb-3">🚀</div>
                    <div className="text-lg font-semibold text-white">Aún no tienes publicaciones</div>
                    <div className="text-sm text-white/60 mt-1">Comparte tus ideas, imágenes o videos con la comunidad</div>
                  </div>
                ) : (
                  publicaciones.map((pub) => (
                    <article key={pub.id} className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-xl p-5 md:p-6">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          {profilePic ? (
                            <img src={profilePic} alt="avatar" className="w-10 h-10 rounded-2xl object-cover border border-white/10" />
                          ) : (
                            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                              <UserCircle className="w-6 h-6 text-white/60" />
                            </div>
                          )}

                          <div>
                            <div className="font-semibold text-white">{user.name}</div>
                            <div className="text-xs text-white/55">
                              {new Date(pub.createdAt).toLocaleString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => iniciarEdicion(pub)}
                            className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4 text-white/80" />
                          </button>
                          <button
                            onClick={() => eliminarPublicacion(pub.id)}
                            className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 hover:bg-red-500/20 transition flex items-center justify-center"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4 text-red-300" />
                          </button>
                        </div>
                      </div>

                      {editandoId === pub.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={textoEditado}
                            onChange={(e) => setTextoEditado(e.target.value)}
                            className="w-full rounded-2xl border border-white/10 bg-white/10 text-white placeholder:text-white/50 p-4 outline-none focus:ring-2 focus:ring-yellow-300/60 resize-none"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => guardarEdicion(pub.id)}
                              className="h-11 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition text-slate-900 font-semibold shadow inline-flex items-center gap-2"
                            >
                              <Send className="w-4 h-4" />
                              Guardar
                            </button>
                            <button
                              onClick={cancelarEdicion}
                              className="h-11 px-5 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-white font-semibold"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {!!pub.content && (
                            <p className="text-white/85 leading-relaxed text-[15px] mb-4 whitespace-pre-wrap">
                              {pub.content}
                            </p>
                          )}

                          {pub.image && (
                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                              <img
                                src={`${API_URL}${pub.image.startsWith("/") ? pub.image : `/${pub.image}`}`}
                                alt="Publicación"
                                className="w-full max-h-[620px] object-contain"
                              />
                            </div>
                          )}

                          {pub.video && (
                            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                              <video
                                controls
                                src={`${API_URL}${pub.video.startsWith("/") ? pub.video : `/${pub.video}`}`}
                                className="w-full max-h-[520px] object-contain"
                              />
                            </div>
                          )}
                        </>
                      )}
                    </article>
                  ))
                )}
              </div>
            </section>

            {/* Columna derecha */}
            <aside className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-xl p-5">
                <h3 className="font-extrabold text-white text-lg mb-3">Información</h3>
                <ul className="text-white/75 space-y-2 text-sm">
                  <li>📩 <b className="text-white">Mensajes:</b> 2</li>
                  <li>📝 <b className="text-white">Publicaciones:</b> {publicaciones.length}</li>
                  <li>👥 <b className="text-white">Amigos:</b> 19</li>
                  <li>🌐 <b className="text-white">Web:</b> www.web.com</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-xl p-5">
                <h3 className="font-extrabold text-white text-lg mb-4 text-center">Membresía</h3>
                <div className="flex justify-center">
                  <img src="/Platino.png" alt="Membresía" className="w-40 h-44 object-contain" />
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
