import { createContext, useContext, useState } from "react";
import { IRecipeModel } from "store/models/recipe/listRecipes";
type ListRecipesContextType = {
    list: IRecipeModel[],
    handlerSetList: (newList: IRecipeModel[]) => void
}

export const ListRecipesContext = createContext<ListRecipesContextType | null>(null)

type ListRecipesProps = {
    children: React.ReactNode
}

const ListRecipesProvider: React.FC<ListRecipesProps>= ({children}) => {
    const [list, setList] = useState<IRecipeModel[]>([])

    const handlerSetList = (newList: IRecipeModel[]) => {
        setList(newList)
    } 
    return( <ListRecipesContext.Provider value={{list, handlerSetList}}>
    {children}
    </ListRecipesContext.Provider>)
}
export default ListRecipesProvider

export const useListRecipes = ()=> useContext(ListRecipesContext)