import { useCallback, useEffect, useState } from "react";
import NotificationsSerivce from "../services/NotificationsService";
import { useToast } from "./useToaster"

export function useNotifications() {
    const { loadToast } = useToast()
    const [userNotifications, setUserNotifications] = useState([])

    const getUserNotifications = useCallback(() => {
        NotificationsSerivce.getUserNotifications()
            .then(({ data }) => {
                setUserNotifications(data)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    const sendNotification = useCallback((notiInfo) => {
        NotificationsSerivce.sendNotification(notiInfo)
            .then(({ data }) => {
                loadToast(data.msg, data.status)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    useEffect(() => getUserNotifications(), [])

    return { sendNotification, getUserNotifications, userNotifications, setUserNotifications }
}

export default useNotifications