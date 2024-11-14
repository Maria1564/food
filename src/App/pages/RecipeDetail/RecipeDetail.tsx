import { apiClient } from "axiosConfig";
import Text from "components/Text/Text.tsx";
import React, { useEffect, useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useNavigate, useParams } from "react-router-dom";

import About from "./About/About";
import ArrowLeftIcon from "./ArrowLeftIcon";
import PreparationList from "./PreparationList";
import s from "./RecipeDetail.module.scss";

interface IAboutRecipes {
  title: string;
  totalMinutes: number;
  image: string;
  ratings: number;
  servings: number;
  ingredients: string[];
  equipment?: string[];
  steps: string[];
  summary: string;
}
const RecipeDetail: React.FC = () => {
  const [infoRecipes, setInfoRecipes] = useState<IAboutRecipes | null>(null);
  const { id } = useParams();
  const divRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get(`/recipes/${id}/information`).then(({ data }) => {
      console.log(data)
      const arrIngredients = data.extendedIngredients.map(
        (elem: { original: string }) => elem.original
      );

      const arrEquipments = data.analyzedInstructions[0]
        ? data.analyzedInstructions[0].steps.map(
            (elem: { equipment: { localizedName: string }[] }) =>
              elem.equipment.length &&
              elem.equipment.map((item) => item.localizedName)[0]
          )
        : [];

      const sortedArrEquipments = arrEquipments.filter(
        (num: number) => num !== 0
      );
      const arrSteps = data.analyzedInstructions[0]
        ? data.analyzedInstructions[0].steps.map(
            (elem: { step: string }) => elem.step
          )
        : [];

      setInfoRecipes({
        title: data.title,
        image: data.image,
        totalMinutes: data.readyInMinutes,
        ratings: data.aggregateLikes,
        servings: data.servings,
        ingredients: arrIngredients,
        equipment: sortedArrEquipments,
        steps: arrSteps,
        summary: data.summary,
      });
    });
  }, [id]);

  return (
    <div className={s.recipe__wrapper}>
      <div className="container">
        <div className={s.recipe__back} onClick={() => navigate(-1)}>
          <ArrowLeftIcon color="accent" width={32} height={32}/>
          <Text tag="h1" view="title" className={s.recipe__title}>
            {infoRecipes?.title}
          </Text>
        </div>
        <About
          image={infoRecipes?.image}
          ratings={infoRecipes?.ratings}
          totalMinutes={infoRecipes?.totalMinutes}
          servings={infoRecipes?.servings}
        />
        <div ref={divRef} className={s.recipe__summary}>
          {ReactHtmlParser(infoRecipes?.summary || "")}
        </div>
        <div className={s.recipe__details}>
          <PreparationList
            ingredients={infoRecipes?.ingredients || []}
            equipment={infoRecipes?.equipment || []}
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
          {infoRecipes?.steps.map((item, index) => (
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
  );
};

export default RecipeDetail;
