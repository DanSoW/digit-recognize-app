import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import { CanvasProvider } from "./context/CanvasContext/CanvasContext";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CanvasProvider>
        <App />
      </CanvasProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
