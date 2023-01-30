import { useState } from "react";
import { Map, Marker } from "react-map-gl";
import LoadingComponent from "../Layout/LoadingComponent";

export default function MapComponent({ initial = {}, item = {}, zoom = 17, action }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <div className="absolute z-100">
        {isLoading ? <LoadingComponent /> : null}
      </div>
      <Map
        onLoad={(e) => setIsLoading(false)}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        onClick={action}
        initialViewState={{
          longitude: initial.long || item.long,
          latitude: initial.lat || item.lat,
          zoom,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {item.long && item.lat ? (
          <Marker
            longitude={item.long}
            latitude={item.lat}
            anchor="top"
            color="red"
          />
        ) : null}
      </Map>
    </>
  );
}
