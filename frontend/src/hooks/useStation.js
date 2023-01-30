import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import StationsContext from "../context/StationsContext";
import StationService from "../services/StationService";

export function useStations() {
    const { stations, setStations } = useContext(StationsContext)
    const [cols, setCols] = useState([])

    const getStations = useCallback(
        () => {
            StationService.getAllStations()
                .then(({ data }) => {
                    setStations(data);
                })
                .catch((e) => console.log(e))
        },
        [stations]
    )

    const getStationsCols = useCallback(
        () => {
            StationService.getStationCols()
                .then(({ data }) => {
                    setCols(data)
                })
                .catch((e) => console.log(e))
        },
        [setCols]
    )

    const addStation = useCallback((station) => {
        StationService.addStation(station)
            .then((e) => {
                console.log(e);
            })
    })

    useEffect(() => { getStationsCols() }, [])

    useEffect(() => { getStations() },[])

    return { stations, cols, getStations, getStationsCols, addStation }
}