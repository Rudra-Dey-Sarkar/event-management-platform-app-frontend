"use client"
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { CompareDateAndTime } from '../../actions/CompareDateAndTime';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';


type EventDataType = [{
    _id: string,
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
async function ViewEvent(setEvents: React.Dispatch<React.SetStateAction<any[] | EventDataType>>) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/view-events`);
        const resData = await response.json();
        if (response.ok) {
            setEvents(resData.reverse());
        } else {
            console.log("No Events Found");
        }
    } catch (errors) {
        console.log("Cannot Proceed To View Event Due To :-", errors);
    }

}
function GuestTodayAndUpcomingEvents() {
    
    const router = useRouter();
    const { isEventUsed, setIsEventUsed }: any = useContext(GlobalContext);
    const [events, setEvents] = useState<EventDataType | any[]>([]);
    const { isPresent, setIsPresent }: any = useContext(GlobalContext);
    const [isGuest, setIsGuest] = useState<boolean>(false);

    useEffect(() => {
        ViewEvent(setEvents);
    }, [isEventUsed]);

    return (
        <div>
            {/* Guest Popup */}
            {isGuest === true &&
                <div
                    className='fixed flex inset-0 justify-center items-center bg-black bg-opacity-50 z-50'
                    onClick={() => setIsGuest(false)}>
                    <div
                        className='grid justify-center gap-y-5 bg-white p-5 rounded-[10px]'
                        onClick={(e) => e.stopPropagation()}>
                        <p className='font-semibold text-[20px]'>Login or Register to add your events</p>
                        <button
                            className='border-2 border-[#35793729] w-fit h-fit m-auto py-1 px-4 rounded-[10px] shadow-[0px_0px_5px_5px_gray] font-semibold hover:scale-105 text-black'
                            onClick={() => {
                                deleteCookie("user");
                                setIsPresent(false);
                                setIsGuest(false)
                                router.push("/")
                            }}>Login/Register</button>
                    </div>
                </div>
            }
            {events.length > 0 ?
                <div className='flex gap-x-4 py-2 px-3'>
                    {events?.map((event: EventDataType[0], index: number) =>
                        <div
                            className={`${(CompareDateAndTime(event?.dateAndTime?.date, event?.dateAndTime?.time) === "today" || CompareDateAndTime(event?.dateAndTime?.date, event?.dateAndTime?.time) === "upcoming") ? "visible" : "hidden"}`}
                            key={index}>
                            {(CompareDateAndTime(event?.dateAndTime?.date, event?.dateAndTime?.time) === "today" || CompareDateAndTime(event?.dateAndTime?.date, event?.dateAndTime?.time) === "upcoming") &&
                                <div className='relative min-w-[200px] h-[200px] rounded-[10px] hover:scale-105 hover:cursor-pointer'
                                    onClick={() => {
                                        setIsGuest(true);
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
                            }
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

export default GuestTodayAndUpcomingEvents