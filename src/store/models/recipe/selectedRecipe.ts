type Ingredient = {
  original: string;
};

type Equipment = {
  localizedName: string;
};

type Step = {
  equipment: Equipment[];
  step: string;
};

export type SelectedRecipeApi = {
  title: string;
  image: string;
  readyInMinutes: number;
  aggregateLikes: number;
  servings: number;
  extendedIngredients: Ingredient[];
  analyzedInstructions: { steps: Step[] }[];
  summary: string;
}

export type SelectedRecipeModel = {
  title: string;
  totalMinutes: number;
  image: string;
  ratings: number;
  servings: number;
  ingredients: string[];
  equipment?: string[];
  steps: string[];
  summary: string;
}

export const normalizeSelectedRecipe = (
  from: SelectedRecipeApi
): SelectedRecipeModel => {
  const arrIngredients = from.extendedIngredients.map(item => item.original);
  const arrSteps = from.analyzedInstructions[0].steps.map(item => item.step);
  const arrEquipments = from.analyzedInstructions[0].steps.map(
    item =>
      item.equipment.length && item.equipment.map(item => item.localizedName)[0]
  );
  const sortedArrEquipments = arrEquipments.filter(num => num !== 0);

  return {
    title: from.title,
    totalMinutes: from.readyInMinutes,
    image: from.image,
    ratings: from.aggregateLikes,
    servings: from.servings,
    summary: from.summary,
    ingredients: arrIngredients,
    equipment: sortedArrEquipments,
    steps: arrSteps,
  };
};
