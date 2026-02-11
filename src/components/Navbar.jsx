import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUtensils } from "react-icons/fa";

import "../App.css";

export default function Navbar({ search, setSearch }) {
  const [open, setOpen] = useState(false); // state dial burger menu

  return (
    <nav className="navbar">
      <h1 className="logo">
        <FaUtensils className="logo-icon" />
        Test <span>Trip</span>
      </h1>


      {/* Burger menu */}
      <div className="burger" onClick={() => setOpen(!open)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Nav links */}
      <ul className={`nav-links ${open ? "nav-active" : ""}`}>
        <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
        <li><Link to="/listecourses" onClick={() => setOpen(false)}>Liste Courses</Link></li>
        <li><Link to="/favorites" onClick={() => setOpen(false)}>Favorites</Link></li>
        <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
      </ul>

      {/* Actions: search + dark mode */}
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
