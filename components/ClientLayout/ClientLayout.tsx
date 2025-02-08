"use client"
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext'
import { Toaster } from 'react-hot-toast';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Topbar from '../Topbar/Topbar';


type UserDataType = [{
    name: string,
    email: string,
    password: string
}]

function ClientLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isPresent, setIsPresent }: any = useContext(GlobalContext);
    const [user, setUser] = useState<UserDataType | any[]>([]);

    useEffect(() => {
        const cookies = getCookie("user");

        if (cookies !== undefined && typeof cookies === "string") {
            const userCookieData = JSON.parse(cookies);
            setIsPresent(true);
            setUser(userCookieData);
            router.push("/dashboard");
        } else {
            console.log("cookies not present");
            setIsPresent(false);
            router.push("/");
        }
    }, [isPresent]);

    return (
        <div className="w-full h-full" >
            <Toaster />
            {isPresent === true &&
                <Topbar />
            }
            <div className='w-full min-h-[100vh]'>
                {children}
            </div>
        </div>
    )
}

export default ClientLayout