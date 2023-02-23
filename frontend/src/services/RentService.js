import Http from "./http";

const RentService = {
    leaveBike(idBike, idStation) {
        return Http().post(`rents/leave_bike`, {
            bike: idBike,
            station: idStation
        })
    },
    reserveBike(stationID) {
        return Http().get(`rents/${stationID}`)
    },
    getReservedBike() {
        return Http().get('rents/getRentedBike')
    },
    getAllReserves() {
        return Http().get('rents/getRents')
    },
    getUserRents() {
        return Http().get('rents/get_user_rents')
    }
}

export default RentService