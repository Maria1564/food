import classNames from "classnames";
import Text from "components/Text";
import React from "react";

import imgBg from "./assets/main_bg.png";
import FilterTypes from "./components/FilterTypes";
import ListRecipes from "./components/ListRecipes";
import Search from "./components/Search";
import s from "./Main.module.scss";

const Main: React.FC = () => {

  return (
    <div className={s.maim}>
      <div className={s.main__wrapper}>
        <img src={imgBg} alt="background" className={s["main__wrapper-bg"]} />
      </div>
      <div className={classNames("container", s.main__container)}>
        <Text tag="h2" view="p-20">
          Find the perfect food and 
          <Text tag="span" view="p-20" className={s.main__container_underline}> drink ideas</Text> for every occasion,
          from <Text tag="span" view="p-20" className={s.main__container_underline}>weeknight dinners</Text> to
          <Text tag="span" view="p-20"  className={s.main__container_underline}> holiday feasts</Text>.
        </Text>
        <Search/>
        <FilterTypes/>
        <ListRecipes/>
        
      </div>
    </div>
  );
};

export default Main;
