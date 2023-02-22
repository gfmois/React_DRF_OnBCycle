import { useCallback, useEffect, useState } from "react";
import NotificationsSerivce from "../services/NotificationsService";
import { useToast } from "./useToaster"

export function useNotifications() {
    const { loadToast } = useToast()
    const [userNotifications, setUserNotifications] = useState([])
    const [notification, setNotification] = useState({})
    const [loading, setLoading] = useState(false)

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

    const getNotification = useCallback((notificationId) => {
        setLoading(true)
        NotificationsSerivce.getNotificationByID(notificationId)
            .then(({ data }) => {
                setNotification(data)
                setLoading(false)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    const removeNotification = useCallback((notificationId) => {
        setLoading(true)
        NotificationsSerivce.removeNotification(notificationId)
            .then(({ data }) => {
                loadToast(data.msg, data.status)
                setLoading(false)
                setUserNotifications(userNotifications.filter((e) => e.id_notification != notificationId))
            })
            .catch((e) => {
                console.log(`Error: ${e}`);
            })
    })

    const sendIncidence = useCallback((incidence) => {
        console.log(incidence);
        NotificationsSerivce.sendIncidence(incidence)
            .then(({ data }) => {
                console.log(data);
                loadToast(data.msg, data.status)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    useEffect(() => getUserNotifications(), [])

    return { sendNotification, getUserNotifications, userNotifications, setUserNotifications, getNotification, notification, setNotification, setLoading, loading, removeNotification, sendIncidence }
}

export default useNotifications