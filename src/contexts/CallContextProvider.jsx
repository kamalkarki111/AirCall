import { createContext, useState } from "react"

export const CallTabContext = createContext(null);
export const callDataContext = createContext(null);
export const ArchivedcallDataContext = createContext(null)
/**
 * Provides the context for the CallTab component and callData component.
 * 
 * @param {ReactNode} children - The child components to be wrapped by the context providers.
 * @returns {JSX.Element} - The JSX element wrapping the child components with the context providers.
 */
export const CallContextProvider = ({ children }) => {
    // State hooks
    const [selectedTabs, setSelectedTabs] = useState(0);
    const [callData, setcallData] = useState([]);
    const [archivedcallData, setArchivedcallData] = useState([]);

    // Context data
    const tabData = {
        selectedtabs:selectedTabs,
        setSelectedTabs
    }

    const call = {
        callData,
        setcallData
    }

    const archivedcall = {
        archivedcallData,
        setArchivedcallData
    }

    return (
        // Context providers
        <CallTabContext.Provider value={{value:tabData}}>
            <callDataContext.Provider value={{value:call}}>
                <ArchivedcallDataContext.Provider value={{value:archivedcall}}>
                    {children}
                </ArchivedcallDataContext.Provider>
            </callDataContext.Provider>
        </CallTabContext.Provider>
    )
}
