import MultiDropdown from 'components/MultiDropdown'
import React, { useCallback, useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { OPTIONS } from './dataOptions'
import s from "./FilterType.module.scss"
import { OptionsType } from './types'
import { getTitle } from './utils'
import { ParamsContext } from '../../../../../App/provider/QueryContext'
import { observer } from 'mobx-react-lite'
import { useLocalStore } from 'utils/useLocalStore'
import { TypeMealStore } from 'store/TypeMealStore'



const FilterTypes: React.FC = () => {
  const [arrOptions, setArrOptions] = useState(localStorage.getItem("selectOptions"));
  const [searchParams, setSearchParams] = useSearchParams();
  const objContext = useContext(ParamsContext);
  const options = useLocalStore(()=> new TypeMealStore())

  
  const handlerGetTitle = useCallback(() => {
    // const parsedOptions = arrOptions ? JSON.parse(arrOptions) : [];
    console.log(options.listMeal)
    return getTitle(options.listMeal);
  }, [arrOptions])

  const handlerChange  = useCallback((value: OptionsType): void => {
    // localStorage.setItem("selectOptions", JSON.stringify(value))
    // options.setNewTypeMeal(value)


    const query = searchParams.get("query") || ""
    const page = searchParams.get("page")
    const offset = (Number(page) - 1) * 9
    
    setSearchParams((prev) => {
      // const params = new URLSearchParams(prev);
      // const selectOptions = localStorage.getItem("selectOptions");
      
      // if (selectOptions !== null) {
        //     const options = JSON.parse(selectOptions);
        //     if(options.length === 0){
          //       params.delete("type");
          //       return params
          //     }
          //     if (options.length > 0 && options[0].value) {
            //         params.set("type", options[0].value);
            //     }
            // }
            console.log(options.setNewTypeMeal(value).get("type"))
            objContext?.handlerQueryParams(offset, Number(page), query)
            return options.setNewTypeMeal(value)
            
  });

  }, [objContext, searchParams, setSearchParams])
  
  return (
    <>
      <MultiDropdown className={s.filter} onChange={handlerChange}  getTitle={handlerGetTitle} options={OPTIONS} value={arrOptions ? JSON.parse(arrOptions) : []}/>
    </>
  )
}

export default observer(FilterTypes) 