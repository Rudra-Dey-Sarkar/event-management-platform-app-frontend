"use client"

export function CompareDateAndTime(date: string, time: string) {
    const today = new Date();
    const givenDate = new Date(date);
    const formattedGivenDate = givenDate.toISOString().split("T")[0];

    if (formattedGivenDate === today.toISOString().split("T")[0]) {
        return "today";
    } else {
        const combinedDateTime = new Date(`${date}T${time}:00`);
        const now = new Date();

        if (combinedDateTime > now) {
            return "upcoming";
        } else {
            return "past";
        }
    }
}