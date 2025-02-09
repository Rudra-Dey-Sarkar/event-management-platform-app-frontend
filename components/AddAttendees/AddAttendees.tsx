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

async function EditEventData(data: EventDataType, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, setEE: any, isEventUsed:boolean, setIsEventUsed: any ) {
 
    setIsLoading(true);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/edit-event`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            setEE(false);
            setIsLoading(false);
            if(isEventUsed===false){
                setIsEventUsed(true);
            }else{
                setIsEventUsed(false);
            }
            toast.success("Event Edited Successfully");
        } else {
            setIsLoading(false);
            toast.error("An Error Occurred");
        }
    } catch (errors) {
        setIsLoading(false);
        console.log("Cannot Proceed To Add Event Due To :-", errors);
        toast.error("Cannot Edit Event");
    }

}

function AddAttendees({ user, setAA }: { user: UserDataType | any[], setAA: React.Dispatch<React.SetStateAction<boolean>> }) {
    const {isEventUsed, setIsEventUsed}:any = useContext(GlobalContext);
    const { event, setEvent }: any = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [picUrl, setPicUrl] = useState<string>("#");

    const form = useForm<EventDataType>({
        defaultValues: {
            _id:event?._id,
            attendees: []
        }
    });

    const { register, handleSubmit, setValue, control, formState: { errors } } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "attendees",
    });
    return (
        <div className='relative w-fit overflow-y-auto p-5'>
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
                onSubmit={handleSubmit((data) => EditEventData(data, setIsLoading, setAA, isEventUsed, setIsEventUsed))}>


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
                    className='bg-gray-300 p-2 mt-2 font-semibold'>Save Attendees</button>
            </form>
        </div>
    )
}

export default AddAttendees