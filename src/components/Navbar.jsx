import { Link } from "react-router-dom";

export default function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar">
      <h2>TESTE TRIP</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/listecourses">Liste Courses</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
      </ul>
      <div>
        <input
          className="search-input"
          type="text"
          placeholder="Search... 🔍"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </nav>
  );
}