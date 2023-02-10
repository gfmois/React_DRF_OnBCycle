import { BsArrowRightSquareFill } from "react-icons/bs"

export default function SidebarItemComponent({ name, setPage, icon, index }) {
    return (
        <li>
            <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => setPage(index)}>
                <BsArrowRightSquareFill />
                <span className="flex-1 ml-3 whitespace-nowrap">{name}</span>
            </div>
        </li>
    )
}