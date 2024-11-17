import {ListRecipesStore} from "store/ListRecipesStore";
import { SelectedRecipeStore } from "store/SelectedRecipeStore";

export default class RootStore {
    readonly listRecipes = new ListRecipesStore()
    readonly selectedRecipe = new SelectedRecipeStore()
} 