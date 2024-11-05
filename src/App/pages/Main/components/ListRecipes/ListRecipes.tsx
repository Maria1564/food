import React, { useEffect, useState } from "react";
import s from "./ListRecipes.module.scss";
import Card from "components/Card";
import Button from "components/Button";
import Text from "components/Text"
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { useSearchParams } from "react-router-dom";
import { apiClient } from "../../../../../axiosConfig";
import time from "../../assets/time.svg"

const ListRecipes: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

  const [totalRecipes, setTotalRecipes] = useState(10)

  const [queryParams, setQueryParams] = useState<{
    offset: number;
    page: number;
  }>({
    offset: (Number(Number(searchParams.get("page"))) - 1) * 9,
    page: Number(searchParams.get("page")) || 1,
  });

  const MatchCalories = (summary: string) => {
    const caloriesMatch = summary.match(/(\d+)\s*calories/);
    if (caloriesMatch) {
      const calories = caloriesMatch[1];
      return calories; // Вывод: Калории: 289
    } else {
      console.log("Информация о калориях не найдена.");
    }
  };

  const splitIngredients = (arrayIngr: { name: string }[]): string => {
    // console.log(arrayIngr);
    const result = arrayIngr.map((item: { name: string }) => item.name);
    return result.join(" + ");
  };
  useEffect(() => {
    apiClient
      .get(
        `/recipes/complexSearch?addRecipeInformation=true&fillIngredients=true&number=9&offset=${queryParams.offset}`
      )
      .then(({ data }) => {
        console.log(data,  data.totalResults)
        setTotalRecipes(() =>  data.totalResults)
        const arr = data.results.map(
          (elem: {
            id: number;
            title: string;
            image: string;
            summary: string;
            readyInMinutes: number;
            extendedIngredients: { name: string }[];
          }) => ({
            id: elem.id,
            title: elem.title,
            image: elem.image,
            calories: MatchCalories(elem.summary),
            timeReady: `${elem.readyInMinutes} minutes`,
            ingredients: splitIngredients(elem.extendedIngredients),
          })
        );
        setRecipes(arr);
      })
      .catch((err) => console.log(err.message));
    
  }, [queryParams]);

  // setRecipes([
  // //   {
  // //     calories: "477",
  // //     id: 715415,
  // //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
  // //     ingredients:
  // //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
  // //     timeReady: "55 minutes",
  // //     title: "Red Lentil Soup with Chicken and Turnips",
  // //   },
  //   {
  //     calories: "477",
  //     id: 715416,
  //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
  //     ingredients:
  //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
  //     timeReady: "55 minutes",
  //     title: "Red Lentil Soup with Chicken and Turnips",
  //   },
  //   {
  //     calories: "477",
  //     id: 715417,
  //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
  //     ingredients:
  //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
  //     timeReady: "55 minutes",
  //     title: "Red Lentil Soup with Chicken and Turnips",
  //   },
  //   {
  //     calories: "477",
  //     id: 715418,
  //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
  //     ingredients:
  //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
  //     timeReady: "55 minutes",
  //     title: "Red Lentil Soup with Chicken and Turnips",
  //   },
  //   {
  //     calories: "477",
  //     id: 715419,
  //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
  //     ingredients:
  //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
  //     timeReady: "55 minutes",
  //     title: "Red Lentil Soup with Chicken and Turnips",
  //   },

  //   {
  //     calories: "477",
  //     id: 715420,
  //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
  //     ingredients:
  //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
  //     timeReady: "55 minutes",
  //     title: "Red Lentil Soup with Chicken and Turnips",
  //   },
  //   {
  //     calories: "477",
  //     id: 715421,
  //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
  //     ingredients:
  //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
  //     timeReady: "55 minutes",
  //     title: "Red Lentil Soup with Chicken and Turnips",
  //   },
  //   {
  //     calories: "477",
  //     id: 715422,
  //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
  //     ingredients:
  //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
  //     timeReady: "55 minutes",
  //     title: "Red Lentil Soup with Chicken and Turnips",
  //   },
  //   {
  //     calories: "477",
  //     id: 715423,
  //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
  //     ingredients:
  //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
  //     timeReady: "55 minutes",
  //     title: "Red Lentil Soup with Chicken and Turnips",
  //   },
  //   {
  //     calories: "477",
  //     id: 715424,
  //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
  //     ingredients:
  //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
  //     timeReady: "55 minutes",
  //     title: "Red Lentil Soup with Chicken and Turnips",
  //   },
  //   //   {
  //   //     calories: "477",
  //   //     id: 715425,
  //   //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
  //   //     ingredients:
  //   //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
  //   //     timeReady: "55 minutes",
  //   //     title: "Red Lentil Soup with Chicken and Turnips",
  //   //   },
  //   //   {
  //   //     calories: "477",
  //   //     id: 715426,
  //   //     image: "https://img.spoonacular.com/recipes/715415-312x231.jpg",
  //   //     ingredients:
  //   //       "additional toppings: avocado + carrots + celery stalks + chicken breast + flat leaf parsley + garlic + olive oil + canned tomatoes + lentils + salt and pepper + turnip + vegetable stock + onion",
  //   //     timeReady: "55 minutes",
  //   //     title: "Red Lentil Soup with Chicken and Turnips",
  //   //   },
  // ]);

  return (
    <>
      <div className={s.list}>
        {recipes?.map((item) => (
          <Card
            className={s.card_recipe}
            onClick={() => navigate(`${item.id}`)}
            key={item.id}
            image={item.image}
            captionSlot={<> <img src={time} alt="" className={s.caption_img}/> {item.timeReady}</>}
            title={item.title}
            subtitle={item.ingredients}
            contentSlot={`${item.calories} kcal`}
            actionSlot={
              <Button onClick={() => console.log("Click button")}>Save</Button>
            }
          />
        ))}
      </div>
      <Pagination setQueryParams={setQueryParams} totalRecipes={totalRecipes}/>
    </>
  );
};

export default ListRecipes;
