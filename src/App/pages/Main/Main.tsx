import React from "react";
import Text from "components/Text";
import imgBg from "./assets/main_bg.png";
import classNames from "classnames";
import Search from "./components/Search";
import s from "./Main.module.scss";
import ListRecipes from "./components/ListRecipes";
import FilterTypes from "./components/FilterTypes";

const Main: React.FC = () => {
  return (
    <>
      <div className={s.wrapper}>
        <img src={imgBg} alt="background" className={s.wrapper_bg} />
      </div>
      <div className={classNames("container", s.main_container)}>
        <Text tag="h2" view="p-20">
          Find the perfect food and
          <span className={s.underline}>drink ideas</span> for every occasion,
          from <span className={s.underline}>weeknight dinners</span> to
          <span className={s.underline}>holiday feasts</span>.
        </Text>
        <Search/>
        <FilterTypes/>
        <ListRecipes/>
      </div>
    </>
  );
};

export default Main;
