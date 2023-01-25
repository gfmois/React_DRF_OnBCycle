import Http from "./http"

const StationService = {
    getALlStations() {
        return Http().get('stations')
    }
}

export default StationService;