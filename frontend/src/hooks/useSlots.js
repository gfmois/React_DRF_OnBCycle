import { useState, useCallback, useEffect } from "react";
import SlotService from "../services/SlotService";
import { useToast } from "./useToaster"

export function useSlots() {
    const [slots, setSlots] = useState([])
    const { loadToast } = useToast()
    const [cols, setCols] = useState([])

    const getSlots = useCallback(() => {
        SlotService.getAllSlots()
            .then(({ data }) => {
                setSlots(data)
            })
            .catch((e) => console.log(e))
    })

    const colsModal = useCallback(() => {
        SlotService.getModelCols()
            .then(({ data }) => {
                setCols(data)
            })
            .catch((e) => {
                console.log(e);
            })
    })
    
    const updateSlot = useCallback((slotData) => {
        SlotService.updateSlot(slotData)
            .then(({ data }) => {
                // TODO: Update to False not working
                loadToast(data.msg, data.status || 'error')
                slots[slots.findIndex((e) => e.id_slot == slotData.id_slot)] = slotData
            })
            .catch((e) => {
                loadToast(e.response.data.msg, e.response.data.status)
            })
    })

    const removeSlot = useCallback((idSlot) => {
        SlotService.removeSlot(idSlot)
            .then(({ data }) => {
                console.log(data);
                loadToast(data.msg, data.error)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    const addSlot = useCallback((data) => {
        SlotService.addSlot(data)
            .then(({ data }) => {
                loadToast(data.msg, data.status)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    useEffect(() => getSlots(), [])

    useEffect(() => colsModal(), [])

    return { slots, setSlots, updateSlot, removeSlot, colsModal, cols, setCols, addSlot }
}