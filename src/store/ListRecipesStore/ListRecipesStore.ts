import { TypeRecipes, TypeResponse } from "App/pages/Main/components/ListRecipes/type";
import { apiClient } from "axiosConfig";
import { makeAutoObservable } from "mobx";
 import { Meta } from "types";
import { ParamsType } from "./type";
import { MatchCalories, splitIngredients } from "utils/index";

export default class ListRecipesStore {
   private _list: TypeRecipes = []
   private _meta: Meta = Meta.instal
   private _totalRes: number = 0
   
   constructor() {
      makeAutoObservable(this)
   }

   get list():  TypeRecipes { 
      return this._list;
   }

   get meta(): Meta {
      // console.log(this.list)
      return this._meta
   }

   get totalResult(): number {
      return this._totalRes
   }

   getListAPI = async(params: ParamsType): Promise<void> => {
      this._meta = Meta.loading
      this._list = []

      const response = await apiClient.get<{ results: TypeResponse[], totalResults: number }>(`/recipes/complexSearch`, {params}) 
      if(response.status < 300 && response.status >=200) {
         this._meta = Meta.success
         this._totalRes = response.data.totalResults
         response.data.results
         this._list= response.data.results.map(
                    (elem: TypeResponse
                    ) => ({
                      id: elem.id,
                      title: elem.title,
                      image: elem.image,
                      calories: MatchCalories(elem.summary) || "0",
                      timeReady: `${elem.readyInMinutes} minutes`,
                      ingredients: splitIngredients(elem.extendedIngredients),
                    })
                  );
         return
      }

      this._meta = Meta.error
   }        
}