import { useState, useCallback, useEffect } from "react";
import BikeService from "../services/BikeService";

export function useBikes() {
    const [bikes, setBikes] = useState([])

    const getBikes = useCallback(() => {
        BikeService.getBikes()
            .then(({ data }) => {
                setBikes(data)
            })
            .catch((e) => console.log(e))
    })

    useEffect(() => getBikes(), [])

    return { bikes, setBikes, getBikes }
}