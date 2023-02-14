import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import StationsContext from "../context/StationsContext";
import StationService from "../services/StationService";
import { useToast } from "./useToaster";

export function useStations() {
    const { stations, setStations } = useContext(StationsContext)
    const [cols, setCols] = useState([])
    const [bike, setBike] = useState(null)
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

    const reserveBike = useCallback((stationID) => {
        StationService.reserveBike(stationID)
            .then(({ data }) => {
                setBike(data.bike)
                loadToast(data.msg, 'success')
            })
            .catch((e) => {
                loadToast(e.response.data.msg, 'warning')
            })
    })

    const leaveBike = useCallback((stationId) => {
        StationService.leaveBike(stationId)
            .then(({ data }) => {
                setBike(false)
                loadToast('Leaved', 'success')
            })
            .catch((e) => {
                loadToast(e, 'error')
            })
    })

    useEffect(() => { getStationsCols() }, [])

    useEffect(() => { getStations() }, [])

    return { reserveBike, stations, station, cols, getStations, getStationsCols, addStation, getAllStation, bike, setBike }
}