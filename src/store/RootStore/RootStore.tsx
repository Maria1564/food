import { SelectedRecipeStore } from "store/SelectedRecipeStore";
import {ListRecipesStore} from "store/ListRecipesStore";

export default class RootStore {
    readonly listRecipes = new ListRecipesStore()
    readonly selectedRecipe = new SelectedRecipeStore()
} 