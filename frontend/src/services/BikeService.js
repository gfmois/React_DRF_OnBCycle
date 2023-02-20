import Http from "./http";

const BikeService = {
    getBikes() {
        return Http().get('bikes')
    },
    updateBike(bike) {
        return Http().post('bikes/modify_bike', bike)
    }
}

export default BikeService