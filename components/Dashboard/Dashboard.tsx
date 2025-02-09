"use client"
import { deleteCookie, getCookie } from 'cookies-next';
import React, { useContext, useEffect, useState } from 'react'
import AddEvent from '../AddEvent/AddEvent';
import { useRouter } from 'next/navigation';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import OwnAllEvents from '../OwnAllEvents/OwnAllEvents';
import EventModal from '../EventModal/EventModal';
 

type UserDataType = [{
    name: string,
    email: string,
    password: string
}]
function ControlAddTask(setIsGuest: React.Dispatch<React.SetStateAction<boolean>>, user: any[] | UserDataType, setAE: React.Dispatch<React.SetStateAction<boolean>>) {
    if (user?.[0]?.email === "guest") {
        setIsGuest(true);
    } else {
        setAE(true);
    }
}
function Dashboard() {
    const router = useRouter();
    const { isPresent, setIsPresent }: any = useContext(GlobalContext);
    const [user, setUser] = useState<UserDataType | any[]>([]);
    const [AE, setAE] = useState<boolean>(false);
    const [isGuest, setIsGuest] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const cookies = getCookie("user");

        if (cookies !== undefined && typeof cookies === "string") {
            const userCookieData = JSON.parse(cookies);
            setUser(userCookieData);
        } else {
            console.log("cookies not present");
        }
    }, []);

    return (
        <div className='p-2'>
            {/* Add Event Popup */}
            {AE === true &&
                <div
                    className='fixed flex inset-0 justify-center items-center bg-black bg-opacity-50 z-50'
                    onClick={() => setAE(false)}>
                    <div
                        className='bg-white'
                        onClick={(e) => e.stopPropagation()}>
                        <AddEvent user={user} setAE={setAE} />
                    </div>
                </div>
            }
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
            {/* Event Modal */}
            {isModalOpen === true &&
                <div
                    className='fixed flex inset-0 justify-center items-end bg-black bg-opacity-50 z-50'
                    onClick={() => setIsModalOpen(false)}>
                    <div
                        className='w-full bg-white p-5 rounded-t-[10px]'
                        onClick={(e) => e.stopPropagation()}>
                        <EventModal setIsModalOpen={setIsModalOpen} />
                    </div>
                </div>
            }

            {/* Controlling Add Events */}
            <div className='flex justify-between pb-2 border-b-2 border-gray-200'>
                <p className='font-bold text-[1.6rem]'>Your Events :-</p>
                <button
                    className='border-2 border-gray-500 px-4 py-1 bg-green-100 rounded-[10px] text-[1rem] font-semibold'
                    onClick={() => ControlAddTask(setIsGuest, user, setAE)}>Add Event</button>
            </div>
            {/* Own All Events */}
            {(user.length > 0 && user?.[0]?.email !== "guest") &&
                <div>
                    <div className='flex justify-between'>
                        <p className='text-[1.2rem] font-semibold underline'>All Events :-</p>
                        <button
                            className='font-semibold underline text-green-500  hover:text-gray-500'
                        >View All</button>
                    </div>
                    <div className='h-fit w-full overflow-x-auto '>
                        <OwnAllEvents user={user} setIsModalOpen={setIsModalOpen} />
                    </div>
                </div>}
        </div>
    )
}

export default Dashboard