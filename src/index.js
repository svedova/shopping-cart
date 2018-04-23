import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import registerServiceWorker from "./registerServiceWorker";
import { LocalStorage } from "@svedova/storage";
import routes from "./routes";
import "./config/firebase";
import "./styles.js";
import createStore from "./redux/store";

const store = createStore(LocalStorage.get("cart", {}));
const basename = process.env.NODE_ENV === "production" ? "/shopping-cart/" : "";

ReactDOM.render(
  <App routes={routes} store={store} basename={basename}/>,
  document.getElementById("root")
);

registerServiceWorker();
