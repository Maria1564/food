import { OptionsType } from "./types"

export const getTitle = (arrOptions: OptionsType): string => {
    return  arrOptions[0].key
}
