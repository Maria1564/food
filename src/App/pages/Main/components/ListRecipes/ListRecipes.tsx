import React, { useEffect, useState } from "react";
import s from "./ListRecipes.module.scss";
import Card from "components/Card";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";
// import { apiClient } from "../../../../../axiosConfig";

const ListRecipes: React.FC = () => {
    const navigate = useNavigate()
  const [recipes, setRecipes] = useState<
    {
      id: number;
      calories: string;
      image: string;
      ingredients: string;
      timeReady: string;
      title: string;
    }[]
  >([]);

//   const MatchCalories = (summary: string) => {
//     const caloriesMatch = summary.match(/(\d+)\s*calories/);
//     if (caloriesMatch) {
//       const calories = caloriesMatch[1];
//       return calories; // Вывод: Калории: 289
//     } else {
//       console.log("Информация о калориях не найдена.");
//     }
//   };

//   const splitIngredients = (arrayIngr: { name: string }[]): string => {
//     console.log(arrayIngr);
//     const result = arrayIngr.map((item: { name: string }) => item.name);
//     return result.join(" + ");
//   };
  useEffect(() => {
    // apiClient.get("/recipes/complexSearch?addRecipeInformation=true&fillIngredients=true")
    // .then(({data}) => {
    //     console.log(data.results[0])
    //     // splitIngredients(data.results[0].extendedIngredients)
    //     const obj = {
    //         id: data.results[0].id,
    //         title: data.results[0].title,
    //         image: data.results[0].image,
    //         calories: MatchCalories(data.results[0].summary),
    //         timeReady: `${data.results[0].readyInMinutes} minutes`,
    //         ingredients: splitIngredients(data.results[0].extendedIngredients)
    //     }

    //     console.log(obj)
    // })
    // .catch(err => console.log(err.message))

    setRecipes([
    //   {
    //     calories: "477",
    //     id: 715415,
    //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
    //     ingredients:
    //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
    //     timeReady: "55 minutes",
    //     title: "Red Lentil Soup with Chicken and Turnips",
    //   },
      {
        calories: "477",
        id: 715416,
        image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
        ingredients:
          "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
        timeReady: "55 minutes",
        title: "Red Lentil Soup with Chicken and Turnips",
      },
      {
        calories: "477",
        id: 715417,
        image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
        ingredients:
          "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
        timeReady: "55 minutes",
        title: "Red Lentil Soup with Chicken and Turnips",
      },
      {
        calories: "477",
        id: 715418,
        image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
        ingredients:
          "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
        timeReady: "55 minutes",
        title: "Red Lentil Soup with Chicken and Turnips",
      },
      {
        calories: "477",
        id: 715419,
        image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
        ingredients:
          "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
        timeReady: "55 minutes",
        title: "Red Lentil Soup with Chicken and Turnips",
      },

      {
        calories: "477",
        id: 715420,
        image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
        ingredients:
          "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
        timeReady: "55 minutes",
        title: "Red Lentil Soup with Chicken and Turnips",
      },
      {
        calories: "477",
        id: 715421,
        image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
        ingredients:
          "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
        timeReady: "55 minutes",
        title: "Red Lentil Soup with Chicken and Turnips",
      },
      {
        calories: "477",
        id: 715422,
        image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
        ingredients:
          "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
        timeReady: "55 minutes",
        title: "Red Lentil Soup with Chicken and Turnips",
      },
      {
        calories: "477",
        id: 715423,
        image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
        ingredients:
          "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
        timeReady: "55 minutes",
        title: "Red Lentil Soup with Chicken and Turnips",
      },
      {
        calories: "477",
        id: 715424,
        image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
        ingredients:
          "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
        timeReady: "55 minutes",
        title: "Red Lentil Soup with Chicken and Turnips",
      },
      //   {
      //     calories: "477",
      //     id: 715425,
      //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
      //     ingredients:
      //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
      //     timeReady: "55 minutes",
      //     title: "Red Lentil Soup with Chicken and Turnips",
      //   },
      //   {
      //     calories: "477",
      //     id: 715426,
      //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
      //     ingredients:
      //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
      //     timeReady: "55 minutes",
      //     title: "Red Lentil Soup with Chicken and Turnips",
      //   },
    ]);
  }, []);

  return (
    <div className={s.list}>
      {recipes?.map((item) => (
        <Card className={s.card_recipe}
        onClick={()=>navigate(`/${item.id}`)}
          key={item.id}
          image={item.image}
          captionSlot={item.timeReady}
          title={item.title}
          subtitle={item.ingredients}
          contentSlot={`${item.calories} kcal`}
          actionSlot={<Button onClick={()=>console.log("Click button")}>Save</Button>}
        />
      ))}
    </div>
  );
};

export default ListRecipes;
