import { apiClient } from "axiosConfig";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { IRecipeApi, IRecipeModel, normalizeRecipe } from "store/models/recipe";
import { Meta } from "types";
import { ILocalStore } from "utils/useLocalStore";

import { ParamsType } from "./type";


type PrivateFields = "_list" | "_meta" | "_totalRes" | "_typesMeal"
export default class ListRecipesStore implements ILocalStore {
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
         getListAPI: action,
         destroy: action
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

   getListAPI = async(params: ParamsType): Promise<void> => {
      this._meta = Meta.loading
      this._list = []

      // const typesMeal = this._generateQueryTypesMeal()
      const response = await apiClient.get<{ results: IRecipeApi[], totalResults: number }>(`/recipes/complexSearch?`, {params}) 

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
   
   destroy = () => {};
}