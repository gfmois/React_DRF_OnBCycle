import { useState } from "react";

export default function ProfilePage() {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="w-screen h-screen p-4 relative">
            <div className="w-full h-[25%] bg-[url(/mountain.PNG)] bg-no-repeat bg-cover p-4 rounded-lg shadow-xl"/>
            <div className="absolute text-red-700 top-[20%] rounded-full bg-red-700 w-[128px] h-[128px] left-[48%] shadow-xl"/>
        </div>
    )
}