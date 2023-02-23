import { useDashboard } from "../../hooks/useDashboard"
export default function DashboardComponent() {
    const { info } = useDashboard()
    return (
        <div className="flex-1 m-2 p-2 w-full h-full text-black">
            <div className="p-4 w-full h-full">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center flex-col justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">Usuarios</p>
                            <p className="text-2xl text-gray-400 dark:text-gray-500">{info.users}</p>
                        </div>
                        <div className="flex items-center justify-center flex-col h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">Bicicletas</p>
                            <p className="text-2xl text-gray-400 dark:text-gray-500">{info.bikes}</p>
                        </div>
                        <div className="flex items-center justify-center flex-col h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">Slots</p>
                            <p className="text-2xl text-gray-400 dark:text-gray-500">{info.slots}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                        {/* // TODO: Install ChartJS to make an little graphic */}
                        <p className="text-2xl text-gray-400 dark:text-gray-500">CharJS de las reservas por mes del año actual</p>
                    </div>
                </div>
            </div>
        </div>
    )
}