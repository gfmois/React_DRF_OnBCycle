import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import StationsContext from "../context/StationsContext";
import StationService from "../services/StationService";
import { useToast } from "./useToaster";

export function useStations() {
    const { stations, setStations } = useContext(StationsContext)
    const [cols, setCols] = useState([])
    const [station, setStation] = useState({})
    const { loadToast, toast } = useToast()

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
            .then(({ data }) => {
                setStations([...stations, data])
                loadToast(`Station Created Correctly`, "success");
            })
    })

    const getAllStation = useCallback((stationID) => {
        StationService.getFullStation(stationID)
            .then(({ data }) => {
                setStation(data)
            })
            .catch((e) => console.log(e))
    }, [setStation])

    const updateStation = useCallback((stationData) => {
        StationService.updateStation(stationData)
            .then(({ data }) => {
                stations[stations.findIndex((s) => s.id_station == stationData.id_station)] = stationData
                loadToast(data.msg, data.status)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    const removeStation = useCallback((idStation) => {
        StationService.removeStation(idStation)
            .then(({ data }) => {
                setStation(stations.filter((e) => e.id_station != idStation))
                loadToast(data.msg, data.status)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    useEffect(() => { getStationsCols() }, [])

    useEffect(() => { getStations() }, [])

    return { stations, station, cols, getStations, getStationsCols, addStation, getAllStation, setStations, setStation, updateStation, removeStation }
}