import {ListRecipesStore} from "../../store/ListRecipesStore";

export default class RootStore {
    readonly listRecipes = new ListRecipesStore()
} 