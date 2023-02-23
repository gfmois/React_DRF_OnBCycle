import ListTableComponent from "../../ListTableComponent";
import FormModalComponent from "../../FormModalComponent"
import { useEffect, useState } from "react"
import { useAuth } from "../../../hooks/useAuth";
import { useNotifications } from "../../../hooks/useNotifications"
import { useProfile } from "../../../hooks/useProfile";

export default function ListUserComponent() {
    // TODO: Set delete function and update function
    const { getUsers, usersList } = useAuth()
    const { deleteProfile } = useProfile()
    const { sendNotification } = useNotifications()

    const loadNotification = (notificationData) => {
        sendNotification(notificationData)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return <ListTableComponent showAddModal={false} sendNotification={true} items={usersList} key={usersList.length} modelMap={false} removeAction={({ id_user }) => deleteProfile(id_user)} notificationAction={loadNotification} />
}