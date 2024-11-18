export type Recipe = {
  id: number;
  calories: string;
  image: string;
  ingredients: string;
  timeReady: string;
  title: string;
}

export type TypeRecipes = Recipe[];

export type ingredient = {
    name: string
}

export type TypeIngredients = ingredient[]

export type TypeResponse = {
    id: number;
    title: string;
    image: string;
    summary: string;
    readyInMinutes: number;
    extendedIngredients: ingredient[]
}