import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

// --------------------
// MAP CLICK HANDLER
// --------------------
function LocationPicker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}

const Report = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    urgency: "",
    description: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(null);

  // --------------------
  // INPUT HANDLER
  // --------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  // --------------------
  // SUBMIT
  // --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!position) {
      alert("Please select location on map");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("phone", form.phone);
      data.append("location", form.location);
      data.append("urgency", form.urgency);
      data.append("description", form.description);
      data.append("file", form.file);

      // send lat/lng
      data.append("latitude", position.lat);
      data.append("longitude", position.lng);

      const res = await axios.post(
        "https://pawalert-backend-68zf.onrender.com/report",
        data
      );

      alert(`Report submitted\nPrediction: ${res.data.prediction}`);

      // reset form
      setForm({
        name: "",
        phone: "",
        location: "",
        urgency: "",
        description: "",
        file: null,
      });

      setPosition(null);
    } catch (error) {
      console.log(error);
      alert("Error submitting report");
    }

    setLoading(false);
  };

  // --------------------
  // UI
  // --------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-2 text-center">
          PawAlert Report
        </h2>

        <p className="text-center text-gray-500 mb-4">
          Click on map to mark injured animal location
        </p>

        {/* MAP */}
        <div className="mb-4">
          <MapContainer
            center={[28.61, 77.20]}
            zoom={11}
            style={{ height: "200px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <LocationPicker setPosition={setPosition} />

            {position && <Marker position={[position.lat, position.lng]} />}
          </MapContainer>
        </div>

        {/* SHOW SELECTED COORDINATES */}
        {position && (
          <p className="text-sm text-green-600 mb-2 text-center">
            Selected: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg"
          required
        />

        <select
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
          required
          className="border p-3 w-full mb-3 rounded-lg"
        >
          <option value="">Select urgency</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Optional location (text)"
          value={form.location}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Describe condition"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg"
          rows="3"
          required
        />

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full mb-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default Report;