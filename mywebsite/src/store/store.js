import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers/index";
import { loadingBarMiddleware } from 'react-redux-loading-bar'

const loggerMiddleware=createLogger();
const store=createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loadingBarMiddleware({
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
        }),
        loggerMiddleware
    )
);

export default store;

