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
   private _typesMeal: ({key: string, value: string})[] = []
   
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

   _generateQueryTypesMeal = () => {
      const storedValue = localStorage.getItem("selectOptions");
      this._typesMeal = storedValue !== null ? JSON.parse(storedValue) : [];

      if(this._typesMeal.length === 0) return

      const reult = this._typesMeal.reduce((acc: string, item) => {
         return acc +=`type=${item.value}&`
      }, "")

      return reult.slice(0, -1)
   }

   getListAPI = async(params: ParamsType): Promise<void> => {
      this._meta = Meta.loading
      this._list = []

      const typesMeal = this._generateQueryTypesMeal()
      console.log(params)
      const response = await apiClient.get<{ results: TypeResponse[], totalResults: number }>(`/recipes/complexSearch?${typesMeal ? typesMeal : ""}`, {params}) 
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