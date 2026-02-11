import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./components/Home";
import Detail from "./components/Detail";
import Favorites from "./components/Favorites";
import ListeCourses from "./components/ListeCourses";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="container">
      {/* Navbar كيبقى فكل الصفحات */}
      <Navbar search={search} setSearch={setSearch} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home search={search} setSearch={setSearch} />} />
        <Route path="/meal/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/listecourses" element={<ListeCourses />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
