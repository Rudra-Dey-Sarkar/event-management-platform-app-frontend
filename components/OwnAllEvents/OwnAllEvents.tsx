"use client"
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import EditEvent from '../EditEvent/EditEvent';

type UserDataType = [{
    name: string,
    email: string,
    password: string
}]
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
async function ViewEvent(userId: string, setEvents: React.Dispatch<React.SetStateAction<any[] | EventDataType>>) {
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
            setEvents(resData.reverse());
        } else {
            console.log("No Events Found");
        }
    } catch (errors) {
        console.log("Cannot Proceed To View Event Due To :-", errors);
    }

}
async function RemoveEvent(id: string, isEventUsed: boolean, setIsEventUsed: any, setIsRemoveConfirmed: React.Dispatch<React.SetStateAction<string>>) {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/remove-event`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        });

        if (response.ok) {
            if (isEventUsed === false) {
                setIsEventUsed(true);
            } else {
                setIsEventUsed(false);
            }
            toast.success("Event Removed");
            setIsRemoveConfirmed("");
        } else {
            toast.error("An Error Occurred");
        }
    } catch (errors) {
        console.log("Cannot Proceed To View Event Due To :-", errors);
        toast.error("Cannot Remove Event");
    }

}
function OwnAllEvents({ user, setIsModalOpen }: { user: any[] | UserDataType, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { event, setEvent }: any = useContext(GlobalContext);
    const { isEventUsed, setIsEventUsed }: any = useContext(GlobalContext);
    const [events, setEvents] = useState<EventDataType | any[]>([]);
    const [EE, setEE] = useState<boolean>(false);
    const [isRemoveConfirmed, setIsRemoveConfirmed] = useState<string>("");

    useEffect(() => {
        ViewEvent(user?.[0]?.email, setEvents);
    }, [isEventUsed]);

    return (
        <div>
            {/* Edit Event Popup */}
            {EE === true &&
                <div
                    className='fixed flex inset-0 justify-center items-center bg-black bg-opacity-50 z-50'
                    onClick={() => setEE(false)}>
                    <div
                        className='bg-white'
                        onClick={(e) => e.stopPropagation()}>
                        <EditEvent user={user} setEE={setEE} />
                    </div>
                </div>
            }
            {/* Remove Event Confirmation Popup */}
            {isRemoveConfirmed !== "" &&
                <div
                    className='fixed flex inset-0 justify-center items-center bg-black bg-opacity-50 z-50'
                    onClick={() => setIsRemoveConfirmed("")}>
                    <div
                        className='bg-white'
                        onClick={(e) => e.stopPropagation()}>
                        <div className='grid gap-y-7 justify-center p-5'>
                            <p className='font-bold text-[1.2rem]'>Are You Sure You Want To Remove The Event ?</p>
                            <div className='flex justify-center gap-x-10'>
                                <button
                                    className='bg-green-500 text-white font-semibold px-5 py-2 rounded-[10px] hover:scale-105'
                                    onClick={() => setIsRemoveConfirmed("")}>Cancel</button>
                                <button
                                    className='bg-red-500 text-white font-semibold px-5 py-2 rounded-[10px] hover:scale-105'
                                    onClick={() => RemoveEvent(isRemoveConfirmed, isEventUsed, setIsEventUsed, setIsRemoveConfirmed)}>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
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

                            <div className='absolute top-0 w-full flex justify-between p-2'>
                                {/* Edit Event Button */}
                                <button
                                    className=' bg-green-100 p-2 rounded-full hover:scale-105'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setEvent(event);
                                        setEE(true);
                                    }}>
                                    <svg
                                        width="25px"
                                        height="25px"
                                        viewBox="0 -0.5 21 21"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <title>{"edit_cover [#1481]"}</title>
                                        <desc>{"Created with Sketch."}</desc>
                                        <defs />
                                        <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                            <g
                                                id="Dribbble-Light-Preview"
                                                transform="translate(-419.000000, -359.000000)"
                                                fill="#000000"
                                            >
                                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                                    <path
                                                        d="M384,209.210475 L384,219 L363,219 L363,199.42095 L373.5,199.42095 L373.5,201.378855 L365.1,201.378855 L365.1,217.042095 L381.9,217.042095 L381.9,209.210475 L384,209.210475 Z M370.35,209.51395 L378.7731,201.64513 L380.4048,203.643172 L371.88195,212.147332 L370.35,212.147332 L370.35,209.51395 Z M368.25,214.105237 L372.7818,214.105237 L383.18415,203.64513 L378.8298,199 L368.25,208.687714 L368.25,214.105237 Z"
                                                        id="edit_cover-[#1481]"
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                                {/* Remove Event Button */}
                                <button
                                    className=' bg-green-100 p-2 rounded-full hover:scale-105'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsRemoveConfirmed(event?._id);
                                    }}>
                                    <svg
                                        fill="#ff0000"
                                        id="Capa_1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        width="25px"
                                        height="25px"
                                        viewBox="0 0 490.646 490.646"
                                        xmlSpace="preserve"
                                        stroke="#ff0000">
                                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <g id="SVGRepo_iconCarrier">
                                            <g>
                                                <g>
                                                    <path d="M399.179,67.285l-74.794,0.033L324.356,0L166.214,0.066l0.029,67.318l-74.802,0.033l0.025,62.914h307.739L399.179,67.285z M198.28,32.11l94.03-0.041l0.017,35.262l-94.03,0.041L198.28,32.11z" />
                                                    <path d="M91.465,490.646h307.739V146.359H91.465V490.646z M317.461,193.372h16.028v250.259h-16.028V193.372L317.461,193.372z M237.321,193.372h16.028v250.259h-16.028V193.372L237.321,193.372z M157.18,193.372h16.028v250.259H157.18V193.372z" />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>

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

export default OwnAllEvents