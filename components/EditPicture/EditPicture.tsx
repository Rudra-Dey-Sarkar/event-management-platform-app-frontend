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

function EditPicture({ user, setEP }: { user: UserDataType | any[], setEP: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { event, setEvent }: any = useContext(GlobalContext);
    const {isEventUsed, setIsEventUsed}:any = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [picUrl, setPicUrl] = useState<string>("#");

    const form = useForm<EventDataType>({
        defaultValues: {
            _id:event?._id,
            imageUrl: "",
        }
    });

    const { register, handleSubmit, setValue , formState: { errors } } = form;

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
                onSubmit={handleSubmit((data) => EditEventData(data, setIsLoading, setEP, isEventUsed, setIsEventUsed))}>

                {isLoading === true &&
                    <div className='fixed flex inset-0 justify-center items-center bg-gray-100 bg-opacity-50 z-50'>
                        <img
                            src="https://hstilxjonxwbqwojwimd.supabase.co/storage/v1/object/sign/profile_picture/features/loader.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlX3BpY3R1cmUvZmVhdHVyZXMvbG9hZGVyLmdpZiIsImlhdCI6MTczODY2NzgyNSwiZXhwIjo0NzM0NTg3ODI1fQ.EzqgoARETFtL8vemGmLZrzTzdKfHyd0u5inm4CWtmcE" alt="Loading....."
                            className='w-[100px] h-[100px]' />
                    </div>
                }

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


                <button
                    type='submit'
                    className='bg-gray-300 p-2 mt-2 font-semibold'>Save Picture</button>
            </form>
        </div>
    )
}

export default EditPicture