import { apiClient } from "axiosConfig";
import Button from "components/Button";
import Card from "components/Card";
import Loader from "components/Loader";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import s from "./ListRecipes.module.scss";
import Pagination from "../Pagination";
import TimeIcon from "./TimeIcon";
import { TypeIngredients, TypeRecipes, TypeResponse } from "./type";

const ListRecipes: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<TypeRecipes>([]);

  const [totalRecipes, setTotalRecipes] = useState(10)

  const [queryParams, setQueryParams] = useState<{
    offset: number;
    page: number;
  }>({
    offset: searchParams.get("page") ? ((Number(searchParams.get("page"))) - 1) * 9 : 0,
    page: Number(searchParams.get("page")) || 1,
  });

  const MatchCalories = useCallback((summary: string) => {
    const caloriesMatch = summary.match(/(\d+)\s*calories/);
    if (caloriesMatch) {
      const calories = caloriesMatch[1];
      return calories; 
    } else {
      console.log("Информация о калориях не найдена.");
    }
  }, []);

  const splitIngredients = useCallback((arrayIngr: TypeIngredients): string => {
    const result = arrayIngr.map((item) => item.name);
    return result.join(" + ");
  }, []);

  useEffect(() => {
    const params = {
      addRecipeInformation: true,
      fillIngredients: true,
      number: 9,
      offset: queryParams.offset
    }
    const getListRecipes = async()=>{
      try {
        const {data} = await apiClient.get(`/recipes/complexSearch`, {params} )
        
        setTotalRecipes(() =>  data.totalResults)
        const arr = data.results.map(
              (elem: TypeResponse
              ) => ({
                id: elem.id,
                title: elem.title,
                image: elem.image,
                calories: MatchCalories(elem.summary),
                timeReady: `${elem.readyInMinutes} minutes`,
                ingredients: splitIngredients(elem.extendedIngredients),
              })
            );

            setRecipes(arr);
          
      } catch (error) {
        if(error instanceof Error){
          console.log(error.message)
        }
      }
      
    }

    getListRecipes()
    
  }, [queryParams, MatchCalories, splitIngredients]);

  const redirectToCard = useCallback((idCard: number) => navigate(`${idCard}`), [navigate])

  return (
    <>
     {recipes.length ? <div className={s.list}>
        {recipes.map((item) => (
          <Card
            className={s.list__item}
            onClick={redirectToCard.bind(null, item.id)}
            key={item.id}
            image={item.image}
            captionSlot={<div className={s['list__item-caption']}> <TimeIcon width={14} height={14} color="accent"/> {item.timeReady}</div>}
            title={item.title}
            subtitle={item.ingredients}
            contentSlot={`${item.calories} kcal`}
            actionSlot={
              <Button onClick={() => console.log("Click button")}>Save</Button>
            }
          />
        ))}
      </div> : <Loader/>}
      <Pagination setQueryParams={setQueryParams} totalRecipes={totalRecipes}/>
    </>
  );
};

export default ListRecipes;
