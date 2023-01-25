import { useCallback, useEffect, useState } from "react";
import StationService from "../services/StationService";

export function useStations() {
    const [stations, setStations] = useState([])

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