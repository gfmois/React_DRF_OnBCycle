import ListTableComponent from "../../ListTableComponent";
import { useNotifications } from "../../../hooks/useNotifications"

export default function ListInboxItemsComponent() {
    const { userNotifications, sendNotification, removeNotification } = useNotifications()

    const loadNotification = (notificationData) => {
        sendNotification(notificationData)
    }

    const removeNotificationAction = (notification) => {
        removeNotification(notification.id_notification)
    }
    
    return (
        <ListTableComponent items={userNotifications} sendNotification={true} notificationAction={loadNotification} modelMap={false} openModal={false} removeAction={removeNotificationAction} />
    )
}