// Detail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaYoutube } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { purchaseMeal } from "../redux/premiumSlice";
import { addIngredients } from "../redux/courseSlice";
import "../App.css";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [meal, setMeal] = useState(null);
  const [showPay, setShowPay] = useState(false);
  const [msg, setMsg] = useState("");

  const purchasedMeals = useSelector(state => state.premium.purchasedMeals);
  const isPurchased = purchasedMeals.includes(id);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setMeal(data.meals[0]));
  }, [id]);

  if (!meal) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  const handlePay = () => {
    dispatch(purchaseMeal(id));
    setShowPay(false);
  };

  const extractIngredients = (meal) => {
    let list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim() !== "") list.push({ name: ing, measure: meas });
    }
    return list;
  };

  const handleAddListe = () => {
    const ingredients = extractIngredients(meal);
    dispatch(addIngredients(ingredients));
    setMsg("✅ Ingredients added to shopping list!");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="recipe-page">
      {msg && <div className="notification">{msg}</div>}

      {/* HERO */}
      <div className="recipe-hero" style={{ backgroundImage: `url(${meal.strMealThumb})` }}>
        <div className="recipe-overlay" />
        <button className="recipe-back" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className="recipe-hero-content">
          <h1>{meal.strMeal}</h1>
          <p>{meal.strCategory} • {meal.strArea}</p>
          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="recipe-youtube">
              <FaYoutube /> Watch on YouTube
            </a>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="recipe-content">

        {!isPurchased && (
          <div className="recipe-box fade-in premium-lock">
            <h2>🔒 Premium Recipe</h2>
            <p>Unlock ingredients & instructions</p>
            <button className="btn-main" onClick={() => setShowPay(true)}>
              Unlock Recipe 🔓
            </button>
          </div>
        )}

        {isPurchased && (
          <>
            <div className="recipe-box fade-in">
              <h2>Ingredients</h2>
              <ul className="ingredients-grid">
                {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
                  const ing = meal[`strIngredient${i}`];
                  const meas = meal[`strMeasure${i}`];
                  return ing ? <li key={i}><span>{ing}</span> <small>{meas}</small></li> : null;
                })}
              </ul>
              <button className="btn-main" onClick={handleAddListe}>Add to List 🛒</button>
            </div>

            <div className="recipe-box fade-in">
              <h2>Instructions</h2>
              <p className="recipe-text">{meal.strInstructions}</p>
            </div>
          </>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {showPay && (
        <div className="pay-overlay">
          <div className="pay-modal">
            <h2>💳 Premium Access</h2>
            <p>Unlock <strong>{meal.strMeal}</strong><br />Ingredients + Instructions</p>
            <div className="pay-actions">
              <button className="btn-main" onClick={handlePay}>Pay 19 MAD ✅</button>
              <button className="btn-cancel" onClick={() => setShowPay(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
