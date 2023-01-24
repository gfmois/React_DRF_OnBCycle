import mapbox from "mapbox-gl";
import { useEffect, useState, useRef } from "react";

export default function MapComponent({ item }) {
  const marker = {
    type: "Feature",
    properties: {
      title: "Marcador",
      description: "Marcador 1",
    },
    geometry: {
      coordinates: [38.82444274016997, -0.6040024707834653],
      type: "Point",
    },
  };
  mapbox.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(item.long);
  const [lat, setLat] = useState(item.lat);
  const [zoom, setZoom] = useState(17);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapbox.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

//   new mapbox.Marker().setLngLat(marker.geometry.coordinates).addTo(map);
  return <div ref={mapContainer} className="h-full rounded-lg"></div>;
}
