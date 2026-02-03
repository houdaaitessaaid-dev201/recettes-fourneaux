import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setMeal(data.meals[0]));
  }, [id]);

  if (!meal) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{meal.strMeal}</h2>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: "300px", borderRadius: "15px" }}
      />

      <h3>Ingredients</h3>
      <ul>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];

          if (!ingredient) return null;

          return (
            <li key={i}>
              {ingredient} - {measure}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
