import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:8000/reports");
      setReports(res.data.reports || []);
    } catch (error) {
      console.log("Error fetching reports", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const getColor = (urgency) => {
    if (urgency === "red") return "#ff4d4d";
    if (urgency === "yellow") return "#ffd633";
    return "#4dff88";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        🐾 PawAlert Rescue Feed
      </h1>

      {loading ? (
        <p className="text-center">Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="text-center">No reports yet</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {reports.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden border"
              style={{ borderTop: `6px solid ${getColor(item.urgency)}` }}
            >

              {/* IMAGE */}
              {item.image_path && (
                <img
                  src={`http://localhost:8000/${item.image_path}`}
                  alt="dog"
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">

                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p className="text-gray-600">
                  📍 {item.location}
                </p>

                <p className="text-gray-600">
                  📞 {item.phone}
                </p>

                <p className="mt-2">
                  📝 {item.description}
                </p>

                <p className="mt-2 font-semibold">
                  🤖 Prediction: {item.prediction}
                </p>

                <p className="mt-1">
                  🚑 Status: {item.status}
                </p>

                <div
                  className="mt-3 inline-block px-3 py-1 rounded-full text-white text-sm"
                  style={{ backgroundColor: getColor(item.urgency) }}
                >
                  {item.urgency?.toUpperCase()}
                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Feed;