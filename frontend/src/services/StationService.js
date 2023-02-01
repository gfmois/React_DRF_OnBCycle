import Http from "./http"

const StationService = {
    getAllStations() {
        return Http().get('stations')
    },
    getStationCols() {
        return Http().get('stations/cols')
    },
    addStation(station) {
        return Http().post('stations/create', station, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default StationService;