import ListTableComponent from "../../ListTableComponent";
import { useNotifications } from "../../../hooks/useNotifications"

export default function ListInboxItemsComponent() {
    const { userNotifications } = useNotifications()
    
    return (
        <ListTableComponent items={userNotifications} sendNotification={true} modelMap={false} openModal={false} />
    )
}