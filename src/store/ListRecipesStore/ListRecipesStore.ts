import { apiClient } from "axiosConfig";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { IRecipeApi, IRecipeModel, normalizeRecipe } from "store/models/recipe";
import { Meta } from "types";

import { ParamsType } from "./type";


type PrivateFields = "_list" | "_meta" | "_totalRes" | "_typesMeal"
export default class ListRecipesStore {
   private _list: IRecipeModel[] = []
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

   get list(): IRecipeModel[] { 
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
      const response = await apiClient.get<{ results: IRecipeApi[], totalResults: number }>(`/recipes/complexSearch?${typesMeal ? typesMeal : ""}`, {params}) 

      runInAction(() => {
         try {
            if(response.status < 300 && response.status >=200) {
               this._meta = Meta.success
               this._totalRes = response.data.totalResults
               this._list= response.data.results.map(item => normalizeRecipe(item));
               return
            }
            this._meta = Meta.error
            
         } catch (error) {
            if(error instanceof Error){
               console.log(error.message)
            }
            this._meta = Meta.error
         }
      })

   }        
}