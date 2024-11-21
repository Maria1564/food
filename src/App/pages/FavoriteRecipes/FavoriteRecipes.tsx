import Text from "components/Text";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import s from "./FavoriteRecipes.module.scss";

const FavoriteRecipes: React.FC = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    const favorites = localStorage.getItem("listFavoritesRecipes");
    if (favorites) {
      setList(JSON.parse(favorites));
    }
  }, []);

  return (
    <div className={s.favorite}>
      <div className="container">
        <Text tag="h1" view="title" className={s.favorite__title}>
          Favorites
        </Text>
      </div>
    </div>
  );
};

export default FavoriteRecipes;
