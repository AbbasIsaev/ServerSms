import {combineReducers} from "redux";
import smsReducer from "./sms";
import authReducer from "./auth";

export default combineReducers({
  sms: smsReducer,
  auth: authReducer
})
