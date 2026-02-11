import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/favoritesSlice";
import { addIngredients } from "../redux/courseSlice";
import { purchaseMeal } from "../redux/premiumSlice";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import "../App.css";

export default function Favorites() {
  const favorites = useSelector(state => state.favorites.items);
  const purchasedMeals = useSelector(state => state.premium.purchasedMeals);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [modalMeal, setModalMeal] = useState(null);

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
      if (ing && ing.trim() !== "") list.push({ name: ing, measure: meas });
    }
    return list;
  };

  const handleAddListe = (meal) => {
    const ingredients = extractIngredients(meal);
    dispatch(addIngredients(ingredients));
    setMsg(`✅ "${meal.strMeal}" ajouté à la liste !`);
    setTimeout(() => setMsg(""), 3000);
  };

  const handleUnlockRecipe = (meal) => {
    setModalMeal(meal); // show modal
  };

  const confirmPayment = () => {
    if (modalMeal) {
      const price = 5; // example
      dispatch(purchaseMeal(modalMeal.idMeal));
      setMsg(`✅ You paid $${price}. Recipe unlocked!`);
      setTimeout(() => setMsg(""), 3000);
      setModalMeal(null);
    }
  };

  const cancelPayment = () => setModalMeal(null);

  const isPurchased = (mealId) => purchasedMeals.includes(mealId);

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
              onClick={() => {
                if (isPurchased(meal.idMeal)) navigate(`/meal/${meal.idMeal}`);
                else handleUnlockRecipe(meal);
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
            </div>

            {/* Button */}
            {isPurchased(meal.idMeal) ? (
              <button
                className="btn-main"
                onClick={() => handleAddListe(meal)}
              >
                Add to List & View
              </button>
            ) : (
              <button
                className="btn-main locked"
                onClick={() => handleUnlockRecipe(meal)}
              >
                🔒 Unlock Recipe
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {modalMeal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Unlock Recipe 🍽️</h3>
            <p>
              Recipe: <strong>{modalMeal.strMeal}</strong>
            </p>
            <p>Price: <strong>$5</strong></p>
            <div className="modal-buttons">
              <button className="btn-main" onClick={confirmPayment}>Pay & Unlock</button>
              <button className="btn-cancel" onClick={cancelPayment}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
