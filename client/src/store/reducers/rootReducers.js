import {combineReducers} from "redux";
import smsReducer from "./sms";

export default combineReducers({
  sms: smsReducer
})
