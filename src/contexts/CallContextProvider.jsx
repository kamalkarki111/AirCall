import { createContext, useState } from "react"

export const CallTabContext = createContext(null);
export const ChatDataContext = createContext(null);
export const ArchivedChatDataContext = createContext(null)
/**
 * Provides the context for the CallTab component and ChatData component.
 * 
 * @param {ReactNode} children - The child components to be wrapped by the context providers.
 * @returns {JSX.Element} - The JSX element wrapping the child components with the context providers.
 */
export const CallContextProvider = ({ children }) => {
    // State hooks
    const [selectedTabs, setSelectedTabs] = useState(0);
    const [chatData, setChatData] = useState([]);
    const [archivedChatData, setArchivedChatData] = useState([]);

    // Context data
    const tabData = {
        selectedtabs:selectedTabs,
        setSelectedTabs
    }

    const chat = {
        chatData,
        setChatData
    }

    const archivedChat = {
        archivedChatData,
        setArchivedChatData
    }

    return (
        // Context providers
        <CallTabContext.Provider value={{value:tabData}}>
            <ChatDataContext.Provider value={{value:chat}}>
                <ArchivedChatDataContext.Provider value={{value:archivedChat}}>
                    {children}
                </ArchivedChatDataContext.Provider>
            </ChatDataContext.Provider>
        </CallTabContext.Provider>
    )
}
