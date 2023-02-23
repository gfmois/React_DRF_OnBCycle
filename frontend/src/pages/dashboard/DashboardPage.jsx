import React, { useState, Suspense } from "react"
import SidebarComponent from "../../components/Dashboard/SidebarComponent"
import LoadingComponent from "../../components/Layout/LoadingComponent"

export default function DashboardPage() {
    const [pageComp, setPageComp] = useState(0)
    const Dashboard = React.lazy(() => import("../../components/Dashboard/DashboardComponent"))
    const Inbox = React.lazy(() => import('../../components/Dashboard/Inbox/ListInboxItemsComponent'))
    const Users = React.lazy(() => import('../../components/Dashboard/Users/ListUserComponent'))
    const Slots = React.lazy(() => import('../../components/Dashboard/Slots/ListSlotsComponent'))
    const Stations = React.lazy(() => import('../../components/Dashboard/Stations/ListStationsComponent'))
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
    const [ showSidebar, setShowSidebar ] = useState(false)

    return (
        <React.Fragment>
            <div className="flex w-full h-full">
                <SidebarComponent page={setPageComp} items={pagesNames} />
                <Suspense fallback={<LoadingComponent />}>
                    <div className="w-full h-full p-5 xs:absolute sm:static">
                        {pages[pageComp]}
                    </div>
                </Suspense>
            </div>
        </React.Fragment>
    )
}