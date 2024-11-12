export interface IRecipe {
  id: number;
  calories: string;
  image: string;
  ingredients: string;
  timeReady: string;
  title: string;
}

export type TypeRecipes = IRecipe[];

export interface Iingredient {
    name: string
}

export type TypeIngredients = Iingredient[]

export type TypeResponse = {
    id: number;
    title: string;
    image: string;
    summary: string;
    readyInMinutes: number;
    extendedIngredients: Iingredient[]
}

export type ParamsType = {
  addRecipeInformation: boolean,
    fillIngredients: boolean,
    number: number,
    offset: number,
    query?: string
}