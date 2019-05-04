import React from "react";
import classnames from "classnames";
import WineContext from "../Context/wine-context"
import { Link } from "react-router-dom";
import  winepic  from 'assets/img/wine4.jpg';

// reactstrap components
import {
    Button,
    Container,
    NavLink,
    Row,
    Col, FormGroup, Label, Input, Form
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
    var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/group/` + this.context.username;
    // var url = `http://127.0.0.1:8000/api/group/` + this.context.username;
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


  createGroup = (name, number) => {
    var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/group/random`;
    // var url = `http://127.0.0.1:8000/api/group`;
    var self = this;
    if (number === null) number = [];
    var username = this.context.username;
    let data = {
      "name": name,
      "number": number,
        "username":username,
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
        //
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
    this.createGroup("new_group", 4);

  }


  render() {

    var groups = this.state.groups.map(g =>
      <tr align='center'>
          <td> < img src={winepic} width = "25%" /></td>
          <NavLink tag={Link} to="group-messages">
          <td>{g.name}</td>
          </NavLink>
          <td>{g.members}</td>
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
              <table align='center' >
                <tr align='center'>
                    <th width="25%">Image</th>
                    <th>Name</th>
                    <th>Members</th>
                </tr>
                {groups}
              </table>
              </Container>
                <Container>
                    <FormGroup controlId='wineName'>
                        <Label>Group name:</Label>
                        <Input defaultValue=""
                               placeholder="group"
                               type="text"
                               name='name'
                               value={this.state.name}
                               onChange={e => this.setState({name1: e.target.name})} />
                    </FormGroup>
                    <Button onClick={this.testFunction}>create group</Button>
                    <FormGroup controlId='wineMembers'>
                        <Label>amount of members: </Label>
                        <Input defaultValue=""
                               placeholder="member1, member2, ..."
                               type="text"
                               name='members'
                               value={this.state.members}
                               onChange={e => this.setState({members1: e.target.members})} />
                    </FormGroup>
                </Container>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GroupSelectPage;
