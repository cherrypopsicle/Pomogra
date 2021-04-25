// react imports
import React from "react";
import { Route, Switch } from "react-router";

import Form from "./components/Form";
import Home from "./components/Home";
require("aframe-ui-widgets");

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/form" component={Form}/>
    </Switch>
  );
};

export default App;
