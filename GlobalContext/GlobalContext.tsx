"use client"
import React,{createContext, useEffect, useState} from 'react'
import { json } from 'stream/consumers';

const GlobalContext = createContext< any | undefined>(undefined);

const GlobalContextWrapper = ({children}:any)=> {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPresent, setIsPresent] = useState<boolean>(false);
    const [sidebar, setSidebar] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isBox, setIsBox]=useState<boolean>(false);

    useEffect(() => {

        if (typeof window !== "undefined") {
          const savedIsActive = localStorage.getItem("active");
          const savedIsPresent = localStorage.getItem("present");
          const savedSidebar = localStorage.getItem("sidebar");
          const savedDarkMode = localStorage.getItem("darkmode");
          const savedBox = localStorage.getItem("box");

          if (savedIsActive && savedIsPresent && savedSidebar && savedDarkMode && savedBox) {
            setIsActive(JSON.parse(savedIsActive));
            setIsPresent(JSON.parse(savedIsPresent));
            setSidebar(JSON.parse(savedSidebar));
            setIsDarkMode(JSON.parse(savedDarkMode));
            setIsBox(JSON.parse(savedBox));
          }
        }

      }, []);
  return (
    <GlobalContext.Provider value={{isActive, setIsActive, isPresent, setIsPresent, sidebar, setSidebar, isDarkMode, setIsDarkMode, isBox, setIsBox}}>
        {children}
    </GlobalContext.Provider>
  )
}

export {GlobalContextWrapper, GlobalContext}