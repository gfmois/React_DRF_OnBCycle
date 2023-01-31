import { useCallback, useState } from "react";
import MapService from "../services/MapService";

export function useMap() {
  const [ mapLocation, setMapLocation ] = useState({});

  const getLocation = useCallback(
    (str) => {
      MapService.getLocation(str)
        .then(({ data }) => {
          setMapLocation(data);
        })
        .catch((e) => console.log(e));
    },
    [mapLocation]
  );

  return { mapLocation, setMapLocation, getLocation };
}
