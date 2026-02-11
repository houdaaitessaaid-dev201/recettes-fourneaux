import { Link } from "react-router-dom";

export default function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar">
      <h1 className="logo">
        Test <span>Trip</span>
      </h1>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/listecourses">Liste Courses</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="nav-actions">
        <input
          className="search-input"
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="dark-btn"
          onClick={() => document.body.classList.toggle("dark")}
        >
          🌙
        </button>
      </div>
    </nav>
  );
}
