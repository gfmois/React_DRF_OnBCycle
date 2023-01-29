import React, { useState } from "react";
import { useEffect } from "react";
import StationService from "../services/StationService";

const Context = React.createContext({});

export function StationContextProvider({ children }) {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    StationService.getALlStations()
      .then(({ data }) => {
        setStations(data)
      })
      .catch((e) => console.log(e))
  }, [ setStations ])

  return (
    <Context.Provider value={{ stations, setStations }}>
      {children}
    </Context.Provider>
  );
}

export default Context;