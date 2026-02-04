import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/favoritesSlice";
import { FaHeart } from "react-icons/fa";
import "../App.css";

export default function Favorites() {
  const favorites = useSelector(state => state.favorites.items);
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>
      Aucun favori pour le moment ❤️
    </h2>;
  }

  return (
    <div className="grid">
      {favorites.map(meal => (
        <div key={meal.idMeal} className="card">

          <div
            className="heart-icon"
            onClick={() => dispatch(removeFavorite(meal.idMeal))}
          >
            <FaHeart size={22} color="#f06292" />
          </div>

          <Link to={`/meal/${meal.idMeal}`} style={{ textDecoration: "none", color: "inherit" }}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3>{meal.strMeal}</h3>
            <button className="btn-main">Voir détail</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
