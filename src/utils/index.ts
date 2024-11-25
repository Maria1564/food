import { TypeIngredients } from "App/pages/Main/components/ListRecipes/type";

export const MatchCalories = (summary: string) => {
    const caloriesMatch = summary.match(/(\d+)\s*calories/);
    if (caloriesMatch) {
      const calories = caloriesMatch[1];
      return calories; 
    } else {
      console.log("Информация о калориях не найдена.");
    }
  };

export  const splitIngredients = (arrayIngr: TypeIngredients): string => {
    const result = arrayIngr.map((item) => item.name);
    return result.join(" + ");
  };