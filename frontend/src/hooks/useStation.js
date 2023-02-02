import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import StationsContext from "../context/StationsContext";
import StationService from "../services/StationService";

export function useStations() {
    const { stations, setStations } = useContext(StationsContext)
    const [cols, setCols] = useState([])
    const [station, setStation] = useState({})

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
        const formData = new FormData()
        formData.append('file', station.image[0])
        Object.keys(station).map((k) => {
            if (k != 'image') {
                formData.append(k, station[k])
            }
        })
        
        StationService.addStation(formData)
            .then((e) => {
                console.log(e);
            })
    })

    const getAllStation = useCallback((stationID) => {
        StationService.getFullStation(stationID)
            .then(({ data }) => {
                setStation(data)
            })
            .catch((e) => console.log(e))
    }, [setStation])

    useEffect(() => { getStationsCols() }, [])

    useEffect(() => { getStations() }, [])

    return { stations, station, cols, getStations, getStationsCols, addStation, getAllStation }
}