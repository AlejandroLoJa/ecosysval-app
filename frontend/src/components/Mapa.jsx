// src/components/Mapa.jsx
import React, { useEffect, useMemo } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

// =============================
// 🔐 Configuración Mapbox
// =============================
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWxlOTUxMDE5IiwiYSI6ImNtbDFhOXFkeTA2M2kzZXB0ZXRvanRzaGYifQ.u732kFuNU02xTJs9d43Jbg";

const MAP_STYLE =
  "mapbox://styles/ale951019/cml19r38j00c401s3fqd4hft0";

// =============================
// 🗺️ Componente principal
// empresas: [{ id, nombre, tipo, productos, ciudad, estado, lat, lng }]
// =============================
export default function Mapa({ empresas = [], center, zoom = 5 }) {
  const defaultCenter = {
    latitude: 19.432608,
    longitude: -99.133209,
  };

  const initialViewState = useMemo(() => {
    if (center) {
      return {
        latitude: center[0],
        longitude: center[1],
        zoom,
      };
    }

    if (empresas.length > 0) {
      return {
        latitude: Number(empresas[0].lat),
        longitude: Number(empresas[0].lng),
        zoom,
      };
    }

    return {
      ...defaultCenter,
      zoom,
    };
  }, [center, empresas, zoom]);

  useEffect(() => {
    console.log("🌍 Mapbox GL cargado correctamente ✅");
  }, []);

  return (
    <div
      className="w-full rounded-xl shadow-lg border border-gray-200 overflow-hidden"
      style={{ height: "500px" }}
    >
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={initialViewState}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
      >
        {/* ============================
            📍 Marcadores
        ============================ */}
        {empresas.length > 0 ? (
          empresas.map((e) => (
            <Marker
              key={e.id}
              latitude={Number(e.lat)}
              longitude={Number(e.lng)}
              anchor="bottom"
            >
              <img
                src="/custom-marker.png"
                alt="marker"
                style={{ width: 40, height: 40 }}
              />

              <Popup
                latitude={Number(e.lat)}
                longitude={Number(e.lng)}
                closeButton={false}
                closeOnClick={false}
                offset={25}
              >
                <div className="text-sm">
                  <b>{e.nombre}</b>
                  <br />
                  {e.tipo} — {e.productos}
                  <br />
                  {e.ciudad}, {e.estado}
                </div>
              </Popup>
            </Marker>
          ))
        ) : (
          <Marker
            latitude={defaultCenter.latitude}
            longitude={defaultCenter.longitude}
            anchor="bottom"
          >
            <img
              src="/custom-marker.png"
              alt="marker"
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        )}
      </Map>
    </div>
  );
}
