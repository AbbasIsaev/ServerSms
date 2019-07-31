import axios from "../../axios/axios-sms";
import {toast} from "react-toastify";
import {Enam} from "../../utils/Enam";
import {
  CREATE_SMS_ERROR,
  CREATE_SMS_START,
  CREATE_SMS_SUCCESS,
  FETCH_COUNT_ERROR,
  FETCH_COUNT_SMS_START,
  FETCH_COUNT_SMS_SUCCESS
} from "./actionTypes";

export function fetchCountSms() {
  return dispatch => {
    dispatch(stateChange(FETCH_COUNT_SMS_START, {loading: true}));
    axios.get("/api/sms/getNotSentToDate")
      .then(response => {
        const countSms = response.data.length;

        dispatch(stateChange(FETCH_COUNT_SMS_SUCCESS, {loading: false, countSms}))
      })
      .catch(error => {
        toast.error(Enam.Error(error));
        dispatch(stateChange(FETCH_COUNT_ERROR, {loading: false, error}));
      })
  }
}

export function createSms(newSms) {
  return async dispatch => {
    dispatch(stateChange(CREATE_SMS_START, {loadingButton: true}));
    try {
      await axios.post("/api/sms", newSms);

      toast.success(Enam.SAVE);
      dispatch(stateChange(CREATE_SMS_SUCCESS, {loadingButton: false}));
      dispatch(fetchCountSms());
    } catch (error) {
      toast.error(Enam.Error(error));
      dispatch(stateChange(CREATE_SMS_ERROR, {loadingButton: false, error}));
    }
  }
}

function stateChange(type, newObject) {
  return {
    type,
    newObject
  }
}
