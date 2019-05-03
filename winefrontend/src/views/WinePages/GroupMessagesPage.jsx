import React from "react";
import classnames from "classnames";
import WineContext from "../Context/wine-context"
import { Link } from "react-router-dom";
import { ChatFeed, Message } from 'react-chat-ui'
import ExamplesNavbar from "./ExamplesNavbar";
// reactstrap components
import {
  Button,
  Container,
  NavLink,
  Row,
  Col,
} from "reactstrap";


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

const csrftoken = getCookie('csrftoken');

class GroupMessagesPage extends React.Component {




    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  static contextType = WineContext;
    state = {
        messages: [
            new Message({
                id: 1,
                message: "Feel free to start a conversation!",
            }), // Gray bubble
            new Message({
                id: 0,
                message: "If you have any questions, ask the Wine! Team!"}), // Blue bubble
        ],
    };
  componentDidMount() {
    document.body.classList.toggle("group-messages");
    this.getMessages();
    // this.sendMessage(this.context.username);
    let self = this
    let interval = setInterval(self.getMessages, 2000);
    this.setState({refreshInterval: interval});
  }
  componentWillUnmount() {
    document.body.classList.toggle("group-messages");
    clearInterval(this.state.refreshInterval);
  }

  getMessages = () =>{
    var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/message/` + this.context.group.mongoId;
    // var url = `http://127.0.0.1:8000/api/message/` + this.context.group.mongoId;
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
          console.log(e);
          if (e != null && e.length > 0){
              var test_messages  = [];
              var counter = 0;
              let groupMessageObj = e[0];
              for(var i=0; i<groupMessageObj.messages.length; i++){
                  let messageObj = new Message({
                              id: counter,
                              message: groupMessageObj.messages[i].text,
                              senderName: this.context.username
                          });
                  counter += 1;
                  test_messages.push(messageObj)
              }
              this.setState({name: groupMessageObj.name});
              this.setState({ messages: test_messages });
          }
        })
  };


  sendMessage = (text) => {
    var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/message/` + this.context.group.mongoId;
    // var url = `http://127.0.0.1:8000/api/message/` + this.context.group.mongoId;
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
  };

  handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      console.log(data.get('messageBoxInput'))
      this.sendMessage(data.get('messageBoxInput'))
  }

  render() {


      return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">

                  <Container style={{width: '60%', height: '50%'}}>

                      <ChatFeed
                          style={{height: '50%'}}
                          messages={this.state.messages} // Boolean: list of message objects
                          //isTyping={this.state.is_typing} // Boolean: is the recipient typing
                          hasInputField={false} // Boolean: use our input, or use your own
                          showSenderName // show the name of the user who sent the message
                          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                          bubbleStyles={
                              {
                                  text: {
                                      fontSize: 15
                                  },
                                  chatbubble: {
                                      borderRadius: 30,
                                      padding: 15
                                  }
                              }

                          }

                      />
                      <form className="form-group" onSubmit={this.handleSubmit}>
                          <input type="text" name="messageBoxInput" id="newMessage" placeholder="Type your message here:" className="form-control" />
                          <Button>Submit</Button>
                      </form>
                  </Container>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GroupMessagesPage;