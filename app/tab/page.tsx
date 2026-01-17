'use client';

import { useState } from "react";

export default function TabPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        window.location.href = "https://www.cursor.com";
    };

    if (isLoading) {
        return <div className="flex flex-col items-center justify-center h-screen">
            Loading...
         </div>
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Cursor's Tab Features</h1>
            <p>Cursor's tab features are great for developers who want to work on multiple projects at once.</p>
            <p>Cursor's tab features are great for developers who want to work on multiple projects at once.</p>

            <button onClick={handleClick} className="bg-blue-500 text-white p-2 rounded-md">
                Learn More
            </button>
        </div>
    );
}