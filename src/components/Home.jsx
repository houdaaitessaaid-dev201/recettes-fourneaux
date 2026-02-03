import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import '../App.css';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then(res => res.json())
      .then(data => setRecipes(data.meals || []));
  }, []);

  const filteredRecipes = recipes.filter(e =>
    e.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />
      <div className="hero">
        <h1>Bienvenue chez Teste Trip</h1>
        <p>Découvrez des recettes gourmandes et faciles</p>
      </div>

      <div className="grid">
        {filteredRecipes.map(e => (
          <div key={e.idMeal} className="card">
            <Link to={`/meal/${e.idMeal}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={e.strMealThumb} alt={e.strMeal} />
              <h3>{e.strMeal}</h3>
              <button className="btn-main">Découvrir</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}