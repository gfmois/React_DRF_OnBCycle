import StationsListItems from "../../components/Stations/StationsListItems";
import StationDetails from "../../components/Stations/StationDetails";
import { useStations } from "../../hooks/useStation";
import { useState } from "react";
import FormModalComponent from "../../components/FormModalComponent";

export default function StationsPage() {
  const { stations, getStations } = useStations();
  const [formActived, setFormActived] = useState(false);
  const [station, setStation] = useState({});

  const changeFormStatus = (actived, station) => {
    setFormActived(actived);
    setStation(station);
  };

  return <FormModalComponent />

  // return formActived ? (
  //   <StationDetails
  //     item={station}
  //     visible={formActived}
  //     changeFormVisibility={changeFormStatus}
  //   />
  // ) : (
  //   <StationsListItems
  //     changeFormStatus={changeFormStatus}
  //     stations={stations}
  //   />
  // );
}
