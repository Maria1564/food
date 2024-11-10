import Button from 'components/Button'
import Input from 'components/Input'
import React, { useState } from 'react'

import s from "./Search.module.scss"
import SearchIcon from './SearchIcon'

const Search:React.FC = () => {
    const [value, setValue] = useState("")
  return (
    <div className={s.search__wrapper}>
        <Input value={value} onChange={(val)=>setValue(val)} placeholder='Enter dishes' className={s.search__input}/>
        <Button className={s.search_btn}>
            <SearchIcon width={25} height={24}/>
        </Button>
    </div>
  )
}

export default Search