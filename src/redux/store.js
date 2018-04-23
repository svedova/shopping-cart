/* global require */
import { createStore, applyMiddleware, compose } from "redux";
import { LocalStorage } from "@svedova/storage";
import thunk from "redux-thunk";
import reducers from "./reducers";
import globals from "@/config/globals";
import DevTools from "@/components/DevTools";

const persistState = store => next => action => {
  next(action);
  LocalStorage.set("cart", store.getState());
};

let middlewares = applyMiddleware(persistState, thunk);

if (globals.isDev && typeof window !== "undefined") {
  middlewares = compose(middlewares, DevTools.instrument());
}

export default defaultState => {
  const store = createStore(reducers, defaultState, middlewares);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept("./reducers", () =>
      store.replaceReducer(require("./reducers"))
    );
  }

  return store;
};
