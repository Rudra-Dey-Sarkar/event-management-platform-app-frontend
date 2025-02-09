"use client"
import { deleteCookie, getCookie } from 'cookies-next';
import React, { useContext, useEffect, useState } from 'react'
import AddEvent from '../AddEvent/AddEvent';
import { useRouter } from 'next/navigation';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
 
  
type UserDataType = [{
    name: string,
    email: string,
    password: string
}]

function Profile() {
    const router = useRouter();
        const { isPresent, setIsPresent }: any = useContext(GlobalContext);
        const [user, setUser] = useState<UserDataType | any[]>([]);

    
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
    <div className='w-full h-[100vh] flex justify-center items-center'>
        {(user.length > 0 && user?.[0]?.email === "guest") ? 
         <div>
              <p className='text-[2rem] font-bold'>Guest Account</p>
         </div>
         :
         <div>
             <p><strong>Name :- </strong>{user?.[0]?.name}</p>
             <p><strong>Email :- </strong>{user?.[0]?.email}</p>
             <p><strong>Password :- </strong>{user?.[0]?.password}</p>
         </div>
          }
    </div>
  )
}

export default Profile