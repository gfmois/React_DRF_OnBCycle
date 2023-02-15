import Http from "./http";

const BikeService = {
    getBikes() {
        return Http().get('bikes')
    }
}

export default BikeService