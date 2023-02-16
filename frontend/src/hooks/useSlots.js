import { useState, useCallback, useEffect } from "react";
import SlotService from "../services/SlotService";

export function useSlots() {
    const [slots, setSlots] = useState([])

    const getSlots = useCallback(() => {
        SlotService.getAllSlots()
            .then(({ data }) => {
                setSlots(data)
            })
            .catch((e) => console.log(e))
    })

    useEffect(() => getSlots(), [])

    return { slots, setSlots }
}