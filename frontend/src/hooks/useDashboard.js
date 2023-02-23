import { useEffect, useState } from "react"
import DashboardService from "../services/DashboardService"

export function useDashboard() {
    const [info, setInfo] = useState([])
    const getDashboardInfo = () => {
        DashboardService.getDashboardInfo()
            .then(({ data }) => {
                console.log(data);
                setInfo(data)
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => { getDashboardInfo() }, [])

    return { info, setInfo, getDashboardInfo }
}