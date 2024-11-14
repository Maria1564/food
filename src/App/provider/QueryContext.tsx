import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from 'types';
type ParamsContextType = {
    queryParams: QueryParams,
    handlerQueryParams:  (offset: number, page: number, query: string) => void; 
}
export const ParamsContext = createContext<ParamsContextType | null>(null);

type UrlParamsProviderProps = {
    children: React.ReactNode
}
const UrlParamsProvider: React.FC<UrlParamsProviderProps> = ({children}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [queryParams, setQueryParams] = useState<{
        offset: number;
        page: number;
        query?: string
      }>({
        offset: searchParams.get("page") ? ((Number(searchParams.get("page"))) - 1) * 9 : 0,
        page: Number(searchParams.get("page")) || 1,
        query: ""
    })
    
    useEffect(()=>{
        const currentPath = window.location.pathname;
        if(currentPath === "/recipes"){

            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.set("page", String(queryParams.page));
                return params;
              });
        }
    }, [])

    const handlerQueryParams = useCallback((offset: number, page: number, query: string)=>{
        setQueryParams(() => ({
            offset,
            page,
            query
        }))
    }, [])
    return (
        <ParamsContext.Provider value={{queryParams, handlerQueryParams}}>
            {children}
        </ParamsContext.Provider>
    )
}

export default UrlParamsProvider