import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/reports");

      console.log("API DATA:", res.data);

      if (Array.isArray(res.data)) {
        setReports(res.data);
      } else {
        setReports([]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setReports([]);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("status", newStatus);

      await axios.put("http://127.0.0.1:8000/update-status", formData);

      fetchReports();
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        PawAlert Feed
      </h1>

      {reports.length === 0 && (
        <p className="text-center text-gray-500">No reports found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {reports.map((item, index) => (
          <div
            key={item._id || index}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >

            {/* IMAGE */}
            <img
              src={
                item.image_url
                  ? `http://127.0.0.1:8000${item.image_url}`
                  : "https://via.placeholder.com/300x200"
              }
              alt="dog"
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x200";
              }}
            />

            {/* CONTENT */}
            <div className="p-4">

              <h2 className="font-semibold text-lg">
                {item.location || "Unknown location"}
              </h2>

              <p className="text-gray-600 mt-2">
                {item.description || "No description"}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {item.name || "Anonymous"} | {item.phone || "-"}
              </p>

              {/* FIXED PREDICTION */}
              <p className="mt-2 font-bold text-blue-600">
                {Array.isArray(item.prediction)
                  ? item.prediction[0]?.name || "Detected"
                  : item.prediction || "No prediction"}
              </p>

              {/* STATUS */}
              <p
                className={`mt-2 font-bold ${
                  item.status === "helped"
                    ? "text-green-500"
                    : item.status === "in progress"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {item.status || "not helped"}
              </p>

              {/* BUTTONS */}
              <div className="mt-3 flex gap-2">

                <button
                  onClick={() => updateStatus(item._id, "in progress")}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  In Progress
                </button>

                <button
                  onClick={() => updateStatus(item._id, "helped")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Helped
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Feed;