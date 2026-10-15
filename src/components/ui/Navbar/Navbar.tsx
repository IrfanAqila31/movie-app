import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <nav className="bg-slate-950 backdrop-blur-md border border-b-slate-800 w-full px-6 py-3 md:py-4 flex items-center justify-around gap-10 md:gap-0">
        {/* Nav Links */}
        <div className="text-slate-300 flex gap-8">
          <Link to="/">Home</Link>
          <Link to="/popular">Popular</Link>
        </div>

        {/* Search Bar */}
        <SearchBar />
      </nav>
    </header>
  );
};

export default Navbar;
