import React, { useState } from "react"

const Context = React.createContext({})

export function StationContextProvider({ children }) {
    const [stations, setStations] = useState([])

    return <Context.Provider> {children} </Context.Provider>
}

export default Context