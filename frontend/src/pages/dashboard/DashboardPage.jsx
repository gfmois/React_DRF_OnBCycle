import React, { useState, Suspense } from "react"
import SidebarComponent from "../../components/Dashboard/SidebarComponent"
import DashboardComponent from "../../components/Dashboard/DashboardComponent"
import LoadingComponent from "../../components/Layout/LoadingComponent"

export default function DashboardPage() {
    const [pageComp, setPageComp] = useState(0)
    const Inbox = React.lazy(() => import('../../components/Dashboard/Inbox/ListInboxItemsComponent'))
    const Users = React.lazy(() => import('../../components/Dashboard/Users/ListUserComponent'))
    const Slots = React.lazy(() => import('../../components/Dashboard/Slots/ListSlotsComponent'))

    const pages = [<DashboardComponent/>, <Inbox/>, <Users />, <Slots/>]

    return (
        <>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <div className="flex">
                <SidebarComponent page={setPageComp} />
                <Suspense fallback={<LoadingComponent/>}>
                    <div className="w-full h-full p-5">
                        {pages[pageComp]}
                    </div>
                </Suspense>
            </div>
        </>
    )
}