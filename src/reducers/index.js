import { combineReducers } from "redux";

import reducer from "./userReducer";

export default combineReducers({
  user: reducer,
});
