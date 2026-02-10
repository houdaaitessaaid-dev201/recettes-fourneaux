import { useSelector, useDispatch } from "react-redux";
import { removeIngredient, clearList } from "../redux/courseSlice";
import "../App.css";

export default function ListeCourses() {
  const items = useSelector(state => state.courses.items);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>🛒 Liste de courses vide</h2>
        <p>Ajoutez des ingrédients depuis vos recettes ✨</p>
      </div>
    );
  }

  return (
    <div className="courses-container">
      <h1 className="courses-title">
        🛒 Ma liste de courses
      </h1>

      <ul className="courses-list">
        {items.map((i, index) => (
          <li key={index} className="course-item">
            <div>
              <span className="ingredient-name">{i.name}</span>
              <small className="ingredient-measure">
                {i.measure}
              </small>
            </div>

            <button
              className="remove-btn"
              onClick={() => dispatch(removeIngredient(i.name))}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <button className="btn-clear" onClick={() => dispatch(clearList())}>
        Vider la liste 🗑️
      </button>
    </div>
  );
}
