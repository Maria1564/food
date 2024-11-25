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
  const [arrOptions] = useState(localStorage.getItem("selectOptions"));
  const [searchParams, setSearchParams] = useSearchParams();
  const objContext = useContext(ParamsContext);
  const options = useLocalStore(()=> new TypeMealStore())

  
  const handlerGetTitle = useCallback(() => {
    return getTitle(options.listMeal);
  }, [arrOptions])

  const handlerChange  = useCallback((value: OptionsType): void => {

    const query = searchParams.get("query") || ""
    const page = searchParams.get("page")
    const offset = (Number(page) - 1) * 9
    objContext?.handlerQueryParams(offset, Number(page), query)
    
    setSearchParams((prev) => {
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