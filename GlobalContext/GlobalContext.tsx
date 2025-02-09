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
    const [isEventUsed, setIsEventUsed] = useState<boolean>(false);
    const [event, setEvent] = useState<EventDataType[0] | undefined>(undefined);

    useEffect(() => {

        if (typeof window !== "undefined") {
          const savedIsActive = localStorage.getItem("active");
          const savedIsPresent = localStorage.getItem("present");
          const savedEvent = localStorage.getItem("event");
          const savedEventUsed = localStorage.getItem("eventUsed");
 

          if (savedIsActive && savedIsPresent && savedEvent && savedEventUsed) {
            setIsActive(JSON.parse(savedIsActive));
            setIsPresent(JSON.parse(savedIsPresent));
            setEvent(JSON.parse(savedEvent));
            setEvent(JSON.parse(savedEventUsed));
          }
        }

      }, []);
  return (
    <GlobalContext.Provider value={{isActive, setIsActive, isPresent, setIsPresent, isEventUsed, setIsEventUsed ,event, setEvent}}>
        {children}
    </GlobalContext.Provider>
  )
}

export {GlobalContextWrapper, GlobalContext}