import {AUTH_ERROR, AUTH_LOADING, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT} from "./actionTypes";
import axios from "../../axios/axios-sms";
import {toast} from "react-toastify";
import {Enam} from "../../utils/Enam";

export const TOKEN_KEY = 'token';

function setHeaderAuthorization(token) {
  axios.defaults.headers.common['Authorization'] = token; // for all requests
}

export function setLoadingButton(strategy, flag) {
  return dispatch => {
    if (strategy === 'google') {
      dispatch(stateChange(AUTH_LOADING, {loadingButton: flag}));
    }
  }
}

export function setUserAndToken(user, token) {
  return dispatch => {
    setHeaderAuthorization(token);

    // Просматривать логи в пределах своего id
    user.room = user.id;
    dispatch(stateChange(AUTH_LOGIN_SUCCESS, {user, token, loadingButton: false}));
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem(TOKEN_KEY);
    delete axios.defaults.headers.common["Authorization"];
    dispatch(stateChange(AUTH_LOGOUT, {user: null, token: null}));
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      dispatch(stateChange(AUTH_LOADING, {loadingButton: true}));
      setHeaderAuthorization(token);

      axios.get("/api/profile")
        .then(response => {
          const {user} = response.data;
          if (token && user) {
            dispatch(setUserAndToken(user, token));
          }
        })
        .catch(error => {
          if (error && error.response && error.response.status === 401) {
            dispatch(logout());
            window.location.href = '/';
          } else {
            toast.error(Enam.Error(error));
            dispatch(stateChange(AUTH_ERROR, {loadingButton: false, error}));
          }
        })
    }
  }
}

function stateChange(type, newObject) {
  return {
    type,
    newObject
  }
}
