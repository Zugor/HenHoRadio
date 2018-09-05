import { combineReducers } from "redux";
import { loadingBarReducer } from 'react-redux-loading-bar'
import { alert } from "./alert.reducer";
import { modal } from "./modal.reducer";
import { users } from "./users.reducer";

const rootReducer=combineReducers({
    alert,
    modal,
    users,
    loadingBar: loadingBarReducer,
});
export default rootReducer;