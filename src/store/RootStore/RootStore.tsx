import {QueryParamsStore} from "store/QueryParamsStore";
import { SelectedRecipeStore } from "store/SelectedRecipeStore";

export default class RootStore {
    readonly queryParams = new QueryParamsStore()
    readonly selectedRecipe = new SelectedRecipeStore()
} 