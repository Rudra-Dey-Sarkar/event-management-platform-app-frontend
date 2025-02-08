"use client"
import React, { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext';

function EventModal({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { event, setEvent }: any = useContext(GlobalContext);
    return (
        <div className='grid gap-5 p-2 rounded-[10px] bg-green-100 w-full'>
            <div className='flex items-start'>
                <img
                    src={event?.imageUrl}
                    alt="profile-pic"
                    className=' w-[200px] h-[200px] m-auto rounded-[10px] p-2 border-2 border-gray-500' />
                <button 
                className='font-bold text-red-500'
                onClick={() =>setIsModalOpen(false)}>Close</button>
            </div>

            <div className='sm:flex grid justify-between border-t-2 border-gray-500'>
                <div className='w-fit pr-2 sm:border-r-2 sm:border-gray-500'>
                    <p><strong>Event Name :- </strong>{event?.eventName}</p>
                    <p><strong>Owner Name :- </strong>{event?.ownerName}</p>
                    <p><strong>Event Category :- </strong>{event?.category}</p>
                </div>
                <div className='w-fit pr-2 sm:border-r-2 sm:border-gray-500'>
                    <p><strong>Event Start Date :- </strong>{event?.dateAndTime?.date}</p>
                    <p><strong>Owner Name :- </strong>{event?.dateAndTime?.time}</p>
                    <p><strong>Event Description :- </strong>{event?.description}</p>
                </div>

                <div>
                    <p className='font-bold underline'>Attendees ({event?.attendees?.length}) :-</p>
                    <div className='w-fit h-[100px] overflow-y-auto'>
                        {event?.attendees?.map((attendee: { name: string }, index: number) =>
                            <p key={index}>{attendee?.name}</p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EventModal