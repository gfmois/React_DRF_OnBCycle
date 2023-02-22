import Http from "./http";

const NotificationsSerivce = {
    sendNotification: (data) => {
        return Http().post('notifications/send_notification', data)
    },
    getUserNotifications: () => {
        return Http().get('notifications/get_user_notifications')
    },
    getNotificationByID: (idNotification) => {
        return Http().get(`notifications/get_notification/${idNotification}`)
    },
    removeNotification: (notificationID) => {
        return Http().put(`notifications/read_notification/${notificationID}`)
    },
    sendIncidence: (incidence) => {
        return Http().post('notifications/send_incidence', incidence)
    }
}

export default NotificationsSerivce