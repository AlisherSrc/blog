import { createContext, useState } from "react";
import useLocalStorage from 'use-local-storage';
export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    // Retrievening info about user preferences
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches; 
    const [userInfo,setUserInfo] = useState({});
    // variable name to find, default
    // behaves like useState
    const [isDark,setIsDark] = useLocalStorage("isDark",preference);

    return (
        <UserContext.Provider value={{userInfo,setUserInfo,isDark,setIsDark}}>
            {children}
        </UserContext.Provider>
    );
}