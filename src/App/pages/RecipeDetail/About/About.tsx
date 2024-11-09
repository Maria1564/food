import Text from "components/Text"
import React from 'react'

import s from "./About.module.scss"

type AboutProps = {
    image?: string,
    totalMinutes?: number,
    ratings?: number,
    servings?:  number
}

const About: React.FC<AboutProps> = ({image, totalMinutes, ratings, servings}) => {
  return (
    <div className={s.about}>
          <img src={image} alt="img" />
          <div className={s.about__general}>
            <div className={s.about__total}>
              <Text tag="span" view="p-16">
                Total
              </Text>
              <Text
                tag="span"
                view="p-16"
                weight="medium"
                className={s["about__general-text"]}
              >
                {totalMinutes} minutes
              </Text>
            </div>
            <div className={s.total}>
              <Text tag="span" view="p-16">
                Ratings
              </Text>
              <Text
                tag="span"
                view="p-16"
                weight="medium"
                className={s["about__general-text"]}
              >
                {ratings} likes
              </Text>
            </div>
            <div className={s.serving}>
              <Text tag="span" view="p-16">
                Servings
              </Text>
              <Text
                tag="span"
                view="p-16"
                weight="medium"
                className={s["about__general-text"]}
              >
                {servings} servings
              </Text>
            </div>
          </div>
        </div>
  )
}

export default About