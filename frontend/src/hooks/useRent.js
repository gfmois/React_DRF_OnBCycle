import { useState, useCallback, useEffect } from "react"
import RentService from "../services/RentService"
import { useToast } from "./useToaster"

export function useRent() {
    const { loadToast, toast } = useToast()
    const [bike, setBike] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [rents, setRents] = useState([])
    const [userRents, setUserRents] = useState([])

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
                loadToast(data.msg, data.status)
                setBike(null)
            })
            .catch((e) => {
                loadToast(e.response.data.msg, e.response.data.status)
                console.log(e);
            })
    })

    const getAllReserves = useCallback(() => {
        RentService.getAllReserves()
            .then(({ data }) => {
                setRents(data)
            })
            .catch((e) => {
                loadToast(e.response.data.msg, e.response.data.status)
                console.log(e);
            })
    })

    const getUserRents = useCallback(() => {
        RentService.getUserRents()
            .then(({ data }) => {
                if (data.msg && data.status) {
                    loadToast(data.msg, data.status)
                    return
                }

                setUserRents(data)
            })
    })

    useEffect(() => { getReservedBike() }, [])
    useEffect(() => { getAllReserves() }, [])
    useEffect(() => { getUserRents() }, [])

    return { bike, setBike, leaveBike, reserveBike, getReservedBike, isLoading, setIsLoading, rents, getUserRents, userRents, setUserRents }
}