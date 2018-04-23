import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import createStore from "@/redux/store";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App routes={[]} store={createStore()} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
