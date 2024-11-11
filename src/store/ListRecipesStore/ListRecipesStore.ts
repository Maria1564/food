import { TypeRecipes } from "App/pages/Main/components/ListRecipes/type";
import { apiClient } from "axiosConfig";

export default class ListRecipesStore {
   private list: TypeRecipes = []

   getList = async(params: string) => {
        const {data} = await apiClient.get(`/recipes/complexSearch${params}`)
        console.log("data >> ", data)
   }        
}