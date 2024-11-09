import Button from "components/Button";
import Card from "components/Card";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import s from "./ListRecipes.module.scss";
import { apiClient } from "../../../../../axiosConfig";
import time from "../../assets/time.svg"
import Pagination from "../Pagination";

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


  return (
    <>
      <div className={s.list}>
        {recipes?.map((item) => (
          <Card
            className={s.list__item}
            onClick={() => navigate(`${item.id}`)}
            key={item.id}
            image={item.image}
            captionSlot={<div className={s['list__item-caption']}> <img src={time} alt="" className={s["item__caption-img"]}/> {item.timeReady}</div>}
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
