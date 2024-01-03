import { createContext, useState } from "react";

export const ErrorContext = createContext(null);

/**
 * Creates an ErrorContextProvider component.
 *
 * @param {ReactNode} children - The child components to be wrapped by ErrorContextProvider.
 * @return {ReactNode} The ErrorContextProvider component.
 */
export function ErrorContextProvider({ children }) {

    const [showError, setShowError] = useState(false);;
    return <>
        <ErrorContext.Provider value={{ error:showError, setError: setShowError }}>
            {children}
        </ErrorContext.Provider>
    </>
}