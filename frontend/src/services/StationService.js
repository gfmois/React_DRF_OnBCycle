import Http from "./http"

const StationService = {
    getALlStations() {
        return Http().get('stations')
    },
    getStationCols() {
        return Http().get('stations/cols')
    }
}

export default StationService;