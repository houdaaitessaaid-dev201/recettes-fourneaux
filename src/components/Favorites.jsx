import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/favoritesSlice";
import { addIngredients } from "../redux/courseSlice";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import "../App.css";

export default function Favorites() {
  const favorites = useSelector(state => state.favorites.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>Aucun favori pour le moment ❤️</h2>
        <p>Ajoutez vos recettes préférées pour les retrouver ici !</p>
      </div>
    );
  }

  const extractIngredients = (meal) => {
    let list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim() !== "") {
        list.push({ name: ing, measure: meas });
      }
    }
    return list;
  };

  const handleAddListe = (meal) => {
    const ingredients = extractIngredients(meal);
    dispatch(addIngredients(ingredients));
    setMsg(`✅ "${meal.strMeal}" ajouté à la liste !`);

    setTimeout(() => setMsg(""), 3000); // auto hide after 3s
  };

  return (
    <div className="favorites-container">
      {msg && <div className="notification">{msg}</div>}

      <h2 className="favorites-title">Mes Favoris ❤️</h2>
      <div className="grid">
        {favorites.map(meal => (
          <div key={meal.idMeal} className="card">
            {/* Heart icon */}
            <div
              className="favorite-icon fav"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeFavorite(meal.idMeal));
              }}
            >
              <FaHeart size={26} />
            </div>

            {/* Image + title */}
            <div
              onClick={() => navigate(`/meal/${meal.idMeal}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
            </div>

            {/* Add to List Button */}
            <button
              className="btn-main"
              onClick={() => handleAddListe(meal)}
            >
              Add to List 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
