import { useCallback, useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import AuthService from "../services/AuthService";
import JWTService from "../services/JWTService";
import { useToast } from "./useToaster";

export function useAuth() {
  const { loadToast, toast } = useToast()
  const navigate = useNavigate();
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
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type == "UPDATE_STATE") {
        return {
          error: action.error,
          loading: action.loading,
        };
      }

      return state;
    },
    { errror: false, loading: false }
  );

  const register = useCallback(
    (credentials) => {
      AuthService.register(credentials).then(({ data }) => {
        JWTService.saveToken(data.token);
        JWTService.saveRefreshToken(data.refresh_token);
        setJwt(data.token);
        setRefreshJwt(data.refresh_token);
        loadToast(`${data.user.name} your account has been created.`, 'success')
        navigate("/");
      }).catch((e) => {
        loadToast(`${e.response.data[0]}`, 'error')
      })
    },
    [setJwt, navigate]
  );

  const login = useCallback(
    (credentials) => {
      // dispatch({ type: 'UPDATE_STATE', error: false, loading: true })
      AuthService.login(credentials)
        .then(({ data }) => {
          JWTService.saveToken(data.token);
          setJwt(data.token);
          dispatch({ type: "UPDATE_STATE", error: false, loading: false });
          navigate("/");
        })
        .catch((e) => {
          dispatch({ type: "UPDATE_STATE", error: true, loading: false });
        });
    },
    [setJwt, navigate]
  );

  const logout = useCallback(() => {
    JWTService.removeRefreshToken()
    JWTService.removeToken()
    setJwt(null)
    setRefreshJwt(null)
    navigate('/')
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
    state,
    register,
    logout
  };
}
