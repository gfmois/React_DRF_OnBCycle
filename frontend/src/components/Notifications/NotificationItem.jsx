import { GiCrossMark } from "react-icons/gi"

export default function NotificationItem() {
    return (
        <div className="h-full w-full bg-white/20 rounded-md border gap-4 flex flex-row">
            <div className="_img flex items-center rounded-full p-2">
                <img src="/test.png" className="w-16 h-16 rounded-full" alt="" />
            </div>
            <div className="_content flex gap-2 flex-col  items-start justify-center w-1/3">
                <div className="_title text-black/60">
                    <h1>Title</h1>
                </div>
                <div className="_s_descr text-black/40">
                    <p>description</p>
                </div>
            </div>
        </div>
    )
}