import { useState } from "react"
import FormModalComponent from "./FormModalComponent"
import StatusComponent from "./StatusCompononet";
import SendNotificationComponent from "./Notifications/SendNotificationComponent";
import { useNotifications } from "../hooks/useNotifications"
import ButtonComponent from "./Layout/ButtonComponent";
import { GoDiffAdded } from "react-icons/go"

export default function ListTableComponent({
    items = [],
    modelMap = true,
    onlyView = true,
    sendNotification = false,
    notificationAction,
    openModal = true,
    removeAction,
    removeBtn = true,
    updateAction,
    addAction,
    showAddModal = true,
    model = []
}) {
    const [itemSelected, setItemSelected] = useState(false)
    const [replyModal, setReplyModal] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const { notification, getNotification, loading } = useNotifications()

    const loadNotification = async (notificationData) => {
        let data
        if (itemSelected.email) {
            data = { ...notificationData, to: itemSelected.email }
        } else {
            getNotification(replyModal.id_notification)
            if (!loading) {
                data = { ...notificationData, to: notification.from }
            } else {
                throw new Error('No Notification Received')
            }

        }

        notificationAction(data)
    }

    return <>
        {
            items.length > 0
                ? <>
                    {itemSelected
                        ? (
                            <div className="w-full h-full">
                                <FormModalComponent
                                    loadNotification={loadNotification}
                                    sendNotiButton={!replyModal ? sendNotification : false}
                                    showMap={modelMap}
                                    onlyView={onlyView}
                                    action={updateAction}
                                    cols={Object.keys(itemSelected)}
                                    changeVisibility={() => setItemSelected(false)}
                                    item={itemSelected}
                                />
                            </div>
                        )
                        : !replyModal || <SendNotificationComponent sendAction={loadNotification} backAction={setReplyModal} />
                    }
                    <div className="relative overflow-x-auto sm:rounded-lg shadow-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    {Object.keys(items[0]).map((e, i) => <th key={i} scope="col" className="px-6 py-3">
                                        {e}
                                    </th>)}
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!showAddModal || <tr>
                                    <td colSpan={11} className="text-center p-6 bg-slate-600">
                                        <div className="flex items-center justify-center cursor-pointer" onClick={() => setAddModal(true)}>
                                            <GoDiffAdded size="1.25rem" />
                                        </div>
                                    </td>
                                </tr>}
                                {items.map((element, index) =>
                                    <tr className={index % 2 == 0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"} key={index}>
                                        {Object.keys(element).map((key) =>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {key == 'status'
                                                    ? <StatusComponent status={element[key]} />
                                                    : element[key] == null
                                                        ? <p className="uppercase text-amber-500">Empty</p>
                                                        : key == "body"
                                                            ? `${element[key].slice(0, 10)}...`
                                                            : element[key]
                                                }
                                            </th>
                                        )}
                                        <td className="px-6 py-4 flex flex-row gap-4">
                                            {openModal || <div className="font-medium text-emerald-600 dark:text-emerald-500 hover:underline cursor-pointer" onClick={() => setReplyModal(element)}>Reply</div>}
                                            <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" onClick={() => setItemSelected(element)}>See</div>
                                            {!removeBtn || <div className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer" onClick={() => removeAction(element)}>Remove</div>}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div >
                </>
                : <div className="flex items-center justify-center w-full h-[85vh] flex-col gap-4">
                    <h1 className="text-3xl uppercase">No items founded</h1>
                    {!showAddModal || <ButtonComponent text="Add One" style="default" action={() => setAddModal(true)} />}
                </div>
        }
        {!addModal || <FormModalComponent required={false} showMap={modelMap} cols={model} changeVisibility={setAddModal} action={addAction} />}
    </>
}