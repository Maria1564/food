import MultiDropdown from 'components/MultiDropdown'
import React, { useCallback } from 'react'

import { OPTIONS } from './dataOptions'
import s from "./FilterType.module.scss"
import { OptionsType } from './types'
import { getTitle } from './utils'



const FilterTypes: React.FC = () => {

  const handlerGetTitle = useCallback(() => getTitle([{key: "soup", value:"soup"}]), [])

  const handlerChange  = useCallback((value: OptionsType): void => {console.log(value)}, [])

  return (
    <>
      <MultiDropdown className={s.filter} onChange={handlerChange}  getTitle={handlerGetTitle} options={OPTIONS} value={[{key: "soup", value:"soup"}]}/>
    </>
  )
}

export default FilterTypes