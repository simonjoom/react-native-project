import "./babelhelpers.js";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./src/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
//AppRegistry.registerComponent('pipedrive', () => App);

registerServiceWorker();
