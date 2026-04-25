import React, { useEffect, useState } from "react";
import axios from "axios";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// --------------------
// FIX DEFAULT ICON ISSUE
// --------------------
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// --------------------
// COLOR MARKERS
// --------------------
const createIcon = (color) =>
  new L.DivIcon({
    className: "custom-icon",
    html: `
      <div style="
        background:${color};
        width:14px;
        height:14px;
        border-radius:50%;
        border:2px solid white;
        box-shadow:0 0 5px rgba(0,0,0,0.5);
      "></div>
    `,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

const getColor = (urgency) => {
  if (urgency === "high") return "red";
  if (urgency === "medium") return "orange";
  return "green";
};

const Map = () => {

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------
  // FETCH DATA FROM BACKEND
  // --------------------
  const fetchReports = async () => {
    try {
      const res = await axios.get("https://pawalert-backend-68zf.onrender.com/reports");

      // IMPORTANT: ensure array safety
      if (Array.isArray(res.data)) {
        setReports(res.data);
      } else {
        setReports([]);
      }

    } catch (err) {
      console.log("Fetch error:", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // --------------------
  // UI
  // --------------------
  return (
    <div className="flex h-screen">

      {/* ================= SIDEBAR ================= */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">📋 Cases</h2>

        {loading && (
          <p className="text-gray-500">Loading reports...</p>
        )}

        {!loading && reports.length === 0 && (
          <p className="text-gray-500">No reports found</p>
        )}

        {reports.map((r, i) => (
          <div key={i} className="bg-white p-3 rounded shadow mb-3">

            <p className="font-semibold">👤 {r.name}</p>

            <p className="text-sm text-gray-600">
              {r.description?.slice(0, 50)}...
            </p>

            <p
              className={`text-sm font-bold mt-1 ${
                r.urgency === "high"
                  ? "text-red-500"
                  : r.urgency === "medium"
                  ? "text-orange-500"
                  : "text-green-500"
              }`}
            >
              {r.urgency?.toUpperCase()}
            </p>

          </div>
        ))}

      </div>

      {/* ================= MAP ================= */}
      <div className="w-2/3">

        <MapContainer
          center={[28.61, 77.20]}
          zoom={11}
          style={{ height: "100%", width: "100%" }}
        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* ---------------- MARKERS ---------------- */}
          {reports.map((r, i) => (
            <Marker
              key={i}
              position={[
                r.latitude || 28.61,
                r.longitude || 77.20
              ]}
              icon={createIcon(getColor(r.urgency))}
            >
              <Popup>
                <b>{r.name}</b>
                <br />
                {r.description}
                <br />
                <b>Urgency:</b> {r.urgency}
              </Popup>
            </Marker>
          ))}

        </MapContainer>

      </div>

    </div>
  );
};

export default Map;