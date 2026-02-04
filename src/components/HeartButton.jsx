import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function HeartButton({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // 1. Chof wach l-recette deja f favoris mli t-hell l-page
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
    const found = favorites.some((fav) => fav.idMeal === recipe.idMeal);
    setIsFavorite(found);
  }, [recipe.idMeal]);

  // 2. Fonction bach t-zid awla t-mhi mn l-favoris
  const toggleFavorite = (e) => {
    e.preventDefault(); // Bach l-clic mat-dich l-page khor
    
    let favorites = JSON.parse(localStorage.getItem("myFavorites")) || [];

    if (isFavorite) {
      // Ila kant deja, n-mhiwha
      favorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
    } else {
      // Ila makantch, n-zidouha
      favorites.push(recipe);
    }

    localStorage.setItem("myFavorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      onClick={toggleFavorite}
      whileTap={{ scale: 0.6 }} // Effet clik
      style={{ cursor: "pointer", display: "inline-block" }}
    >
      <Heart
        size={28}
        fill={isFavorite ? "#ff4d4d" : "transparent"} // Hmr ila kant favori
        color={isFavorite ? "#ff4d4d" : "#5c3a21"}    // Bordure
        strokeWidth={2}
        style={{ transition: "all 0.3s ease" }}
      />
    </motion.div>
  );
}