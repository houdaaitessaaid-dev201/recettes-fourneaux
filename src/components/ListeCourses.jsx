import { useSelector, useDispatch } from "react-redux";
import { removeIngredient, clearList } from "../redux/courseSlice";
import "../App.css";

export default function ListeCourses() {
  const items = useSelector(state => state.courses.items);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>
      Liste de courses vide 🛒
    </h2>;
  }

  return (
    <div className="detail-container">
      <h1>🛒 Liste de courses</h1>

      <ul style={{ marginTop: "20px" }}>
        {items.map((i, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {i.name} <small>({i.measure})</small>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => dispatch(removeIngredient(i.name))}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <button className="btn-main" onClick={() => dispatch(clearList())}>
        Vider la liste
      </button>
    </div>
  );
}
