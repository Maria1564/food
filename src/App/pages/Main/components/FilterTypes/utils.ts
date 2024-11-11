import { OptionsType } from "./types"

export const getTitle = (arrOptions: OptionsType): string => {
    const newArr  = arrOptions.map(obj => obj.value)
    return newArr.join(", ")
}
