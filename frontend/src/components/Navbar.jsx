import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">

      <h1 className="font-bold text-xl">🐾 PawAlert</h1>

      <div className="flex gap-6">

        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>

        <Link to="/feed" className="hover:text-blue-500">
          Feed
        </Link>

        <Link to="/report" className="hover:text-blue-500">
          Report
        </Link>

        {/* NEW MAP OPTION */}
        <Link to="/map" className="hover:text-blue-500 font-semibold">
          🗺️ Map
        </Link>

      </div>

    </div>
  );
};

export default Navbar;