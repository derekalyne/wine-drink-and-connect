import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/css/blk-design-system-react.css";
import "assets/demo/demo.css";

import WineContext from "./views/Context/wine-context"
import RegisterPage from "views/WinePages/RegisterPage.jsx";
import ProfilePage from "views/WinePages/ProfilePage.jsx";
import WineTables from "views/WinePages/WineTables.jsx";
import WineDetails from "views/WinePages/WineDetails.jsx";
import BasicMap from "views/WinePages/HeatMap.jsx";
import GroupSelectPage from "views/WinePages/GroupSelectPage.jsx";
import GroupMessagesPage from "views/WinePages/GroupMessagesPage.jsx";

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        wid:'',
        username:'remytherat',
        group:{}
      };   
    }

updateWid = id =>{
    this.setState({wid:id});
}

updateUsername = (UN) =>{
    this.setState({
        username:UN,
    })}

updateGroup = (g) => {
    this.setState({
        group:g
    })
}

render(){
     return(
        <WineContext.Provider value = {{
            wid:this.state.wid,
            username:this.state.username,
            name:this.state.name,
            group:this.state.group,
            updateWid:this.updateWid,
            updateUsername:this.updateUsername,
            updateGroup:this.updateGroup,
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
                 <Route
                        path="/welcome/wine-detail"
                        render={props => <WineDetails {...props} />}
                /> 
                  <Route
                        path="/welcome/map"
                        render={props => <BasicMap {...props} />}
                /> 
                 <Route
                        path="/welcome/group-select"
                        render={props => <GroupSelectPage {...props} />}
                /> 
                <Route
                        path="/welcome/group-messages"
                        render={props => <GroupMessagesPage {...props} />}
                /> 
                <Redirect to="/welcome/register-page"/>
                </Switch>
            </BrowserRouter>
        </WineContext.Provider>
     );
}
}

export default App;
