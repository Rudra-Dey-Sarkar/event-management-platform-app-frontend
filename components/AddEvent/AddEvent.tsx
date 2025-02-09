"use client"
import React, { useContext, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import PictureSelection from '../PictureSelection/PictureSelection'
import toast from 'react-hot-toast'
import { GlobalContext } from '../../GlobalContext/GlobalContext'

type UserDataType = [{
    name: string,
    email: string,
    password: string
}]
type EventDataType = {
    _id:string,
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
}

async function AddEventData(data: EventDataType, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, setAE: any, isEventUsed:boolean, setIsEventUsed: any ) {


    setIsLoading(true);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/add-event`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            setAE(false);
            setIsLoading(false);
            if(isEventUsed===false){
                setIsEventUsed(true);
            }else{
                setIsEventUsed(false);
            }
            toast.success("Event Added Successfully");
        } else {
            setIsLoading(false);
            toast.error("An Error Occurred");
        }
    } catch (errors) {
        setIsLoading(false);
        console.log("Cannot Proceed To Add Event Due To :-", errors);
        toast.error("Cannot Add Event");
    }

}

function AddEvent({ user, setAE }: { user: UserDataType | any[], setAE: React.Dispatch<React.SetStateAction<boolean>> }) {
    const {isEventUsed, setIsEventUsed}:any = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [picUrl, setPicUrl] = useState<string>("#");

    const form = useForm<EventDataType>({
        defaultValues: {
            userId: user?.[0]?.email,
            ownerName: user?.[0]?.name,
            eventName: "",
            category: "",
            description: "",
            dateAndTime: {
                date: "",
                time: ""
            },
            imageUrl: "",
            attendees: []
        }
    });

    const { register, handleSubmit, setValue, control, formState: { errors } } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "attendees",
    });
    return (
        <div className='relative w-fit h-[90vh] overflow-y-auto p-5'>
            {isActive === true &&
                <div className='fixed flex inset-0 justify-center items-center bg-black bg-opacity-50 z-50'
                    onClick={() => setIsActive(false)}>
                    <div
                        className='bg-white'
                        onClick={(e) => e.stopPropagation()}>
                        <PictureSelection setIsActive={setIsActive} setValue={setValue} picUrl={picUrl} setPicUrl={setPicUrl} />
                    </div>
                </div>
            }

            <form
                className='grid border-2 gap-y-2 border-gray-300 p-2'
                onSubmit={handleSubmit((data) => AddEventData(data, setIsLoading, setAE, isEventUsed, setIsEventUsed))}>


                {isLoading === true &&
                    <div className='fixed flex inset-0 justify-center items-center bg-gray-100 bg-opacity-50 z-50'>
                        <img
                            src="https://hstilxjonxwbqwojwimd.supabase.co/storage/v1/object/sign/profile_picture/features/loader.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlX3BpY3R1cmUvZmVhdHVyZXMvbG9hZGVyLmdpZiIsImlhdCI6MTczODY2NzgyNSwiZXhwIjo0NzM0NTg3ODI1fQ.EzqgoARETFtL8vemGmLZrzTzdKfHyd0u5inm4CWtmcE" alt="Loading....."
                            className='w-[100px] h-[100px]' />
                    </div>
                }

                <label htmlFor="text">Enter Event Owner Name</label>
                <input type="text"
                    {...register("ownerName", { required: true })}
                    className='border-2 border-gray-300 p-1' />
                {errors?.ownerName && <p className='text-[12px] text-red-500'>Event Owner Name Is Required</p>}

                <label htmlFor="text">Enter Event Name</label>
                <input type="text"
                    {...register("eventName", { required: true })}
                    className='border-2 border-gray-300 p-1' />
                {errors?.eventName && <p className='text-[12px] text-red-500'>Event Name Is Required</p>}

                <label htmlFor="text">Select Event Category</label>
                <select
                    className='border-2 border-gray-300 p-1'
                    {...register("category", { required: true })}>
                    <option value="">Event Category</option>
                    <option value="Conferences">Conferences</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Seminars">Seminars</option>
                    <option value="Networking Events">Networking Events</option>
                    <option value="Trade Shows">Trade Shows</option>
                    <option value="Exhibitions">Exhibitions</option>
                    <option value="Concerts">Concerts</option>
                    <option value="Festivals">Festivals</option>
                    <option value="Award Ceremonies">Award Ceremonies</option>
                    <option value="Charity Events">Charity Events</option>
                    <option value="Corporate Events">Corporate Events</option>
                    <option value="Product-Launches">Product Launches</option>
                    <option value="Sports Events">Sports Events</option>
                    <option value="Social Gatherings">Social Gatherings</option>
                    <option value="Weddings">Weddings</option>
                    <option value="Meetups">Meetups</option>
                    <option value="Hackathons">Hackathons</option>
                    <option value="Training-sessions">Training Sessions</option>
                    <option value="Fundraisers">Fundraisers</option>
                </select>
                {errors?.category && <p className='text-[12px] text-red-500'>Event Category Is Required</p>}

                <label htmlFor="text">Enter Event Description</label>
                <input type="text"
                    {...register("description", { required: true })}
                    className='border-2 border-gray-300 p-1' />
                {errors?.description && <p className='text-[12px] text-red-500'>Event Description Is Required</p>}


                <label htmlFor="text">Enter Event Date and Time</label>
                <div className='flex gap-x-2 border-2 border-gray-300 p-1'>
                    <div className='grid'>
                        <label htmlFor="Date">Select Date</label>
                        <input type="date"
                            {...register("dateAndTime.date", { required: true })}
                            className='border-2 border-gray-300 p-1' />
                        {errors?.dateAndTime?.date && <p className='text-[12px] text-red-500'>Event Date Is Required</p>}
                    </div>
                    <div className='grid'>
                        <label htmlFor="Date">Enter Time</label>
                        <input type="time"
                            {...register("dateAndTime.time", { required: true })}
                            className='border-2 border-gray-300 p-1' />
                        {errors?.dateAndTime?.time && <p className='text-[12px] text-red-500'>Event Time Is Required</p>}
                    </div>
                </div>

                <label htmlFor="text">Select Event Image</label>
                <div className='grid gap-y-2 border-2 border-gray-300 p-1'>
                    {picUrl !== "#" &&
                        <img
                            src={picUrl}
                            alt="profile-pic"
                            className='w-[100px] h-[100px] m-auto' />}

                    <button
                        type='button'
                        className='border-2 border-gray-300 bg-green-100 p-1'
                        onClick={() => setIsActive(true)}>Add Picture</button>
                    {errors?.imageUrl && <p className='text-[12px] text-red-500'>Event Image Is Required</p>}
                </div>



                <label>Enter Event Attendees</label>
                <div className='grid border-2 border-gray-300 p-1'>
                    <div className='w-full max-h-[100px] overflow-y-auto '>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    {...register(`attendees.${index}.name`, { required: true })} // Update to access the name field
                                    className="border-2 border-gray-300 p-1"
                                />
                                <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white p-1">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => append({ name: "" })} // Append an object with a name field
                        className="bg-blue-500 text-white p-1 mt-2"
                    >
                        Add Attendee
                    </button>
                </div>


                <button
                    type='submit'
                    className='bg-gray-300 p-2 mt-2 font-semibold'>Add Event</button>
            </form>
        </div>
    )
}

export default AddEvent