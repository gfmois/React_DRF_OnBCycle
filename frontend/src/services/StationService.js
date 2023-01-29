import Http from "./http"

const StationService = {
    getALlStations() {
        return Http().get('stations')
    },
    getStationCols() {
        return Http().get('stations/cols')
    },
    addStation(station) {
        return Http().post('stations/add', station)
    }
}

export default StationService;