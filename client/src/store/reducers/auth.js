import {AUTH_LOGOUT, AUTH_LOADING, AUTH_LOGIN_SUCCESS, AUTH_AUTO_LOGIN, AUTH_ERROR} from "../actions/actionTypes";

const initialState = {
  token: null,
  loadingButton: false,
  user: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
    case AUTH_LOGIN_SUCCESS:
    case AUTH_LOGOUT:
    case AUTH_AUTO_LOGIN:
    case AUTH_ERROR:
      return {
        ...state, ...action.newObject
      };
    default:
      return state
  }
}
