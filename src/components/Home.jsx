import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import { FaHeart } from "react-icons/fa";
import { addIngredients } from "../redux/courseSlice";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(""); // 🟢 state للرسالة

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const navigate = useNavigate();

  // Fetch recipes
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
        console.error("Erreur API:", err);
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

  // 🟢 Function باش نضيف ingredients ونظهر message
  const handleAddListe = (meal) => {
    const ingredients = extractIngredients(meal);
    dispatch(addIngredients(ingredients));
    setMsg("✅ Les ingrédients ont été ajoutés à la liste de courses !");
    setTimeout(() => setMsg(""), 3000); // message يختفي بعد 3 ثواني
  };

  return (
    <div className="home">
      <Navbar search={search} setSearch={setSearch} />

      {/* 🟢 Message Notification */}
      {msg && <div className="notification">{msg}</div>}


      <div className="hero">
        <h1>Bienvenue chez Taste Trip</h1>
        <p>Découvrez des recettes gourmandes et faciles</p>
      </div>

      {loading ? (
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Chargement des recettes...
        </h2>
      ) : (
        <div className="grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(e => (
              <div key={e.idMeal} className="card">

                {/* ❤️ Favorite */}
                <div
                  className="heart-icon"
                  onClick={() => {
                    isFav(e.idMeal)
                      ? dispatch(removeFavorite(e.idMeal))
                      : dispatch(addFavorite(e));
                  }}
                >
                  <FaHeart
                    size={22}
                    color={isFav(e.idMeal) ? "#f06292" : "#ccc"}
                  />
                </div>

                {/* الصورة للتفاصيل */}
                <img
                  src={e.strMealThumb}
                  alt={e.strMeal}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/meal/${e.idMeal}`)}
                />
                <h3>{e.strMeal}</h3>

                {/* 🟢 Add Liste Button */}
                <button
                  className="btn-main"
                  onClick={() => handleAddListe(e)}
                >
                  Add Liste 🛒
                </button>

              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1/-1" }}>
              Aucune recette trouvée.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
