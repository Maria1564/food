import { TypeRecipes, TypeResponse } from "App/pages/Main/components/ListRecipes/type";
import { apiClient } from "axiosConfig";
import { action, computed, makeObservable, observable } from "mobx";
 import { Meta } from "types";
import { ParamsType } from "./type";
import { MatchCalories, splitIngredients } from "utils/index";

type PrivateFields = "_list" | "_meta" | "_totalRes" | "_typesMeal"
export default class ListRecipesStore {
   private _list: TypeRecipes = []
   private _meta: Meta = Meta.instal
   private _totalRes: number = 0
   private _typesMeal: ({key: string, value: string})[] = []
   
   constructor() {
      makeObservable<ListRecipesStore, PrivateFields>(this, {
         _list: observable,
         _meta: observable,
         _totalRes: observable,
         _typesMeal: observable,
         list: computed,
         meta: computed,
         totalResult: computed,
         _generateQueryTypesMeal: action,
         getListAPI: action
      })
   }

   get list():  TypeRecipes { 
      return this._list;
   }

   get meta(): Meta {
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