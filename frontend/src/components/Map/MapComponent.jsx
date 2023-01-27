import { Map, Marker } from "react-map-gl";

export default function MapComponent({ item }) {
  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{
        longitude: item.long,
        latitude: item.lat,
        zoom: 17,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <Marker longitude={item.long} latitude={item.lat} anchor="top" color="red" />
    </Map>
  );
}
