
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then(res => res.json())
    .then(data => setMeals(data.meals));
}, []);


  return (
    <div style={{ padding: "20px" }}>
      <h2>Recipes</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {meals.map(meal => (
          <Link key={meal.idMeal} to={`/meal/${meal.idMeal}`} style={{ textDecoration: "none", color: "black" }}>
            <div style={{ width: "200px" }}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <h4>{meal.strMeal}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
