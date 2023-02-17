import { useState, useCallback, useEffect } from "react"
import RentService from "../services/RentService"
import { useToast } from "./useToaster"

export function useRent() {
    const { loadToast, toast } = useToast()
    const [bike, setBike] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getReservedBike = useCallback(() => {
        RentService.getReservedBike()
            .then(({ data }) => {
                setBike(data.bike)
            })
            .catch((e) => {
                console.log(e);
                loadToast(e.response.data.msg, e.response.data.status)
            })
    })

    const reserveBike = useCallback((stationID) => {
            setIsLoading(true)
            RentService.reserveBike(stationID)
            .then(({ data }) => {
                setBike(data.bike)
                loadToast(data.msg, data.status)
                setIsLoading(false)
            })
            .catch((e) => {
                console.log(e);
                loadToast(e.response.data.msg, e.response.data.status)
            })
    })

    const leaveBike = useCallback((bikeId, stationId) => {
        RentService.leaveBike(bikeId, stationId)
            .then(({ data }) => {
                console.log(data);
                loadToast(data.msg, data.status)
                setBike(null)
            })
            .catch((e) => {
                loadToast(e.response.data.msg, e.response.data.status)
                console.log(e);
            })
    })

    useEffect(() => { getReservedBike() }, [])

    return { bike, setBike, leaveBike, reserveBike, getReservedBike, isLoading, setIsLoading }
}