import React from "react";
import Text from "components/Text";
import imgBg from "./assets/main_bg.png";
import classNames from "classnames";
import Search from "./components/Search";
import s from "./Main.module.scss";
import ListRecipes from "./components/ListRecipes";
import FilterTypes from "./components/FilterTypes";

const Main: React.FC = () => {
  // const [searchParams, setSearchParams] = useSearchParams()

  // const [page, setPage] = useState("1")

  // useEffect(()=>{
  //   setPage(searchParams.get("page") || "1")
  //   console.log(searchParams)
  //   if(searchParams.get("page") === null){
  //     setSearchParams((prev) => {
  //       const params = new URLSearchParams(prev);
  //       params.set("page", "1"); 
  //       return params; 
  //     });
  //     // const queryParams = new URLSearchParams(location.search)
  //   //     queryParams.set("page", '1');
  //   //     console.log(queryParams)
  //   // navigate(`?${queryParams.toString()}`);
  //   }
    
  // }, [page, searchParams, setSearchParams])


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
