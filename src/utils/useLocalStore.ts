import React from "react";
import { useRef } from "react"

export interface ILocalStore {
    destroy: ()=>void
}

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
    const container = useRef<null | T>(null)

    if(container.current === null){
        container.current = creator()
    }

    React.useEffect(() => {
        return () => container.current?.destroy();
      }, []);

    return container.current
}