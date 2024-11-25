import { action, makeObservable, observable } from "mobx";
import { rootStore } from "store/RootStore";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = "_currentPage"
export default class PageStore implements ILocalStore {
    private _currentPage: string = "1"
    
    constructor () {
        makeObservable<PageStore, PrivateFields>(this, {
            _currentPage: observable,
            setPage: action,
            destroy: action
        })
    }

    setPage = (numPage: string):  URLSearchParams => {
        this._currentPage = numPage
        return rootStore.queryParams.setParam({key: "page", val: this._currentPage})
    }

    destroy = () => {};
}