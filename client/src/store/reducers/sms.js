import {
  FETCH_COUNT_ERROR,
  FETCH_COUNT_SMS_START,
  FETCH_COUNT_SMS_SUCCESS,
  CREATE_SMS_START,
  CREATE_SMS_SUCCESS, CREATE_SMS_ERROR
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  loadingButton: false,
  countSms: 0,
  error: null
};

export default function smsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNT_SMS_START:
    case FETCH_COUNT_SMS_SUCCESS:
    case FETCH_COUNT_ERROR:
    case CREATE_SMS_START:
    case CREATE_SMS_SUCCESS:
    case CREATE_SMS_ERROR:
      return {
        ...state, ...action.newObject
      };
    default:
      return state
  }
}
