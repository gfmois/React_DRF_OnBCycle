import Http from "./http"

const SlotService = {
    getAllSlots() {
        return Http().get('slots')
    },
    updateSlot(slot) {
        return Http().post('slots/update_slot', slot)
    },
    removeSlot(slotID) {
        return Http().get(`slots/delete_slot/${slotID}`)
    },
    getModelCols() {
        return Http().get('slots/cols')
    },
    addSlot(slotData) {
        return Http().post('slots/create_slot', slotData)
    }
}

export default SlotService