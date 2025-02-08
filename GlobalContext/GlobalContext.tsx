"use client"
import React,{createContext, useEffect, useState} from 'react'

type EventDataType = [{
  userId: string,
  ownerName: string,
  eventName: string,
  category: string,
  description: string,
  dateAndTime: {
      date: string,
      time: string
  },
  imageUrl: string,
  attendees: { name: string }[];
}]

const GlobalContext = createContext< any | undefined>(undefined);

const GlobalContextWrapper = ({children}:any)=> {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPresent, setIsPresent] = useState<boolean>(false);
    const [event, setEvent] = useState<EventDataType[0] | undefined>(undefined);

    useEffect(() => {

        if (typeof window !== "undefined") {
          const savedIsActive = localStorage.getItem("active");
          const savedIsPresent = localStorage.getItem("present");
          const savedEvent = localStorage.getItem("event");
 

          if (savedIsActive && savedIsPresent && savedEvent) {
            setIsActive(JSON.parse(savedIsActive));
            setIsPresent(JSON.parse(savedIsPresent));
            setEvent(JSON.parse(savedEvent))
          }
        }

      }, []);
  return (
    <GlobalContext.Provider value={{isActive, setIsActive, isPresent, setIsPresent, event, setEvent}}>
        {children}
    </GlobalContext.Provider>
  )
}

export {GlobalContextWrapper, GlobalContext}