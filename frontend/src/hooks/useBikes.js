import { useState, useCallback, useEffect } from "react";
import { useToast } from "./useToaster";
import BikeService from "../services/BikeService";

export function useBikes() {
    const [bikes, setBikes] = useState([])
    const { loadToast } = useToast()

    const getBikes = useCallback(() => {
        BikeService.getBikes()
            .then(({ data }) => {
                setBikes(data)
            })
            .catch((e) => console.log(e))
    })

    const updateBike = useCallback((bikeData) => {
        BikeService.updateBike(bikeData)
            .then(({ data }) => {
                setBikes([...bikes.map((e, i) => e.id_bike == bikeData ? e = bikeData : e)])
                loadToast(data.msg, data.status)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    useEffect(() => getBikes(), [])

    return { bikes, setBikes, getBikes, updateBike }
}