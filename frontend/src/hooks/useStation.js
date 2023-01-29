import { useCallback, useContext, useEffect, useState } from "react";
import StationService from "../services/StationService";
import StationsContext from "../context/StationsContext"

export function useStations() {
    const [stations, setStations] = useContext(StationsContext)

    useEffect(() => {
        StationService.getALlStations()
            .then(({data}) => {
                setStations(data)
            })
            .catch((e) => console.log(e))
    }, [ setStations ])

    const getStations = useCallback(() => {
        StationService.getALlStations()
            .then(({ data }) => {
                setStations(data)
            })
            .catch((e) => console.log(e))
    }, [ stations ])

    return { stations, getStations }
}