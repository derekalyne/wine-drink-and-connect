import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/css/blk-design-system-react.css";
import "assets/demo/demo.css";

import Index from "views/Index.jsx";
import LandingPage from "views/examples/LandingPage.jsx";
import RegisterPage from "views/examples/RegisterPage.jsx";
import ProfilePage from "views/examples/ProfilePage.jsx";
import Tables from "views/IndexSections/Tables.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
            path="/tables"
            render={props => <Tables {...props} />}
        /> 
      <Route
        path="/register-page"
        render={props => <RegisterPage {...props} />}
      />
    
      <Redirect from="/" to="/tables" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
