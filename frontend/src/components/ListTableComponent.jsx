import { useState } from "react"
import FormModalComponent from "./FormModalComponent"

export default function ListTableComponent({ items = [], modelMap = true, onlyView = true, sendNotification = false, notificationAction }) {
    const [itemSelected, setItemSelected] = useState(false)

    const loadNotification = (notificationData) => {
        if (itemSelected.email) {
            let data = { ...notificationData, to: itemSelected.email }
            notificationAction(data)
            return
        }

        throw new Error("Error not user")
    }

    return (
        items.length > 0
            ? <>
                {itemSelected ? <FormModalComponent loadNotification={loadNotification} sendNotiButton={sendNotification} showMap={modelMap} onlyView={onlyView} cols={Object.keys(itemSelected)} changeVisibility={() => setItemSelected(false)} item={itemSelected} /> : null}
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
                            {items.map((element, index) =>
                                <tr className={index % 2 == 0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"} key={index}>
                                    {Object.keys(element).map((key) =>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {key == 'status'
                                                ? <StatusComponent status={element[key]} />
                                                : element[key] == null
                                                    ? <p className="uppercase text-amber-500">Empty</p>
                                                    : element[key]}
                                        </th>
                                    )}
                                    <td className="px-6 py-4 flex flex-row gap-4">
                                        <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" onClick={() => setItemSelected(element)}>See</div>
                                        <div className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Remove</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div >
            </>
            : <div className="flex items-center justify-center w-full h-[85vh]">
                <h1 className="text-3xl">No items</h1>
            </div>
    )
}