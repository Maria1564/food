import React, { useState } from 'react'
import s from "./Search.module.scss"
import Input from 'components/Input'
import Button from 'components/Button'
import IconSearch from "../../assets/icon_search.svg"

const Search:React.FC = () => {
    const [value, setValue] = useState("")
  return (
    <div className={s.wrapper}>
        <Input value={value} onChange={(val)=>setValue(val)} placeholder='Enter dishes' className={s.search}/>
        <Button className={s.btn_search}>
            <img  src={IconSearch}/>
        </Button>
    </div>
  )
}

export default Search