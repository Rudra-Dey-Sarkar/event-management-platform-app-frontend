"use client"
import React, { useEffect, useState } from 'react'
import ViewAll from '../../../../components/ViewAll/ViewAll';
import { getCookie } from 'cookies-next';

type UserDataType = [{
    name: string,
    email: string,
    password: string
}]
type PageProps = {
    params: Promise<{ eventId: string }>;
};
function EventDateTime({ params }: PageProps) {
    const [eventId, setEventId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;
            setEventId(resolvedParams.eventId);
        }
        fetchParams();

    }, [params]);

    return (
        <div>
            <ViewAll eventId={eventId} />
        </div>
    )
}

export default EventDateTime