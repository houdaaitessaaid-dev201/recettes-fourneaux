import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import { addIngredients } from "../redux/courseSlice";
import { FaHeart } from "react-icons/fa";
import { purchaseMeal } from "../redux/premiumSlice";
import foodVideo from "../assets/food.mp4";

export default function Home({ search, setSearch }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const purchasedMeals = useSelector(state => state.premium.purchasedMeals);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllRecipes = async () => {
      setLoading(true);
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
      try {
        const promises = alphabet.map(l =>
          fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
            .then(res => res.json())
        );
        const results = await Promise.all(promises);
        const allMeals = results
          .map(res => res.meals)
          .filter(m => m !== null)
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

  const filteredRecipes = recipes.filter(e =>
    e.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  const isFav = (id) => favorites.some(e => e.idMeal === id);

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
    setMsg("✅ Ingredients added to shopping list!");
    setTimeout(() => setMsg(""), 3000);
  };

  const scrollToRecipes = () => {
    const recipesSection = document.querySelector(".grid");
    if (recipesSection) {
      recipesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home">
      {msg && <div className="notification">{msg}</div>}

      <div className="hero-cinema">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src={foodVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Test <span>Trip</span></h1>
          <p className="hero-sub">
            Discover recipes from around the world<br />
            Easy, tasty, and unforgettable
          </p>
          <div className="hero-actions">
            <button className="hero-btn main" onClick={scrollToRecipes}>
              Explore 🍳
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading recipes...</p>
        </div>
      ) : (
        <div className="grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(e => {
              const isPurchased = purchasedMeals.includes(e.idMeal);
              return (
                <div key={e.idMeal} className="card">
                  <img
                    src={e.strMealThumb}
                    alt={e.strMeal}
                    style={{ cursor: "pointer", borderRadius: "8px" }}
                    onClick={() => navigate(`/meal/${e.idMeal}`)}
                  />
                  <h3>{e.strMeal}</h3>

                  {/* BUTTON + HEART + PREMIUM */}
                  <div className="btn-heart-container">
                    <button className="btn-main" onClick={() => handleAddListe(e)}>
                      Add to List 🛒
                    </button>

                    <FaHeart
                      size={24}
                      className={`favorite-icon ${isFav(e.idMeal) ? "fav" : ""}`}
                      onClick={() => {
                        if (isFav(e.idMeal)) {
                          dispatch(removeFavorite(e.idMeal));
                        } else {
                          dispatch(addFavorite(e));
                        }
                      }}
                    />

                   
                  </div>
                   {!isPurchased && (
                      <p className="premium-text">🔒 Premium</p>
                    )}
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1/-1" }}>No recipes found.</p>
          )}
        </div>
      )}
    </div>
  );
}
