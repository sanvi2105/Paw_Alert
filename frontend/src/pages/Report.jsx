import React, { useState } from "react";
import axios from "axios";

const Report = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    description: "",
    file: null
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("phone", form.phone);
      data.append("location", form.location);
      data.append("description", form.description);
      data.append("file", form.file);

      const res = await axios.post(
        "http://localhost:8000/report",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(res.data);

      alert("Prediction: " + res.data.prediction);

      alert(`Report submitted 🐶\nPrediction: ${res.data.prediction}`);

      setForm({
        name: "",
        phone: "",
        location: "",
        description: "",
        file: null
      });

    } catch (error) {
      alert("Error submitting report ❌");
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >

        <h2 className="text-3xl font-bold mb-2 text-center">
          🐾 PawAlert Report
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Help rescue injured animals instantly
        </p>

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

        <input
          type="text"
          name="location"
          placeholder="Location (e.g. Delhi, street name)"
          value={form.location}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Describe condition (injured, bleeding, etc.)"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg"
          rows="3"
          required
        />

        {/* IMAGE UPLOAD */}
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
          {loading ? "Submitting..." : "🚨 Submit Report"}
        </button>

      </form>

    </div>
  );
};

export default Report;