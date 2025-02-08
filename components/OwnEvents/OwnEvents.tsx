"use client"
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

type UserDataType = [{
    name: string,
    email: string,
    password: string
}]
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
async function ViewEventDatas(userId: string, setEvents: React.Dispatch<React.SetStateAction<any[] | EventDataType>>) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/view-events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: userId })
        });
        const resData = await response.json();
        if (response.ok) {
            setEvents(resData);
        } else {
            console.log("No Events Found");
        }
    } catch (errors) {
        console.log("Cannot Proceed To View Event Due To :-", errors);
    }

}

function OwnEvents({ user, setIsModalOpen }: { user: any[] | UserDataType, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { event, setEvent }: any = useContext(GlobalContext);
    const [events, setEvents] = useState<EventDataType | any[]>([]);
    useEffect(() => {
        ViewEventDatas(user?.[0]?.email, setEvents);
    }, []);
    return (
        <div>
            {events.length > 0 ?
                <div className='flex gap-x-4 py-2 px-3'>
                    {events?.map((event: EventDataType[0], index: number) =>
                        <div
                            key={index}
                            className='relative min-w-[200px] h-[200px] rounded-[10px] hover:scale-105 hover:cursor-pointer'
                            onClick={() => {
                                setEvent(event);
                                setIsModalOpen(true);
                                }}>
                            <img
                                src={event?.imageUrl}
                                alt="profile-pic"
                                className='w-[200px] h-[200px] m-auto rounded-[10px]' />
                            <div className='absolute grid bottom-0 w-full rounded-b-[10px] bg-gray-100 bg-opacity-90 px-2'>
                                <p className='text-[1rem] font-bold'>{event?.eventName} 🎉</p>
                                <p className='text-[1rem] font-semibold'>{event?.ownerName}</p>
                                <p className='text-[0.9rem] font-semibold'>{event?.dateAndTime?.date}</p>
                                <p className='text-[1rem] font-semibold text-green-500'>Total Attendees :- {event?.attendees?.length}</p>
                            </div>
                        </div>
                    )}
                </div>
                :
                <div>
                    <p>No Events Available</p>
                </div>
            }
        </div>
    )
}

export default OwnEvents