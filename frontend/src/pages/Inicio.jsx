// src/pages/Inicio.jsx
import React, { useEffect, useState } from "react";
import MainHeader from "../components/MainHeader";
import SidebarMenu from "../components/SidebarMenu";
import { Loader2, RefreshCcw } from "lucide-react";

const API_BASE = "http://localhost:3000"; // backend

export default function Inicio() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarFeed = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/posts`);
      if (!res.ok) throw new Error("No se pudo cargar el feed");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarFeed();
  }, []);

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover flex flex-col"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <MainHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64">
          <SidebarMenu />
        </aside>

        {/* Main */}
        <main className="flex-1 px-4 md:px-8 py-6">
          <div className="mx-auto max-w-5xl space-y-5">
            {/* Header feed */}
            <div className="flex items-center justify-between gap-3">
              <div className="rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-xl px-5 py-3">
                <h1 className="text-white font-extrabold text-lg md:text-xl">
                  Inicio
                  <span className="text-white/60 font-semibold">
                    {" "}
                    • Feed de publicaciones
                  </span>
                </h1>
                <p className="text-white/60 text-sm mt-1">
                  Publicaciones tuyas y de otras empresas (ordenadas por fecha).
                </p>
              </div>

              <button
                type="button"
                onClick={cargarFeed}
                className="hidden md:inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition px-4 py-3 text-white/90 shadow-lg"
                title="Actualizar feed"
              >
                <RefreshCcw className="w-4 h-4" />
                Actualizar
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center p-16 text-white/70 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-xl">
                <Loader2 className="w-8 h-8 animate-spin mb-3" />
                Cargando publicaciones...
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-xl p-12 text-center">
                <div className="text-4xl mb-3">📰</div>
                <p className="text-white font-semibold">Aún no hay publicaciones</p>
                <p className="text-white/60 text-sm mt-1">
                  Cuando las empresas publiquen, aparecerán aquí.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {posts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function PostCard({ post }) {
  const userName =
    post?.user?.name ||
    post?.user?.nombre ||
    post?.user?.empresa ||
    "Empresa";

  const createdAt = post?.createdAt ? new Date(post.createdAt) : null;

  // ✅ Avatar (foto de perfil del autor del post)
  const avatarPath = post?.user?.profile_image
    ? post.user.profile_image.startsWith("/")
      ? post.user.profile_image
      : `/${post.user.profile_image}`
    : null;

  // ✅ Imagen del post
  const imgPath = post?.image
    ? post.image.startsWith("/")
      ? post.image
      : `/${post.image}`
    : null;

  // ✅ Video del post
  const videoPath = post?.video
    ? post.video.startsWith("/")
      ? post.video
      : `/${post.video}`
    : null;

  return (
    <article className="rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-xl p-5 md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="h-11 w-11 rounded-2xl overflow-hidden border border-white/10 bg-white/10 flex items-center justify-center">
            {avatarPath ? (
              <img
                src={`${API_BASE}${avatarPath}`}
                alt={`Avatar ${userName}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="text-white/80 font-extrabold">
                {userName?.[0]?.toUpperCase() || "E"}
              </span>
            )}
          </div>

          <div>
            <div className="font-semibold text-white">{userName}</div>
            <div className="text-xs text-white/55">
              {createdAt
                ? createdAt.toLocaleString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {post?.content && (
        <p className="text-white/85 mt-4 whitespace-pre-wrap leading-relaxed text-[15px]">
          {post.content}
        </p>
      )}

      {/* Media */}
      {(imgPath || videoPath) && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          {imgPath && (
            <img
              src={`${API_BASE}${imgPath}`}
              alt="publicación"
              className="w-full max-h-[620px] object-contain block"
              loading="lazy"
            />
          )}

          {videoPath && (
            <video
              src={`${API_BASE}${videoPath}`}
              className="w-full max-h-[520px] object-contain block"
              controls
            />
          )}
        </div>
      )}
    </article>
  );
}
