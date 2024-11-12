import Button from "components/Button";
import Card from "components/Card";
import Loader from "components/Loader";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import s from "./ListRecipes.module.scss";
import Pagination from "../Pagination";
import TimeIcon from "./TimeIcon";
import { observer } from "mobx-react-lite";
import { rootStore } from "store/RootStore";
import { Meta } from "types";
import { ParamsContext } from "../../../../../App/provider/QueryContext";
import { ParamsType } from "./type";



const ListRecipes: React.FC= () => {
  const navigate = useNavigate();
  // const [totalRecipes, setTotalRecipes] = useState(10)
  const [searchParams, setSearchParams] = useSearchParams();
  
  const objContext = useContext(ParamsContext)

  useEffect(() => {
    if(objContext?.queryParams){

      const params:ParamsType  = {
        addRecipeInformation: true,
        fillIngredients: true,
        number: 9,
        offset: objContext?.queryParams.offset,
      }
      const query = searchParams.get("query");
        if (query !== null) {
            params.query = query;
        }

      rootStore.listRecipes.getListAPI(params)
    }
   

    
    console.log(objContext?.queryParams)
  }, [objContext?.queryParams]);

  const redirectToCard = useCallback((idCard: number) => navigate(`${idCard}`), [navigate])

  return (
    <>
     {rootStore.listRecipes.meta === Meta.success ? <div className={s.list}>
        {rootStore.listRecipes.meta=== Meta.success && rootStore.listRecipes.list.map((item) => (
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
      <Pagination  totalRecipes={rootStore.listRecipes.totalResult}/>
    </>
  );
};

export default observer(ListRecipes) ;
