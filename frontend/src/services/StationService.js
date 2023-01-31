import Http from "./http"

const StationService = {
    getAllStations() {
        return Http().get('stations')
    },
    getStationCols() {
        return Http().get('stations/cols')
    },
    addStation(station) {
        return Http().post('stations/create', station)
    }
}

export default StationService;