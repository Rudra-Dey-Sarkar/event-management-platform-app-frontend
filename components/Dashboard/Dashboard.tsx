"use client"
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'

type UserDataType = [{
    name: string,
    email: string,
    password: string
}]

function Dashboard() {
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
        <div>

            {user.length > 0 &&
                <div>
                    {user[0]?.email}
                </div>}
        </div>
    )
}

export default Dashboard