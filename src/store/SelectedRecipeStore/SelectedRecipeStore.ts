import { apiClient } from "axiosConfig";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import {
  normalizeSelectedRecipe,
  SelectedRecipeApi,
  SelectedRecipeModel,
} from "store/models/recipe";
import { Meta } from "types";

type PrivateFields = "_infoRecipe" | "_meta";

export default class SelectedRecipeStore {
  private _infoRecipe: SelectedRecipeModel = {
    title: "",
    totalMinutes: 0,
    image: "",
    ratings: 0,
    servings: 0,
    ingredients: [],
    steps: [],
    summary: "",
  };
  private _meta: Meta = Meta.instal;

  constructor() {
    makeObservable<SelectedRecipeStore, PrivateFields>(this, {
      _infoRecipe: observable,
      _meta: observable,
      getInfoRecipe: action,
      infoRecipe: computed,
      meta: computed,
    });
  }

  get infoRecipe(): SelectedRecipeModel {
    return this._infoRecipe;
  }

  get meta(): Meta {
    return this._meta;
  }

  getInfoRecipe = async (id: string): Promise<void> => {
    this._meta = Meta.loading;
    this._infoRecipe = {
      title: "",
      totalMinutes: 0,
      image: "",
      ratings: 0,
      servings: 0,
      ingredients: [],
      steps: [],
      summary: "",
    };

    const response = await apiClient.get<SelectedRecipeApi>(
      `/recipes/${id}/information`
    );

    runInAction(() => {
      try {
        if (response.status >= 200 && response.status < 300) {
          this._infoRecipe = normalizeSelectedRecipe(response.data);
          this._meta = Meta.success;
          return;
        }
      } catch (error) {
        console.log(error)
        this._meta = Meta.error;
        this._infoRecipe = {
          title: "",
          totalMinutes: 0,
          image: "",
          ratings: 0,
          servings: 0,
          ingredients: [],
          steps: [],
          summary: "",
        };
      }
    });
  };
}
