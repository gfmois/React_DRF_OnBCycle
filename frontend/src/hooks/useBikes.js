import { useState, useCallback, useEffect } from "react";
import { useToast } from "./useToaster";
import BikeService from "../services/BikeService";

export function useBikes() {
    const [bikes, setBikes] = useState([])
    const [cols, setCols] = useState([])
    const { loadToast } = useToast()

    const getBikes = useCallback(() => {
        BikeService.getBikes()
            .then(({ data }) => {
                console.log(data);
                setBikes(data)
            })
            .catch((e) => console.log(e))
    })

    const updateBike = useCallback((bikeData) => {
        BikeService.updateBike(bikeData)
            .then(({ data }) => {
                bikes[bikes.findIndex(e => e.id_bike == bikeData.id_bike)] = { ...bikeData, status: Boolean(bikeData.status) || false }
                loadToast(data.msg, data.status)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    const deleteBike = useCallback((bikeID) => {
        BikeService.deleteBike(bikeID)
            .then(({ data }) => {
                loadToast(data.msg, data.status)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    const getModelCols = useCallback(() => {
        BikeService.getCols()
            .then(({ data }) => {
                console.log(data);
                setCols(data)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    const createBike = useCallback((bike) => {
        BikeService.createBike(bike)
            .then(({ data }) => {
                setBikes([ ...bikes, bike ])
                loadToast(data.msg, data.status)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    useEffect(() => getBikes(), [])
    useEffect(() => getModelCols(), [])

    return { bikes, setBikes, getBikes, updateBike, deleteBike, getModelCols, cols, setCols, createBike }
}