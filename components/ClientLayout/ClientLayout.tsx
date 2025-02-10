"use client"
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext'
import { Toaster } from 'react-hot-toast';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Topbar from '../Topbar/Topbar';

import { usePathname } from 'next/navigation';

type UserDataType = [{
    name: string,
    email: string,
    password: string
}]

function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
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
                {(isPresent === true && (pathname !== "/" && pathname !== "/dashboard")) &&
                    <div className='p-2'>
                        <button
                            className='flex text-[1.2rem] font-bold items-center'
                            onClick={() => router.back()}>
                            <svg
                                width="25px"
                                height="25px"
                                viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill="#000000"
                                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                                />
                                <path
                                    fill="#000000"
                                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                                />
                            </svg>
                            <p>Back</p>
                        </button>
                    </div>
                }
                {children}
            </div>
        </div>
    )
}

export default ClientLayout