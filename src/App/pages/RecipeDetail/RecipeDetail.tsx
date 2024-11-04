import React, { useEffect } from 'react'
import {useParams } from "react-router-dom"

const RecipeDetail: React.FC = () => {
    
    const {id} = useParams()
    console.log(id)

    useEffect(()=>{
        
    }, [])

  return (
    <div className='container'>RecipeDetail</div>
  )
}

export default RecipeDetail