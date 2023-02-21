import Http from "./http";

const BikeService = {
    getBikes() {
        return Http().get('bikes')
    },
    updateBike(bike) {
        return Http().post('bikes/modify_bike', bike)
    },
    deleteBike(bikeID) {
        return Http().get(`bikes/deleteBike/${bikeID}`)
    },
    getCols() {
        return Http().get('bikes/cols')
    },
    createBike(bike) {
        return Http().post('bikes/create_bike', bike)
    }
}

export default BikeService