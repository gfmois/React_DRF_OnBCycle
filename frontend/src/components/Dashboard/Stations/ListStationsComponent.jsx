import ListTableComponent from "../../ListTableComponent";
import { useStations } from "../../../hooks/useStation";
import { useEffect, useState } from "react";

export default function ListStationsComponent() {
    const { stations } = useStations()
    const [c_stations, setCStations] = useState([])

    useEffect(() => {
        let t = []
        stations.map(e => {
            t.push({ ...e, slots: e.slots.length })
        })
        setCStations(t)
    }, [stations])

    return (
        <ListTableComponent items={c_stations} key={'stations'} onlyView={false} modelMap={true} />
    )
}