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
    },
    getFullStation(stationID) {
        return Http().get(`stations/info/${stationID}`)
    },
    updateStation(station) {
        return Http().post('/stations/update_station', station)
    },
    removeStation(stationID) {
        return Http().delete(`stations/delete/${stationID}`)
    }
}

export default StationService;