import React, { useState, useEffect } from "react";

export default function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState("");
  const [imagen, setImagen] = useState(null);
  const [video, setVideo] = useState(null);

  // 🧩 Cargar publicaciones guardadas
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("publicacionesOMEC")) || [];
    setPublicaciones(guardadas);
  }, []);

  // 💾 Guardar cada vez que cambia la lista
  useEffect(() => {
    localStorage.setItem("publicacionesOMEC", JSON.stringify(publicaciones));
  }, [publicaciones]);

  // ➕ Agregar nueva publicación
  const publicar = () => {
    if (!nuevoTexto && !imagen && !video) return;

    const nueva = {
      id: Date.now(),
      usuario: "Alejandro Lopez",
      contenido: nuevoTexto,
      imagen,
      video,
      fecha: new Date().toLocaleString(),
    };
    setPublicaciones([nueva, ...publicaciones]);
    setNuevoTexto("");
    setImagen(null);
    setVideo(null);
  };

  // 📸 Subir imagen
  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagen(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 🎥 Subir video
  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVideo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* ====== BARRA DE ICONOS ====== */}
      <div className="flex justify-center gap-3 bg-yellow-400 rounded-full p-2 shadow-md w-fit mx-auto">
        {/* Imagen */}
        <label className="cursor-pointer p-2 bg-yellow-400 hover:bg-yellow-500 rounded-md shadow">
          <img src="/icons/imagenes.png" alt="Imagen" className="w-6 h-6" />
          <input type="file" accept="image/*" onChange={handleImagen} className="hidden" />
        </label>

        {/* Video */}
        <label className="cursor-pointer p-2 bg-yellow-400 hover:bg-yellow-500 rounded-md shadow">
          <img src="/icons/video.png" alt="Video" className="w-6 h-6" />
          <input type="file" accept="video/*" onChange={handleVideo} className="hidden" />
        </label>

        {/* Publicar */}
        <button
          onClick={publicar}
          className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded-md shadow"
        >
          <img src="/icons/mas-contenido.png" alt="Publicar" className="w-6 h-6" />
        </button>
      </div>

      {/* ====== FORMULARIO DE TEXTO ====== */}
      <div className="bg-white rounded-xl shadow p-4">
        <textarea
          value={nuevoTexto}
          onChange={(e) => setNuevoTexto(e.target.value)}
          placeholder="¿Qué deseas compartir?"
          className="w-full border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
        ></textarea>
      </div>

      {/* ====== LISTA DE PUBLICACIONES ====== */}
      <div className="space-y-4">
        {publicaciones.map((pub) => (
          <div
            key={pub.id}
            className="bg-white shadow rounded-xl p-4 space-y-2 border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <img src="/omec.png" alt="Perfil" className="w-8 h-8 rounded-full" />
              <div>
                <h3 className="font-semibold text-blue-800">{pub.usuario}</h3>
                <p className="text-xs text-gray-500">{pub.fecha}</p>
              </div>
            </div>

            <p className="text-gray-700">{pub.contenido}</p>

            {pub.imagen && (
              <img
                src={pub.imagen}
                alt="Publicación"
                className="w-full rounded-lg mt-2 border"
              />
            )}

            {pub.video && (
              <video
                controls
                src={pub.video}
                className="w-full rounded-lg mt-2 border"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
