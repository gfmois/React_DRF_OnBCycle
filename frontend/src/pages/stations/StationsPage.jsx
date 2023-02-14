import StationsListItems from "../../components/Stations/StationsListItems";
import StationDetails from "../../components/Stations/StationDetails";
import { useStations } from "../../hooks/useStation";
import { useReducer, useState } from "react";

export default function StationsPage() {
  const { stations, station, cols, addStation, getAllStation, bike, setBike, reserveBike } = useStations();
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type == "CHANGE_FORM") {
        return {
          ...state,
          formActived: action.formActived,
          details_station: action.details_station,
        };
      }

      return state;
    },
    { formActived: false, details_station: {} }
  );

  const changeFormStatus = (actived, details_station) => {
    if (details_station) {
      getAllStation(details_station.id_station)
      console.log(station);
    }
    dispatch({ type: "CHANGE_FORM", formActived: actived, details_station });
  };

  return (
    <div className="h-screen w-screen">
      {state.formActived ? (
        <StationDetails
          item={state.details_station}
          visible={state.formActived}
          changeFormVisibility={changeFormStatus}
          setBike={reserveBike}
          bike={bike}
        />
      ) : (
        <StationsListItems
          addStation={addStation}
          changeFormStatus={changeFormStatus}
          stations={stations}
          cols={cols}
        />
      )}
    </div>
  );
}
