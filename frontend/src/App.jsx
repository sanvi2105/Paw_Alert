import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Report from "./pages/Report";
import Feed from "./pages/Feed";
import Map from "./pages/Map";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
}

export default App;