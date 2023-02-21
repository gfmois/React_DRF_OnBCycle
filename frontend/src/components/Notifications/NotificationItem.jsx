import { GiCrossMark } from "react-icons/gi"
import { MdAdminPanelSettings } from "react-icons/md"

export default function NotificationItem({ item }) {
    console.log(item);
    return (
        <div className="h-full w-full bg-white/20 rounded-md border gap-4 flex flex-row">
            <div className="_img flex items-center rounded-full p-2">
                {
                    item.from == 'Administrator'
                        ? <MdAdminPanelSettings color="#2d2d2d" className="w-16 h-16 rounded-full"/>
                        : <GiCrossMark className="w-16 h-16 rounded-full"/>
                }
            </div>
            <div className="_content flex gap-2 flex-col  items-start justify-center w-1/3">
                <div className="_title">
                    <h1>{ item.title }</h1>
                </div>
                <div className="_s_descr ">
                    <p>{item.body }</p>
                </div>
            </div>
        </div>
    )
}