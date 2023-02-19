import Http from "./http";

const NotificationsSerivce = {
    sendNotification: (data) => {
        return Http().post('notifications/send_notification', data)
    },
    getUserNotifications: () => {
        return Http().get('notifications/get_user_notifications')
    }
}

export default NotificationsSerivce