import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import { Modal } from "./Utils";
import App from "./App";

render(
    <Provider store={store} > 
        <div>
            <App/>
            <Modal/>
        </div>
    </Provider>,
    document.getElementById("root")
);
