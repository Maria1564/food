import Text from "components/Text"
import React from 'react'

import dish_tray from "./../assets/dish_tray.svg";
import ladle from "./../assets/ladle.svg";
import s from "./PreparationList.module.scss"

type PreparationListProps = {
    ingredients: string[],
    equipment: string[]
}

const PreparationList:React.FC<PreparationListProps> = ({ingredients, equipment}) => {
  return (
    <>
     <div className={s.recipe__ingredients}>
            <Text tag="h3" view="p-20" weight="medium">
              Ingredients
            </Text>
            <ul className={s['recipe__ingredients-list']}>
              {ingredients.map((item, index) => (
                <li key={index} className={s['recipe__ingredients-item']}>
                  <img src={dish_tray} alt="dish" />
                  <Text tag="span" view="p-16" className={s['recipe__item-text']}>
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.recipe__equipment}>
            <Text tag="h3" view="p-20" weight="medium">
              Equipment
            </Text>
            <ul className={s['recipe__equipment-list']}>
              {equipment?.map((item, index) => (
                <li key={index} className={s['recipe__equipment-item']}>
                  <img src={ladle} alt="ladle" />
                  <Text tag="span" view="p-16" className={s.equipment_text}>
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
    </>
  )
}

export default PreparationList