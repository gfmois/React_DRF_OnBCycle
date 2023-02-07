import React, { useEffect, useState } from "react";
import JWTService from "../services/JWTService";

const Context = React.createContext({});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [jwt, setJwt] = useState(JWTService.getToken())
  const [refreshJwt, setRefreshJwt] = useState(JWTService.getRefreshToken())

  return (
    <Context.Provider value={{ user, setUser, isAdmin, setIsAdmin, jwt, setJwt, refreshJwt, setRefreshJwt }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
