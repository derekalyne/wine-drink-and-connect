import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/css/blk-design-system-react.css";
import "assets/demo/demo.css";

import WineContext from "./views/Context/wine-context"
import RegisterPage from "views/WinePages/RegisterPage.jsx";
import ProfilePage from "views/WinePages/ProfilePage.jsx";
import WineTables from "views/WinePages/WineTables.jsx";

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        wid:'',
        username:'Not Logged in',
      };   
    }

updateWid = id =>{
    this.setState({wid:id});
}

updateUsername = (UN) =>{
    console.log("hahahaha")
    this.setState({
        username:UN,
    })}

render(){
     return(
        <WineContext.Provider value = {{
            wid:this.state.wid,
            username:this.state.username,
            name:this.state.name,
            updateWid:this.updateWid,
            updateUsername:this.updateUsername
        }}>
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
                        render={props => <WineTables {...props} />}
                /> 
                <Redirect to="/welcome/register-page"/>
                </Switch>
            </BrowserRouter>
        </WineContext.Provider>
     );
}
}

export default App;
