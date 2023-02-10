import { useAuth } from "../../hooks/useAuth"
import { GrBike } from "react-icons/gr"
import SidebarItemComponent from "./SidebarItemComponent"

export default function SidebarComponent({ page, items = [] }) {
    const { logout } = useAuth()

    return (
        <aside id="default-sidebar" className="flex w-fit h-screen max-h-[93vh] box-border transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2">
                    {items.map((e, index) => <SidebarItemComponent name={e.name} icon={e.icon} index={index} setPage={() => page(e.index)} key={index} />)}

                    <li className="absolute bottom-3">
                        <div className="cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-rose-500 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={logout}>
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-rose-500 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    )
}