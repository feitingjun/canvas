
import React from "react";
import { Router, Route, Switch,Redirect } from "dva/router";
import Login from "./views/Login";
import Home from "./views/Home";
import Canvas from "./views/Canvas";
import Galaxy from "./views/Galaxy";
import Grass from "./views/Grass";
import Meteor from "./views/Meteor";
import Wave from "./views/Wave";
import WangEditor from "./views/WangEditor";
import ReactQuill from "./views/ReactQuill";
function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/canvas" component={Canvas} />
            <Route path="/wangEditor" component={WangEditor} />
            <Route path="/reactQuill" component={ReactQuill} />
            <Redirect to="/home" />
        </Switch>
    </Router>
  );
}

export default RouterConfig;