import Button from 'components/Button'
import Input from 'components/Input'
import React, { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import s from "./Search.module.scss"
import SearchIcon from './SearchIcon'
import { createNewParams } from '../../utils'

const Search:React.FC = () => {
    const [value, setValue] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();


    const handlerClick = useCallback(()=>{
      console.log("val >> ", value)
      setSearchParams(createNewParams(searchParams, "query", value))
      
    }, [value, searchParams, setSearchParams])
  return (
    <div className={s.search__wrapper}>
        <Input value={value} onChange={(val)=>setValue(val)} placeholder='Enter dishes' className={s.search__input}/>
        <Button className={s.search_btn} onClick={handlerClick}>
            <SearchIcon width={25} height={24}/>
        </Button>
    </div>
  )
}

export default Search