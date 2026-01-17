// src/components/Mapa.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// =============================
// 🧭 Ícono personalizado para el marcador
// =============================
const customIcon = L.icon({
  iconUrl: "/custom-marker.png", // Ruta desde public/
  iconSize: [40, 40], // Tamaño del ícono
  iconAnchor: [20, 40], // Punto que “toca” el mapa
  popupAnchor: [0, -35], // Ajuste del popup
  className: "shadow-md", // Opcional para añadir sombra CSS
});

// =============================
// 🗺️ Componente principal
// =============================
// empresas: [{ id, nombre, tipo, productos, ciudad, estado, lat, lng }]
export default function Mapa({ empresas = [], center, zoom = 5 }) {
  const defaultCenter = [19.432608, -99.133209]; // Ciudad de México

  const hasEmpresas = empresas && empresas.length > 0;
  const initialCenter = center
    ? center
    : hasEmpresas
    ? [empresas[0].lat, empresas[0].lng]
    : defaultCenter;

  useEffect(() => {
    console.log("🌍 Mapa de OMEC cargado correctamente ✅");
  }, []);

  return (
    <div
      className="w-full h-full rounded-xl shadow-lg border border-gray-200 bg-white"
      style={{ height: "500px", width: "100%" }}
    >
      <MapContainer
        center={initialCenter}
        zoom={zoom}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        {/* ============================
            🎨 Fondo del mapa (Mapbox estilo tipo Google Maps)
        ============================ */}
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxlOTUxMDE5IiwiYSI6ImNtaGo4dGc4NjE4anQybG9nbXU2cXlndnUifQ.gUgMSw6o2RVGjq8eBhgTpA"
          attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> | Datos © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          tileSize={512}
          zoomOffset={-1}
        />

        {/* ============================
            📍 Marcadores
        ============================ */}
        {hasEmpresas ? (
          empresas.map((e) => (
            <Marker
              key={e.id}
              position={[e.lat, e.lng]}
              icon={customIcon}
            >
              <Popup>
                <b>{e.nombre}</b> <br />
                {e.tipo} — {e.productos} <br />
                {e.ciudad}, {e.estado}
              </Popup>
            </Marker>
          ))
        ) : (
          <Marker position={defaultCenter} icon={customIcon}>
            <Popup>
              <b>OMEC - Ciudad de México</b> <br />
              Aquí se encuentra una de nuestras sedes 🌎
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
