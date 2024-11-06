import React, { useEffect, useRef, useState } from 'react'
import {useNavigate, useParams } from "react-router-dom"
// import {data} from "./mockData.ts"
import Text from 'components/Text/Text.tsx'
import s from "./RecipeDetail.module.scss"
import dish_tray from "./assets/dish_tray.svg"
import ladle from "./assets/ladle.svg"
import arrow_right from ".//assets/arrow_right.svg"
import { apiClient } from '../../../axiosConfig.ts'

interface IAboutRecipes {
    title: string,
    totalMinutes: number,
    image: string
    ratings: number,
    servings: number,
    ingredients: string[],
    equipment?: string[],
    steps: string[]
}
const RecipeDetail: React.FC = () => {
    const [infoRecipes, setInfoRecipes] = useState<IAboutRecipes | null>(null)
    const {id} = useParams()
    const divRef = useRef<HTMLDivElement | null>(null)
    const navigate = useNavigate()
    // console.log(id, data)

    useEffect(()=>{
        //запрос  на сервер
        apiClient.get(`/recipes/${id}/information`)
        .then(({data})=>{
            const arrIngredients = data.extendedIngredients.map(elem=> elem.original)
            const arrEquipments = data.analyzedInstructions[0].steps.map(elem =>elem.equipment.length &&  elem.equipment.map(item=> item.localizedName)[0])
            const sortedArrEquipments = arrEquipments.filter(num => num !== 0)
            const arrSteps = data.analyzedInstructions[0].steps.map(elem => elem.step)
            setInfoRecipes({
                title: data.title,
                image: data.image,
                totalMinutes: data.readyInMinutes,
                ratings: data.aggregateLikes,
                servings: data.servings,
                ingredients: arrIngredients,
                equipment: sortedArrEquipments,
                steps: arrSteps
            })
            if(divRef.current){
    
                divRef.current.innerHTML = `
                   ${data.summary}`
            }
        })
    }, [id])


  return (
    <div className={s.wrapper}>
    <div className="container">
        <div className={s.back} onClick={()=> navigate(-1)}>
            <img src={arrow_right} alt="arrow" />
            <Text tag='h1' view='title' className={s.title}>{infoRecipes?.title}</Text>
        </div>
        <div className={s.about}>
            <img src={infoRecipes?.image} alt="img" />
            <div className={s.general}>
                <div className={s.total}>
                    <Text tag='span' view='p-16'>Total</Text>
                    <Text tag='span' view='p-16' weight='medium' className={s.general_text}>{infoRecipes?.totalMinutes} minutes</Text>
                </div>
                <div className={s.total}>
                    <Text tag='span' view='p-16'>Ratings</Text>
                    <Text tag='span' view='p-16' weight='medium' className={s.general_text}>{infoRecipes?.ratings} likes</Text>
                </div>
                <div className={s.serving}>
                    <Text tag='span' view='p-16'>Servings</Text>
                    <Text tag='span' view='p-16' weight='medium' className={s.general_text}>{infoRecipes?.servings} servings</Text>
                </div>
            </div>
        </div>
        <div ref={divRef} className={s.summary}>
        </div>
        <div className={s.details}>
            <div className={s.ingredients}>
                <Text tag='h3' view='p-20' weight='medium'>Ingredients</Text>
                <ul className={s.ingredients_list}>
                    {infoRecipes?.ingredients.map((item, index) =>(
                        <li key={index}>
                            <img src={dish_tray} alt='dish'/>
                            <Text tag='span' view='p-16' className={s.ingredients_text}>{item}</Text>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={s.equipment}>
            <Text tag='h3' view='p-20' weight='medium'>Equipment</Text>
            <ul className={s.equipment_list}>
                {infoRecipes?.equipment?.map((item, index)=>(
                    <li key={index}>
                    <img src={ladle} alt='ladle'/>
                    <Text tag='span' view='p-16' className={s.equipment_text}>{item}</Text>
                    </li>
                ))}
            </ul>
            </div>
        </div>
        <div className={s.directions}>
        <Text tag='h3' view='p-20' weight='medium'>Directions</Text>
        {infoRecipes?.steps.map((item, index) =>(
            <div className={s.step} key={index}>
                <Text tag='h4' view='p-16' weight='medium' className={s.step_title}>Step {index+1}</Text>
                <Text tag='p' view='p-14'> {item}</Text>
            </div>
        ))}
        </div>
    </div>
    </div>
  )
}

export default RecipeDetail