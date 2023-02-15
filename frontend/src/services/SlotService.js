import Http from "./http"

const SlotService = {
    getAllSlots() {
        return Http().get('slots')
    }
}

export default SlotService