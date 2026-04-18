import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Report from "./pages/Report";
import Feed from "./pages/Feed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;