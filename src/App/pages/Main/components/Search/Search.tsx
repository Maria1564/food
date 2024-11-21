import Button from "components/Button";
import Input from "components/Input";
import React, { useCallback, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

import s from "./Search.module.scss";
import SearchIcon from "./SearchIcon";
import { ParamsContext } from "../../../../provider/QueryContext";
import { createNewParams } from "../../utils";

const Search: React.FC = () => {
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const objContext = useContext(ParamsContext);

  const handlerClick = useCallback(() => {
    setSearchParams(createNewParams(searchParams, "query", value));
    const currentPage = searchParams.get("page");
    const offset = (Number(currentPage) - 1) * 9;
    objContext?.handlerQueryParams(offset, Number(currentPage), value);
  }, [setSearchParams, searchParams, value, objContext]);


  const handleChange = useCallback((val: string)=>{
    setValue(val)
  }, [])
  
  return (
    <div className={s.search__wrapper}>
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Enter dishes"
        className={s.search__input}
      />
      <Button className={s.search_btn} onClick={handlerClick}>
        <SearchIcon width={25} height={24} />
      </Button>
    </div>
  );
};

export default Search;
