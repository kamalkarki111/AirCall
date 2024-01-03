import { createContext, useState } from "react";

export const LoaderContext = createContext(null);

export function LoaderContextProvider({ children }) {

    const [showLoader, setShowLoader] = useState(false);;
    return <>
        <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
            {children}
        </LoaderContext.Provider>
    </>
}