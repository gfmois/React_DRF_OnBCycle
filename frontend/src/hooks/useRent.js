import { useState, useCallback, useEffect } from "react"
import RentService from "../services/RentService"
import { useToast } from "./useToaster"

export function useRent() {
    const { loadToast, toast } = useToast()
    const [bike, setBike] = useState(null)

    const getReservedBike = useCallback(() => {
        RentService.getReservedBike()
            .then(({ data }) => {
                setBike(data.bike)
            })
            .catch((e) => {
                loadToast(e.msg, 'error')
            })
    })

    const reserveBike = useCallback((stationID) => {
        RentService.reserveBike(stationID)
            .then(({ data }) => {
                setBike(data.bike)
                loadToast(data.msg, data.status == 200 ? 'success' : 'warning')
            })
            .catch((e) => {
                loadToast(e.response.data.msg, 'warning')
            })
    })

    const leaveBike = useCallback((bikeId, stationId) => {
        RentService.leaveBike(bikeId, stationId)
            .then(({ data }) => {
                console.log(data);
                loadToast(data.msg, 'success')
                setBike(null)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    useEffect(() => { getReservedBike() }, [])

    return { bike, setBike, leaveBike, reserveBike, getReservedBike }
}