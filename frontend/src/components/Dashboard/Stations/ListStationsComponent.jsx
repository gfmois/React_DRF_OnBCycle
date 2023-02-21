import ListTableComponent from "../../ListTableComponent";
import { useStations } from "../../../hooks/useStation";
import { useEffect, useState } from "react";

export default function ListStationsComponent() {
    const { stations, updateStation, removeStation, addStation, cols } = useStations()
    const [c_stations, setCStations] = useState([])

    const update = (updateItem) => {
        delete updateItem.slots
        updateStation(updateItem)
    }

    useEffect(() => {
        let t = []
        stations.map(e => {
            t.push({ ...e, slots: e.slots.length })
        })
        setCStations(t)
    }, [stations])

    return (
        <ListTableComponent 
            key={'stations'} 
            items={c_stations} 
            model={cols} 
            onlyView={false} 
            modelMap={true} 
            addAction={addStation} 
            updateAction={update} 
            removeAction={(e) => removeStation(e.id_station)} 
        />
    )
}