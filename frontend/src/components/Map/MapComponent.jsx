import { useState } from "react";
import { Map, Marker } from "react-map-gl";
import LoadingComponent from "../Layout/LoadingComponent";
import { useMap } from "../../hooks/useMap";
import InputWithListComponent from "../InputWithListComponent";

export default function MapComponent({
  initial = {},
  item = {},
  zoom = 17,
  action,
  search = false,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { getLocation, mapLocation, setMapLocation } = useMap();

  const getLocationByInput = (e) => {
    getLocation(e.target.value);
  };

  return (
    <>
      <div className="absolute z-100">
        {isLoading ? <LoadingComponent /> : null}
      </div>
      {!isLoading && search ? (
        <div className="absolute z-50 bg-gray-800/30 right-0 p-4 xs:top-14 sm:top-0 w-2/6">
          <InputWithListComponent
            items={mapLocation.features}
            onItemSelected={action}
            placeholder="City to Search"
            actionOnInput={getLocationByInput}
          />
        </div>
      ) : null}
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
