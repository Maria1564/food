import MultiDropdown from 'components/MultiDropdown'
import React, { useCallback, useState } from 'react'

import { options } from './dataOptions'
import s from "./FilterType.module.scss"
import { OptionsType } from './types'
import { getTitle } from './utils'



const FilterTypes: React.FC = () => {
  const [arrOptions, setArrOptions] = useState(localStorage.getItem("selectOptions"));
  const handlerGetTitle = useCallback(() => {
    const parsedOptions = arrOptions ? JSON.parse(arrOptions) : [];
    return getTitle(parsedOptions);
  }, [arrOptions])

  const handlerChange  = useCallback((value: OptionsType): void => {
    localStorage.setItem("selectOptions", JSON.stringify(value))
    setArrOptions(JSON.stringify(value))
  }, [])
  
  return (
    <>
      <MultiDropdown className={s.filter} onChange={handlerChange}  getTitle={handlerGetTitle} options={options} value={arrOptions ? JSON.parse(arrOptions) : []}/>
    </>
  )
}

export default FilterTypes