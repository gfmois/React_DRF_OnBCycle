import { GrNotification } from "react-icons/gr"
import { useState } from "react"
import NotificationItem from "./NotificationItem"
import useNotifications from "../../hooks/useNotifications"
import { motion } from "framer-motion"

export default function NotificationDropDown() {
    const [showNotifications, setNotifications] = useState(false)
    const { userNotifications, removeNotification } = useNotifications()
    

    return (
        <div className="bg-white/30 border rounded-full p-2">
            <GrNotification className="cursor-pointer" onClick={() => setNotifications(!showNotifications)} />
            {
                !showNotifications ||
                <div className="absolute z-30 xs:h-1/3 xs:w-[65%] md:h-1/3 md:w-1/3 overflow-y-scroll remove-scroll bg-slate-800 rounded-lg shadow-lg right-4 border-slate-900 border-2 xs:top-[7%] sm:top-[8%] lg:top-[9%]">
                    <div className="container p-6 flex gap-6 flex-col">
                        {userNotifications.length > 0
                            ? userNotifications.map((item) => <NotificationItem action={() => removeNotification(item.id_notification)} item={item} />)
                            : <div className="uppercase flex items-center justify-center w-full h-full flex-col gap-4">
                                <h1>No Notifications Yet</h1>
                                <motion.div
                                    animate={{
                                        x: [-10, 10, -10, 10, 0],
                                        rotate: [0, -10, 10, -10, 0],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        repeatType: 'reverse'
                                    }}
                                    className="cursor-pointer"
                                >
                                    <GrNotification color="white" size="2rem" />
                                </motion.div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}