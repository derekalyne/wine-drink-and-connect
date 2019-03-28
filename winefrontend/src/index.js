import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/css/blk-design-system-react.css";
import "assets/demo/demo.css";

import RegisterPage from "views/examples/RegisterPage.jsx";
import ProfilePage from "views/examples/ProfilePage.jsx";
import Tables from "views/IndexSections/Tables.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/welcome/register-page"
        render={props => <RegisterPage {...props} />}
      />
      <Route
        path="/welcome/profile-page"
        render={props => <ProfilePage {...props} />}
      />
      <Route
            path="/welcome/tables"
            render={props => <Tables {...props} />}
      /> 
    <Redirect to="/welcome/register-page"/>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
