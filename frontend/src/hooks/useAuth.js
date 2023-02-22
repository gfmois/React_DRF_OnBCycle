import { useCallback, useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import AuthService from "../services/AuthService";
import JWTService from "../services/JWTService";
import { useToast } from "./useToaster";
import { useNotifications } from "./useNotifications"

export function useAuth() {
  const { loadToast, toast } = useToast()
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([])
  const { clearNotifications } = useNotifications()
  const {
    user,
    setUser,
    isAdmin,
    setIsAdmin,
    jwt,
    setJwt,
    refreshJwt,
    setRefreshJwt,
  } = useContext(AuthContext);

  const getUsers = useCallback(() => {
    AuthService.getUsers()
      .then(({ data }) => {
        setUsersList(data)
      })
  }, [usersList, setUsersList])

  const register = useCallback(
    (credentials) => {
      AuthService.register(credentials).then(({ data }) => {
        setUser({
          avatar: data.user.avatar,
          name: data.user.name,
          role: data.user.role,
          email: data.user.email
        })
        JWTService.saveToken(data.token);
        JWTService.saveRefreshToken(data.refresh_token);
        setJwt(data.token);
        setRefreshJwt(data.refresh_token);
        loadToast(`${data.user.name} your account has been created.`, 'success')
        navigate("/stations");
      }).catch((e) => {
        loadToast(`${e.response.data[0]}`, 'error')
      })
    },
    [setJwt, navigate]
  );

  const login = useCallback(
    (credentials) => {
      AuthService.login(credentials)
        .then(({ data }) => {
          if (!data.msg && !data.status) {
            setUser({
              avatar: data.avatar,
              name: data.name,
              role: data.role,
              email: data.email
            })
            JWTService.saveToken(data.token);
            JWTService.saveRefreshToken(data.refresh_token)
            setJwt(data.token);
            setIsAdmin(data.role == 'Admin')
            setRefreshJwt(data.refresh_token)
            loadToast(`Welcome back ${data.name}`, 'success')
            navigate("/stations");
          }
          else {
            loadToast(data.msg, 'error')
          }

        })
        .catch((e) => {
          loadToast(e, 'error')
        });
    },
    [setJwt, navigate]
  );

  const logout = useCallback(() => {
    clearNotifications()
    JWTService.removeRefreshToken()
    JWTService.removeToken()
    setJwt(null)
    setRefreshJwt(null)
    loadToast('Session Closed', 'warning')
    navigate("/");
    setUser(null)
  })

  return {
    user,
    setUser,
    login,
    isAdmin,
    setIsAdmin,
    jwt,
    setJwt,
    register,
    logout,
    getUsers,
    usersList,
    setUsersList
  };
}
