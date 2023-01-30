import StationsListItems from "../../components/Stations/StationsListItems";
import StationDetails from "../../components/Stations/StationDetails";
import { useStations } from "../../hooks/useStation";
import { useReducer, useState } from "react";

export default function StationsPage() {
  const { stations, cols, addStation } = useStations();
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type == "CHANGE_FORM") {
        return {
          ...state,
          formActived: action.formActived,
          station: action.station,
        };
      }

      return state;
    },
    { formActived: false, station: {} }
  );

  const changeFormStatus = (actived, station) => {
    dispatch({ type: "CHANGE_FORM", formActived: actived, station });
  };

  return (
    <div className="h-screen w-screen">
      {state.formActived ? (
        <StationDetails
          item={state.station}
          visible={state.formActived}
          changeFormVisibility={changeFormStatus}
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
