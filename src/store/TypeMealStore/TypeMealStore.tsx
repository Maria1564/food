import { ILocalStore } from "utils/useLocalStore";
import { typeMeal } from "./type";
import { action, makeObservable, observable } from "mobx";
import { rootStore } from "store/RootStore";

export default class TypeMealStore implements ILocalStore {
    listMeal: typeMeal[] = []

    constructor() {
        makeObservable<TypeMealStore>(this, {
            listMeal: observable,
            setNewTypeMeal: action,
            destroy: action
        })
    }

    setNewTypeMeal = (options: typeMeal[]) => {
        this.listMeal = options
        console.log(this.listMeal, "ddd")
        const result = this.listMeal.reduce((acc: string, elem) => {
            return acc +=`${elem.value},`
         }, "").slice(0, -1)

         console.log("res >> ", result)
        return rootStore.queryParams.setParam({key: "type", val: result})

    }

    destroy = () => {};
}