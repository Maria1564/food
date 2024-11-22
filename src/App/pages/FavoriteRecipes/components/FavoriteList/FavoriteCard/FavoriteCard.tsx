import Button from "components/Button";
import Card from "components/Card";
import { NavigationPath } from "layout/Navbar/config";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IRecipeModel } from "store/models/recipe/listRecipes";

type FavoriteCardProps = {
  item: IRecipeModel;
};

const FavoriteCard: React.FC<FavoriteCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const redirectToCard = useCallback(
    (idCard: number) => navigate(`${NavigationPath.RECIPES}/${idCard}`),
    [navigate]
  );
  return (
    <Card
      onClick={redirectToCard.bind(null, item.id)}
      key={item.id}
      image={item.image}
      title={item.title}
      subtitle={item.ingredients}
      contentSlot={`${item.calories} kcal`}
      actionSlot={
        <Button onClick={() => console.log("Click button")}>Delete</Button>
      }
    />
  );
};

export default FavoriteCard;
