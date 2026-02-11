import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import { addIngredients } from "../redux/courseSlice";
import { purchaseMeal } from "../redux/premiumSlice";
import { FaHeart } from "react-icons/fa";
import foodVideo from "../assets/food.mp4";

export default function Home({ search, setSearch }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [showRecipes, setShowRecipes] = useState(false);

  // For modal
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showPay, setShowPay] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const purchasedMeals = useSelector((state) => state.premium.purchasedMeals);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllRecipes = async () => {
      setLoading(true);
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

      try {
        const promises = alphabet.map((l) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`).then(
            (res) => res.json()
          )
        );

        const results = await Promise.all(promises);
        const allMeals = results
          .map((res) => res.meals)
          .filter((m) => m !== null)
          .flat();

        setRecipes(allMeals);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  const filteredRecipes = recipes.filter((e) =>
    e.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  const isFav = (id) => favorites.some((e) => e.idMeal === id);

  const extractIngredients = (meal) => {
    let list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim() !== "") list.push({ name: ing, measure: meas });
    }
    return list;
  };

  const handleAddToListAndView = (meal) => {
    const ingredients = extractIngredients(meal);
    dispatch(addIngredients(ingredients));
    setMsg(`✅ Ingredients of "${meal.strMeal}" added to shopping list!`);
    setTimeout(() => setMsg(""), 3000);
    navigate(`/meal/${meal.idMeal}`);
  };

  const handleExplore = () => {
    if (recipes.length === 0) return;
    setShowRecipes(true);
    setTimeout(() => {
      const recipesSection = document.querySelector(".grid.recipes-wrapper");
      if (recipesSection) {
        recipesSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  // Payment modal handlers
  const handleUnlockClick = (meal) => {
    setSelectedMeal(meal);
    setShowPay(true);
  };

  const handlePay = () => {
    if (!selectedMeal) return;
    dispatch(purchaseMeal(selectedMeal.idMeal));
    setShowPay(false);
    setSelectedMeal(null);
    setMsg(`✅ You unlocked "${selectedMeal.strMeal}"!`);
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="home">
      {msg && <div className="notification">{msg}</div>}

      {/* HERO SECTION */}
      <div className="hero-cinema">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src={foodVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Test <span>Trip</span>
          </h1>
          <p className="hero-sub">
            Discover recipes from around the world <br />
            Easy, tasty, and unforgettable
          </p>
          <div className="hero-actions">
            <button className="hero-btn main" onClick={handleExplore}>
              Explore 🍳
            </button>
          </div>
        </div>
      </div>

      {/* RECIPES */}
      {showRecipes && (
        loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Loading recipes...</p>
          </div>
        ) : (
          <div className="grid recipes-wrapper">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((e) => {
                const isPurchased = purchasedMeals.includes(e.idMeal);
                return (
                  <div key={e.idMeal} className="card">
                    <img
                      src={e.strMealThumb}
                      alt={e.strMeal}
                      style={{ cursor: "pointer", borderRadius: "8px" }}
                      onClick={() => {
                        if (isPurchased) handleAddToListAndView(e);
                        else handleUnlockClick(e);
                      }}
                    />
                    <h3>{e.strMeal}</h3>
                    <div className="btn-heart-container">
                      {isPurchased ? (
                        <button
                          className="btn-main"
                          onClick={() => handleAddToListAndView(e)}
                        >
                          Add to List & View
                        </button>
                      ) : (
                        <button
                          className="btn-main locked"
                          onClick={() => handleUnlockClick(e)}
                        >
                          🔒 Unlock Recipe
                        </button>
                      )}

                      <FaHeart
                        size={24}
                        className={`favorite-icon ${isFav(e.idMeal) ? "fav" : ""}`}
                        onClick={() => {
                          if (isFav(e.idMeal)) dispatch(removeFavorite(e.idMeal));
                          else dispatch(addFavorite(e));
                        }}
                      />
                    </div>
                    {!isPurchased && <p className="premium-text">🔒 Premium</p>}
                  </div>
                );
              })
            ) : (
              <p style={{ textAlign: "center", gridColumn: "1/-1" }}>
                No recipes found.
              </p>
            )}
          </div>
        )
      )}

      {/* PAYMENT MODAL */}
      {showPay && selectedMeal && (
        <div className="pay-overlay">
          <div className="pay-modal">
            <h2>💳 Premium Access</h2>
            <p>
              Unlock <strong>{selectedMeal.strMeal}</strong><br />
              Ingredients + Instructions
            </p>
            <div className="pay-actions">
              <button className="btn-main" onClick={handlePay}>
                Pay 19 MAD ✅
              </button>
              <button className="btn-cancel" onClick={() => setShowPay(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
