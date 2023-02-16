import React, { useState, Suspense, useEffect, Component } from "react"
import SidebarComponent from "../../components/Dashboard/SidebarComponent"
import LoadingComponent from "../../components/Layout/LoadingComponent"

export default function DashboardPage() {
    const [pageComp, setPageComp] = useState(0)
    const Dashboard = React.lazy(() => import("../../components/Dashboard/DashboardComponent"))
    const Inbox = React.lazy(() => import('../../components/Dashboard/Inbox/ListInboxItemsComponent'))
    const Users = React.lazy(() => import('../../components/Dashboard/Users/ListUserComponent'))
    const Slots = React.lazy(() => import('../../components/Dashboard/Slots/ListSlotsComponent'))
    const Stations = React.lazy(() => import('../../components/Dashboard/Stations/ListStationsComponent'))
<<<<<<< HEAD
    const Bikes = React.lazy(() => import('../../components/Dashboard/Bikes/ListBikesComponent'))

    const pages = [<Dashboard key={'Dashboard'} />, <Inbox key={"Inbox"} />, <Users key={"Users"} />, <Slots key={"Slots"} />, <Stations key={"Stations"}/>, <Bikes key={'Bikes'}/>]
    const pagesNames = pages.map((c, i) => { return { name: c.key, index: i } });
=======
    const Bikes = React.lazy(() => import("../../components/Dashboard/Bikes/ListBikesComponent"))
    const Rents = React.lazy(() => import('../../components/Dashboard/Rents/ListRentsComponent'))

    const pages = [
        <Dashboard key={'Dashboard'} />,
        <Inbox key={"Inbox"} />,
        <Users key={"Users"} />,
        <Rents key={'Rents'} />,
        <Stations key={"Stations"} />,
        <Slots key={"Slots"} />,
        <Bikes key={'Bikes'} />,
    ]
    const pagesNames = pages.map((component, index) => ({ name: component.key, index }));
>>>>>>> c3ea983304074b07baa5af576ffdf10aaf061fc5

    return (
        <>
            {/* // TODO: Make Sidebar visible onClick \\ */}
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <div className="flex w-full h-full">
                {/* // TODO: Make responsive \\  */}
                <SidebarComponent page={setPageComp} items={pagesNames} />
                <Suspense fallback={<LoadingComponent />}>
                    <div className="w-full h-full p-5 xs:absolute sm:static">
                        {pages[pageComp]}
                    </div>
                </Suspense>
            </div>
        </>
    )
}