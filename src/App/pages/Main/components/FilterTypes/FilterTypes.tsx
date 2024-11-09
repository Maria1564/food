import MultiDropdown from 'components/MultiDropdown'
import React from 'react'

import s from "./FilterType.module.scss"



const FilterTypes: React.FC = () => {
  return (
    <>
      <MultiDropdown className={s.filter} onChange={()=>{}}  getTitle={()=>"categories"} options={[{key: "dessert", value:"dessert"}, {key: "soup", value:"soup"}, {key: "breakfast", value:"breakfast"},{key: "appetizer", value:"appetizer"}, ]} value={[{key: "soup", value:"soup"}]}/>
    </>
  )
}

export default FilterTypes