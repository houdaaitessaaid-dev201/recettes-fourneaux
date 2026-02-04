import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Favorites from "./components/Favorites";
import ListeCourses from "./components/ListeCourses";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/listecourses" element={<ListeCourses />} />

      </Routes>
    </div>
  );
}

export default App;