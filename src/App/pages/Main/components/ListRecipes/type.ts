export type Recipe = {
  id: number;
  calories: string;
  image: string;
  ingredients: string;
  timeReady: string;
  title: string;
}

export type TypeRecipes = Recipe[];

export type Ingredient = {
    name: string
}

export type TypeIngredients = Ingredient[]

export type TypeResponse = {
    id: number;
    title: string;
    image: string;
    summary: string;
    readyInMinutes: number;
    extendedIngredients: Ingredient[]
}

export type ParamsType = {
  addRecipeInformation: boolean,
    fillIngredients: boolean,
    number: number,
    offset: number,
    query?: string
}