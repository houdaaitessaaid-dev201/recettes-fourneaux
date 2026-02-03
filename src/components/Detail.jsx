import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../App.css';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setMeal(data.meals[0]));
  }, [id]);

  if (!meal) return <p style={{textAlign: 'center', marginTop: '50px'}}>Chargement...</p>;

  return (
    <div className="detail-container">
      <button className="btn-main" onClick={() => navigate(-1)}>← Retour</button>
      
      <div className="detail-card" style={{marginTop: '20px'}}>
        <div className="detail-header">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-img" />
          <div>
            <h1>{meal.strMeal}</h1>
            <p><strong>Catégorie:</strong> {meal.strCategory}</p>
            <p><strong>Origine:</strong> {meal.strArea}</p>
            {meal.strYoutube && (
              <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="btn-youtube">
                Regarder sur YouTube
              </a>
            )}
          </div>
        </div>

        <div className="detail-content">
          <div>
            <h3>Ingrédients</h3>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
                const ing = meal[`strIngredient${i}`];
                const meas = meal[`strMeasure${i}`];
                return ing ? <li key={i}>{ing} - <small>{meas}</small></li> : null;
              })}
            </ul>
          </div>
          <div>
            <h3>Instructions</h3>
            <p className="instructions-text">{meal.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}