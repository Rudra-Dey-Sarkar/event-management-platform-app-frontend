"use client"
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import EditPicture from '../EditPicture/EditPicture';
import AddAttendees from '../AddAttendees/AddAttendees';

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
async function ViewSpecificEvent(id: string, setEventDetails: React.Dispatch<React.SetStateAction<any[] | EventDataType>>) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/view-specific-events-details`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: id })
        });
        const resData = await response.json();
        if (response.ok) {
            setEventDetails(resData.reverse());
        } else {
            console.log("No Events Found");
        }
    } catch (errors) {
        console.log("Cannot Proceed To View Event Due To :-", errors);
    }

}

function EventModal({ setIsModalOpen, user }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>, user: any[] | UserDataType }) {
    const { event, setEvent }: any = useContext(GlobalContext);
    const { isEventUsed, setIsEventUsed }: any = useContext(GlobalContext);
    const [EE, setEE] = useState<boolean>(false);
    const [EP, setEP] = useState<boolean>(false);
    const [AA, setAA] = useState<boolean>(false);
    const [eventDetails, setEventDetails] = useState<EventDataType | any[]>([]);
    const [isRemoveConfirmed, setIsRemoveConfirmed] = useState<string>("");

    useEffect(() => {
        ViewSpecificEvent(event?._id, setEventDetails);
    }, [isEventUsed]);

    return (
        <div className='grid gap-5 p-2 rounded-[10px] bg-green-100 w-full'>
 
            {/* Edit Pictures */}
            {EP === true &&
                <div
                    className='fixed flex inset-0 justify-center items-center bg-black bg-opacity-50 z-50'
                    onClick={() => setEE(false)}>
                    <div
                        className='bg-white'
                        onClick={(e) => e.stopPropagation()}>
                        <EditPicture user={user} setEP={setEP} />
                    </div>
                </div>
            }
            {/* Add Attendees */}
            {AA === true &&
                <div
                    className='fixed flex inset-0 justify-center items-center bg-black bg-opacity-50 z-50'
                    onClick={() => setAA(false)}>
                    <div
                        className='bg-white'
                        onClick={(e) => e.stopPropagation()}>
                        <AddAttendees user={user} setAA={setAA} />
                    </div>
                </div>
            }
 
            <div className='flex items-start'>
                <img
                    src={eventDetails[0]?.imageUrl}
                    alt="profile-pic"
                    className=' w-[200px] h-[200px] m-auto rounded-[10px] p-2 border-2 border-gray-500' />
                <button
                    className='font-bold text-red-500'
                    onClick={() => { setIsModalOpen(false) }}>Close</button>
            </div>
            <div className='sm:flex grid justify-center gap-2'>
 
                {/* Edit Picture Button */}
                <button
                    className='font-bold border-4 border-gray-500 px-4 py-1 rounded-[10px] hover:bg-gray-100'
                    onClick={() => setEP(true)}>Edit Picture</button>
                {/* Add Attendees Button */}
                <button
                    className='font-bold border-4 border-gray-500 px-4 py-1 rounded-[10px] bg-green-500 text-white hover:bg-gray-100 hover:text-black'
                    onClick={() => setAA(true)}>Add Attendees +</button>
 
            </div>
            <div className='sm:flex grid justify-between border-t-2 border-gray-500'>
                <div className='w-fit pr-2 sm:border-r-2 sm:border-gray-500'>
                    <p><strong>Event Name :- </strong>{eventDetails[0]?.eventName}</p>
                    <p><strong>Owner Name :- </strong>{eventDetails[0]?.ownerName}</p>
                    <p><strong>Event Category :- </strong>{eventDetails[0]?.category}</p>
                </div>
                <div className='w-fit pr-2 sm:border-r-2 sm:border-gray-500'>
                    <p><strong>Event Start Date :- </strong>{eventDetails[0]?.dateAndTime?.date}</p>
                    <p><strong>Owner Name :- </strong>{eventDetails[0]?.dateAndTime?.time}</p>
                    <p><strong>Event Description :- </strong>{eventDetails[0]?.description}</p>
                </div>

                <div>
                    <p className='font-bold underline'>Attendees ({eventDetails[0]?.attendees?.length}) :-</p>
                    <div className='w-fit h-[100px] overflow-y-auto'>
                        {eventDetails[0]?.attendees?.map((attendee: { name: string }, index: number) =>
                            <p key={index}>{attendee?.name}</p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EventModal