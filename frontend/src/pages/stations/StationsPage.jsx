import StationsListItems from "../../components/Stations/StationsListItems";
import StationForm from "../../components/Stations/StationForm";
import { useStations } from "../../hooks/useStation";
import { useState } from "react";

export default function StationsPage() {
  const { stations, getStations } = useStations();
  const [formActived, setFormActived] = useState(false);
  const [station, setStation] = useState({});

  const changeFormStatus = (actived, station) => {
    setFormActived(actived);
    setStation(station);
  };

  return formActived ? (
    <StationForm
      item={station}
      visible={formActived}
      changeFormVisibility={changeFormStatus}
    />
  ) : (
    <StationsListItems
      changeFormStatus={changeFormStatus}
      stations={stations}
    />
  );
}
