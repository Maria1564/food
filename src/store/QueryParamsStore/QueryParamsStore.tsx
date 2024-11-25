import { action, makeObservable, observable } from "mobx";

import { queryParamsModal } from "../models/recipe/queryParams";

export default class QueryParamsStore {
    queryParams: queryParamsModal = {page: "1"} 

    constructor(){
       makeObservable<QueryParamsStore>(this, {
            queryParams: observable,
            setParam: action
       })
    }

    setParam = (newParam: {key: string, val: string}) => {
        const params = new URLSearchParams(window.location.search);
        this.queryParams.page= newParam.val
        params.set(newParam.key, newParam.val)
        return params
    }
}