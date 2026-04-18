import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-5 px-6">

          {/* Logo */}
          <div className="text-2xl font-bold text-secondary flex items-center gap-2">
            🐾 PawAlert
          </div>

          {/* Menu */}
          <ul className="hidden lg:flex gap-6 text-gray-700 font-semibold">
            <li><a href="/" className="hover:text-secondary">Home</a></li>
            <li><a href="/feed" className="hover:text-secondary">Feed</a></li>
            <li><a href="/report" className="hover:text-secondary">Report</a></li>
          </ul>

          {/* CTA */}
          <button className="bg-secondary text-white px-5 py-2 rounded-full">
            Get Started
          </button>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-10">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Help Stray Dogs, <span className="text-secondary">Save Lives 🐶</span>
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            PawAlert connects people, NGOs, and volunteers to report, track, and rescue stray dogs using real-time community support.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-secondary text-white px-6 py-3 rounded-full">
              Report Now
            </button>
            <button className="border px-6 py-3 rounded-full">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Image */}
        <motion.img
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src="https://images.unsplash.com/photo-1558788353-f76d92427f16"
          alt="dog"
          className="w-full lg:w-[450px] rounded-2xl shadow-lg"
        />

      </section>

      {/* Features */}
      <section className="bg-white py-20">

        <div className="container mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-10">Features</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="p-6 shadow-md rounded-xl hover:shadow-xl transition">
              <h3 className="font-bold text-lg">📍 Report Dogs</h3>
              <p className="text-gray-600 mt-2">Instantly report stray or injured dogs.</p>
            </div>

            <div className="p-6 shadow-md rounded-xl hover:shadow-xl transition">
              <h3 className="font-bold text-lg">🗺️ Live Map</h3>
              <p className="text-gray-600 mt-2">Track reports in real-time on map.</p>
            </div>

            <div className="p-6 shadow-md rounded-xl hover:shadow-xl transition">
              <h3 className="font-bold text-lg">🤝 NGO Support</h3>
              <p className="text-gray-600 mt-2">Connect reports directly to NGOs.</p>
            </div>

            <div className="p-6 shadow-md rounded-xl hover:shadow-xl transition">
              <h3 className="font-bold text-lg">📊 Community Feed</h3>
              <p className="text-gray-600 mt-2">See updates and rescue stories.</p>
            </div>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 text-gray-600">
        © 2026 PawAlert. Built with ❤️ for animals.
      </footer>

    </div>
  );
};

export default Home;