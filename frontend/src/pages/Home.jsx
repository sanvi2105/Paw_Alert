import React from "react";
import HeroImg from "../assets/dog6_img.jpg";
import { FaPlay } from "react-icons/fa";

const Home = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >

      {/* DARK OVERLAY (IMPORTANT FOR TEXT VISIBILITY) */}
      <div className="absolute inset-0 bg-black/5"></div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-3xl text-black">

        <p className="uppercase text-red-400 font-semibold mb-4">
          Save Lives. Report Injured Animals.
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Helping Injured Dogs Find Care Faster
        </h1>

        <p className="mb-8 text-black-200">
          PawAlert helps people report injured animals instantly, mark exact
          locations on map, and connect with NGOs for faster rescue.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-6 justify-center">

          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg">
            🚨 Report Now
          </button>

          <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg">

            <FaPlay />
            How it works

          </button>

        </div>

      </div>
    </div>
  );
};

export default Home;