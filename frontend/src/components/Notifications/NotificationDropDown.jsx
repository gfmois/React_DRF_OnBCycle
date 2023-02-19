import { GrNotification } from "react-icons/gr"
import { useState } from "react"
import NotificationItem from "./NotificationItem"

export default function NotificationDropDown() {
    const [showNotifications, setNotifications] = useState(false)
    return (
        <div className="bg-white/30 border rounded-full p-2">
            <GrNotification className="cursor-pointer" onClick={() => setNotifications(!showNotifications)} />
            {
                !showNotifications ||
                <div className="absolute z-30 xs:h-1/3 xs:w-[65%] md:h-1/3 md:w-1/3 overflow-y-scroll remove-scroll bg-red-900/50 right-0 xs:top-[7%] sm:top-[8%] lg:top-[9%]">
                    <div className="container p-6 flex gap-6 flex-col">
                        <NotificationItem />
                        <NotificationItem />
                        <NotificationItem />
                    </div>
                </div>
            }
        </div>
    )
}