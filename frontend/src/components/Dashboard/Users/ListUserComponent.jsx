import ListTableComponent from "../../ListTableComponent";
import FormModalComponent from "../../FormModalComponent"
import { useEffect, useState } from "react"
import { useAuth } from "../../../hooks/useAuth";
import { useNotifications } from "../../../hooks/useNotifications"

export default function ListUserComponent() {
    // TODO: Set delete function and update function
    const { getUsers, usersList } = useAuth()
    const { sendNotification } = useNotifications()

    const loadNotification = (notificationData) => {
        sendNotification(notificationData)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return <ListTableComponent sendNotification={true} items={usersList} key={usersList.length} modelMap={false} notificationAction={loadNotification} />
}