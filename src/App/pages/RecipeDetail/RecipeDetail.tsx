import Text from "components/Text/Text.tsx";
import React, { useEffect, useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useNavigate, useParams } from "react-router-dom";
import { Meta } from "types";
import { rootStore } from "store/RootStore";
import Loader from "components/Loader";

import About from "./About/About";
import ArrowLeftIcon from "./ArrowLeftIcon";
import PreparationList from "./PreparationList";
import s from "./RecipeDetail.module.scss";
import { observer } from "mobx-react-lite";

 const RecipeDetail: React.FC = () => {
  const { id } = useParams();
  const divRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(id){
      rootStore.selectedRecipe.getInfoRecipe(id)
    }
  }, [id]);

  
  if(rootStore.selectedRecipe.meta === Meta.loading){
    return <Loader/>
  }

  if(rootStore.selectedRecipe.meta === Meta.error){
    return <h1>Error</h1>
  }
  return (
    <>
      {
        rootStore.selectedRecipe.meta === Meta.success &&
        <div className={s.recipe__wrapper}>
      <div className="container">
        <div className={s.recipe__back} onClick={() => navigate(-1)}>
          <ArrowLeftIcon color="accent" width={32} height={32} className={s['recipe__arrow-icon']}/>
          <Text tag="h1" view="title" className={s.recipe__title}>
            {rootStore.selectedRecipe.infoRecipe.title}
          </Text>
        </div>
        <About
          image={rootStore.selectedRecipe.infoRecipe.image}
          ratings={rootStore.selectedRecipe.infoRecipe.ratings}
          totalMinutes={rootStore.selectedRecipe.infoRecipe.totalMinutes}
          servings={rootStore.selectedRecipe.infoRecipe.servings}
        />
        <div ref={divRef} className={s.recipe__summary}>
          {ReactHtmlParser(rootStore.selectedRecipe.infoRecipe.summary || "")}
        </div>
        <div className={s.recipe__details}>
          <PreparationList
            ingredients={rootStore.selectedRecipe.infoRecipe.ingredients || []}
            equipment={rootStore.selectedRecipe.infoRecipe.equipment || []}
          />
        </div>
        <div className={s.recipe__directions}>
          <Text
            tag="h3"
            view="p-20"
            weight="medium"
            className={s[`recipe__directions-title`]}
          >
            Directions
          </Text>
          {rootStore.selectedRecipe.infoRecipe.steps.map((item, index) => (
            <div className={s.recipe__step} key={index}>
              <Text
                tag="h4"
                view="p-16"
                weight="medium"
                className={s["recipe__step-title"]}
              >
                Step {index + 1}
              </Text>
              <Text tag="p" view="p-14">
                {" "}
                {item}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
      }
    </>
  );
};


export default observer(RecipeDetail) 