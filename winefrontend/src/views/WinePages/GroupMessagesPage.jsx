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

class GroupMessagesPage extends React.Component {
  static contextType = WineContext;
  state = {
    messages: [],
    name: "Group Name",
    refreshInterval: null,
  };
  componentDidMount() {
    document.body.classList.toggle("group-messages");
    this.getMessages();
    // this.sendMessage(this.context.username);
    // let self = this
    // let interval = setInterval(self.getMessages, 2000);
    // this.setState({refreshInterval: interval});
  }
  componentWillUnmount() {
    document.body.classList.toggle("group-messages");
    clearInterval(this.state.refreshInterval);
  }

  getMessages = () =>{
    // var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/message/` + this.context.group.mongoId;
    var url = `http://127.0.0.1:8000/api/message/` + this.context.group.mongoId;
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
          console.log(e)
          if (e != null && e.length > 0){
            let groupMessageObj = e[0]
            this.setState({name: groupMessageObj.name})
            this.setState({ messages: groupMessageObj.messages });
          }
        })  
  }


  sendMessage = (text) => {
    // var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/message/` + this.context.group.mongoId;
    var url = `http://127.0.0.1:8000/api/message/` + this.context.group.mongoId;
    var formData  = new FormData();
    formData.append("author",this.context.username)
    formData.append("text",text)
    fetch(url,
      {
          method: "POST",
          body: formData,
          headers: {
            'X-CSRFToken': csrftoken
          },
      }).then( (e) => {
          console.log(e);
      })
  }


  render() {

    var messages = this.state.messages.map(m =>
      <tr key = {m.sent_at} align='center'>
          <td width="33%">{m.author}</td>
          <td width="33%">{m.text}</td>
          <td width="33%">{m.sent_at}</td>
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
                    <th width="33%"> Author</th>
                    <th width="33%"> Text</th>
                    <th width="33%"> Sent At</th>
                </tr>
                {messages}
              </table>
              </Container>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GroupMessagesPage;
