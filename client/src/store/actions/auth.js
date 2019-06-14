import {toast} from "react-toastify";
import {AUTH_AUTO_LOGIN, AUTH_LOADING, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT} from "./actionTypes";
import axios from "../../axios/axios-sms";
import {Enam} from "../../utils/Enam";

export function setLoadingButton(strategy, flag) {
  return dispatch => {
    if (strategy === 'google') {
      dispatch(stateChange(AUTH_LOADING, {loadingButton: flag}));
    }
  }
}

export function setUser(user) {
  return dispatch => {
    dispatch(stateChange(AUTH_LOGIN_SUCCESS, {user}));
  }
}

export function logout() {
  return dispatch => {
    axios.get("/auth/logout")
      .then(response => {
        dispatch(stateChange(AUTH_LOGOUT, {user: null}));
      })
      .catch(error => {
        toast.error(Enam.Error(error));
      })
  }
}

export function autoLogin() {
  return dispatch => {
    dispatch(stateChange(AUTH_AUTO_LOGIN, {}));
  }
}

function stateChange(type, newObject) {
  return {
    type,
    newObject
  }
}
