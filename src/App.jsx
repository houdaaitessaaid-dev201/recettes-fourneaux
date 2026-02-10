import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Favorites from "./components/Favorites";
import ListeCourses from "./components/ListeCourses";
import Navbar from "./components/Navbar";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="container">
      {/* Navbar fixe f kol pages */}
      <Navbar search={search} setSearch={setSearch} />

      {/* Content dyal pages */}
      <Routes>
        <Route path="/" element={<Home search={search} setSearch={setSearch} />} />
        <Route path="/meal/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/listecourses" element={<ListeCourses />} />
      </Routes>
    </div>
  );
}

export default App;
