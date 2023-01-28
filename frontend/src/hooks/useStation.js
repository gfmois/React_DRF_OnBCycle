import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import StationService from "../services/StationService";
import StationsContext from "../context/StationsContext"

export function useStations() {
    const {stations, setStations} = useContext(StationsContext)
    const [cols, setCols] = useState([])

    const getStations = useCallback(
        () => {
            StationService.getALlStations()
                .then(({ data }) => {
                    console.log('Inside stations Hook');
                    setStations(data)
                })
                .catch((e) => console.log(e))
        },
        [stations]
    )

    const getStationsCols = useCallback(
        () => {
            StationService.getStationCols()
                .then(({ data }) => {
                    console.log('Inside Cols Hook');
                    setCols(data)
                })
                .catch((e) => console.log(e))
        },
        [ setCols ]
    )

    useEffect(
        () => {
            getStationsCols()
        },
        []
    )

    useEffect(
        () => {
            getStations()
        },
        []
    )

    return { stations, cols, getStations, getStationsCols }
}