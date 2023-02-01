import Http from "./http";

const MapService = {
  getLocation(str) {
    return Http().get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${str}.json?access_token=${
        import.meta.env.VITE_MAPBOX_TOKEN
      }`
    );
  },
};

export default MapService