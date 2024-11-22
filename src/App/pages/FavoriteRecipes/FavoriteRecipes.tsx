import Text from "components/Text";
import React from "react";

import FavoriteList from "./components/FavoriteList";
import s from "./FavoriteRecipes.module.scss";

const FavoriteRecipes: React.FC = () => {
  return (
    <div className={s.favorite}>
      <div className="container">
        <Text tag="h1" view="title" className={s.favorite__title}>
          Favorites
        </Text>
        <FavoriteList/>
      </div>
    </div>
  );
};

export default FavoriteRecipes;
