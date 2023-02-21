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
                bikes[bikes.findIndex(e => e.id_bike == bikeData.id_bike)] = { ...bikeData, status: Boolean(bikeData.status) }
                setBikes([...bikes])
                loadToast(data.msg, data.status)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    useEffect(() => getBikes(), [])

    return { bikes, setBikes, getBikes, updateBike }
}