import Button from "components/Button";
import Card from "components/Card";
import Loader from "components/Loader";
import { observer } from "mobx-react-lite";
import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ListRecipesStore } from "store/ListRecipesStore";
import { ParamsType } from "store/ListRecipesStore/type";
import { Meta } from "types";
import { useLocalStore } from "utils/useLocalStore";

import s from "./ListRecipes.module.scss";
import Pagination from "../Pagination";
import TimeIcon from "./TimeIcon";
import { ParamsContext } from "../../../../../App/provider/QueryContext";
import { useListRecipes } from "../../context";


const ListRecipes: React.FC= () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const objContext = useContext(ParamsContext)
  const localStoreList = useLocalStore(()=>new ListRecipesStore())
  const context = useListRecipes()
  

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
        localStoreList.getListAPI(params)
    }
   

    
  }, [localStoreList, objContext?.queryParams, searchParams]);

  
  useEffect(()=>{
    if(localStoreList.meta === Meta.success && context !== null){
      context.handlerSetList(localStoreList.list)
    }
  }, [context, localStoreList.list, localStoreList.meta])

  const redirectToCard = useCallback((idCard: number) => navigate(`${idCard}`), [navigate])
  
  if (localStoreList.meta === Meta.loading) {
      return <Loader />
  }


  return (
    <>
     <div className={s.list}>
        {localStoreList.meta=== Meta.success && localStoreList.list.map((item) => (
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
      </div>
      <Pagination  totalRecipes={localStoreList.totalResult}/>
    </>    
  );
};

export default observer(ListRecipes) ;
