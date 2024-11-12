import MultiDropdown from 'components/MultiDropdown'
import React, { useCallback, useContext, useState } from 'react'

import { options } from './dataOptions'
import s from "./FilterType.module.scss"
import { OptionsType } from './types'
import { getTitle } from './utils'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ParamsContext } from '../../../../../App/provider/QueryContext'



const FilterTypes: React.FC = () => {
  const [arrOptions, setArrOptions] = useState(localStorage.getItem("selectOptions"));
  const [searchParams, setSearchParams] = useSearchParams();
  const objContext = useContext(ParamsContext);

  
  const loc = useLocation()
  const handlerGetTitle = useCallback(() => {
    const parsedOptions = arrOptions ? JSON.parse(arrOptions) : [];
    return getTitle(parsedOptions);
  }, [arrOptions])

  const handlerChange  = useCallback((value: OptionsType): void => {
    localStorage.setItem("selectOptions", JSON.stringify(value))
    setArrOptions(JSON.stringify(value))
    const query = searchParams.get("query") || ""
    const page = searchParams.get("page")
    const offset = (Number(page) - 1) * 9
    objContext?.handlerQueryParams(offset, Number(page), query)
    console.log(`${loc}`)

  }, [])
  
  return (
    <>
      <MultiDropdown className={s.filter} onChange={handlerChange}  getTitle={handlerGetTitle} options={options} value={arrOptions ? JSON.parse(arrOptions) : []}/>
    </>
  )
}

export default FilterTypes