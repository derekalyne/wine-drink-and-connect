import React from "react";
import classnames from "classnames";
import WineContext from "../Context/wine-context"
import { Link } from "react-router-dom";


// reactstrap components
import {
  Button,
  Container,
  NavLink,
  Row,
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "./ExamplesNavbar";

function getCookie(name) {
  if (!document.cookie) {
    return null;
  }
  const token = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

  if (token.length === 0) {
    return null;
  }
  return decodeURIComponent(token[0].split('=')[1]);
}

const csrftoken = getCookie('csrftoken')

class GroupSelectPage extends React.Component {
  static contextType = WineContext;
  state = {
    groups: []
  };
  componentDidMount() {
    document.body.classList.toggle("group-selection");
    this.getGroups();
  }
  componentWillUnmount() {
    document.body.classList.toggle("group-selection");
  }


  getGroups = () =>{
    // var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/group/` + this.context.username;
    var url = `http://127.0.0.1:8000/api/group/` + this.context.username;
    fetch(url,
        {
            method: "GET",
            headers: {
              'X-CSRFToken': csrftoken
            },
        }).then( (e) => {
          console.log(e);
          return e.json()
        })
        .catch( (e) => { return console.error("Error:", e) })
        .then( e => {
          this.setState({ groups: e.data });
        })  
  }


  createGroup = (name, otherMembers) => {
    // var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/group`;
    var url = `http://127.0.0.1:8000/api/group`;
    var self = this;
    if (otherMembers === null) otherMembers = [];
    otherMembers.push(this.context.username);
    let data = {
      "name": name,
      "members": otherMembers
    }
    fetch(url,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'X-CSRFToken': csrftoken,
          'Content-Type': 'application/json'
        },
      }).then( (e) => {
        console.log(e);
        return e.json()
      })
      .catch( (e) => { return console.error("Error:", e) })
      .then( e => {
        console.log(e);
        // self.context.updateGroup(e);
        // TODO: go to group message page
      }) 
  }


  addMember = (gid, member) => {
    // var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/group/{gid}/members`;
    var url = `http://127.0.0.1:8000/api/group/` + gid + `/members`;
    var formData  = new FormData();
    let self = this;
    formData.append("username", this.context.username);
    fetch(url,
      {
          method: "POST",
          body: formData,
          headers: {
            'X-CSRFToken': csrftoken
          },
      }).then( (e) => {
        console.log(e);
        return e.json()
      })
      .catch( (e) => { return console.error("Error:", e) })
      .then( e => {
        console.log(e);
        self.getGroups();
      }) 
  }


  testFunction = () => {
    this.createGroup("Test Group", ["ItMe"])
    // this.addMember(5, ["Test123", "Test234"]);
  }


  render() {

    var groups = this.state.groups.map(g =>
      <tr key = {g.gid} align='center'>
          <NavLink tag={Link} to="group-messages">
          <td width="50%" onClick={()=>this.context.updateGroup(g)}>{g.name}</td>
          </NavLink>
          <td width="50%">{g.mongoId}</td>
      </tr>
    );

    return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
              <table   align='center' >
                <tr align='center'>
                    <th width="50%"> Name</th>
                    <th width="50%"> MongoId</th>
                </tr>
                {groups}
              </table>
              <Button onClick={this.testFunction}>Test Button</Button>
              </Container>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GroupSelectPage;
