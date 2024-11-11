
export const createNewParams = (params:  URLSearchParams, key: string, value:string) => {
  
        const newParams = new URLSearchParams(params);
        newParams.set(key, value);
        return newParams
}