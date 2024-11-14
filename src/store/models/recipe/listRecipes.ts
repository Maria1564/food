import { MatchCalories, splitIngredients } from "utils/index";

export type Ingredient = {
    name: string
}

export interface IRecipeApi {
    id: number;
    title: string;
    image: string;
    summary: string;
    readyInMinutes: number;
    extendedIngredients: Ingredient[]
}

export interface IRecipeModel {
    id: number;
    calories: string;
    image: string;
    ingredients: string;
    timeReady: string;
    title: string;
}

export const normalizeRecipe = (from: IRecipeApi): IRecipeModel => {
    return {
        id: from.id,
        title: from.title,
        image: from.image,
        calories: MatchCalories(from.summary) || '0',
        timeReady: `${from.readyInMinutes} minutes`,
        ingredients: splitIngredients(from.extendedIngredients)
    }
}