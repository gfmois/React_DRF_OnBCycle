import React, { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import JWTService from "../services/JWTService";

const Context = React.createContext({});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [jwt, setJwt] = useState(JWTService.getToken())
  const [refreshJwt, setRefreshJwt] = useState(JWTService.getRefreshToken())

  useEffect(() => {
    const load = async () => {
      await getUser()
    }

    load()
  }, [])

  const getUser = async () => {
    await AuthService.getUser()
      .then(({ data }) => {
        setUser(data)
        setIsAdmin(data.role == 'Admin' || false)
      })
      .catch((e) => {
        JWTService.removeToken()
        JWTService.removeRefreshToken()
        setUser(null)
        setIsAdmin(false)
      })
  }

  return (
    <Context.Provider value={{ user, setUser, isAdmin, setIsAdmin, jwt, setJwt, refreshJwt, setRefreshJwt, getUser }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
