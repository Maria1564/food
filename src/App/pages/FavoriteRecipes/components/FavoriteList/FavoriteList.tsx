import Text from "components/Text";
import React, { useEffect, useState } from "react";

import FavoriteCard from "./FavoriteCard";
import s from "./FavoriteList.module.scss";

const FavoriteList: React.FC = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const favorites = localStorage.getItem("listFavoritesRecipes");
    if (favorites) {
      setList(JSON.parse(favorites));
    }
  }, []);

  return (
    <div className={s.list}>
      {list.length ? (
        list.map((item) => <FavoriteCard item={item} />)
      ) : (
        <Text tag="h3" weight="normal" view="p-20" color="accent">
          Empty list
        </Text>
      )}
    </div>
  );
};

export default FavoriteList;
