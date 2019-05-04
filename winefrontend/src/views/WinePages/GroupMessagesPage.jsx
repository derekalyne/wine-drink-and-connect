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
    Col, FormGroup, Label, Input, Form,
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
        this.handlewinesubmit = this.handlewinesubmit.bind(this);
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
        tableData: {data:[]},
        winesel:"",
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
                  let side = groupMessageObj.messages[i].author === this.context.username ? 0 : 1;
                  let messageObj = new Message({
                      id: side,
                      message: groupMessageObj.messages[i].text,
                      senderName: groupMessageObj.messages[i].author
                  });
                  test_messages.push(messageObj)
              }
              this.setState({name: groupMessageObj.name});
              this.setState({ messages: test_messages });
          }
        })
  };

    fetch10Wines = () => {

        var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/wines/?page=&winery&year_gt=&year_lt&variety&price_gt&price_lt&designation&name=${this.state.winesel}&page=1`;
        fetch(url,
            {
                method: "GET",
            }).then( (e) => {
            console.log(e);
            return e.json()
        })
            .catch( (e) => { return console.error("Error:", e) })
            .then(e => {
                this.setState({ tableData: e });
                return console.log("Success:", e)
            });
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
    handlewinesubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get('messageBoxInput'))
        this.sendMessage(data.get('messageBoxInput'))
    }

  render() {


      var wines = this.state.tableData.data.map(o =>
          <tr key = {o.wid} align='center'>
              {/*<NavLink tag={Link} to="wine-detail">*/}
                  {/*<td width="25%" onClick={()=>this.context.updateWid(o.wid)} >{o.name}</td>*/}
              {/*</NavLink>*/}
              <td width="25%">{o.winery}</td>
              <td>{o.country}</td>
              <td width="10%">{o.year}</td>
              <td width="10%">{o.price}</td>
              <img height='125px' src={`http://${o.image1}`}/>
          </tr>
      );

      return (
      <>

        <ExamplesNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content" style={{height: "100%"}}>
                    <Row>
                        <Col>
                  <Container style={{width: '60%', height: '50%'}}>

                      <ChatFeed
                          style={{height: '50%'}}
                          messages={this.state.messages}
                          hasInputField={false}
                          showSenderName
                          bubblesCentered={false}
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
                          maxHeight={350}

                      />
                      <form className="form-group" onSubmit={this.handleSubmit}>
                          <input type="text" name="messageBoxInput" id="newMessage" placeholder="Type your message here:" className="form-control" />
                          <Button>Submit</Button>
                      </form>
                  </Container>
                        </Col>
                        <Col>
                            <p>Wine Selection</p>
                    <Row>

                        <Col>

                    <Form className='form'>
                        <FormGroup controlId='wineQuery'>
                            {/*<Label>Wine selection:</Label>*/}
                            <Input defaultValue=""
                                   placeholder="Pinot Noir"
                                   style={{maxWidth: '150%', height: 45, width: 380}}
                                   type="text"
                                   align='center'
                                   name='winesel'
                                   value={this.state.winesel}
                                   onChange={e => this.setState({winesel: e.target.value})} />
                        </FormGroup>
                    </Form>
                        </Col>
                        <Col>
                    <Button type='button' onClick={ () => this.fetch10Wines()}>Submit</Button>
                        </Col>
                    </Row>


                  <table align='center' maxHeight={350}>
                      <tr align='center'>
                          <th width="25%"> Name</th>
                          <th width="25%"> Country</th>
                          <th width="10%"> Year</th>
                          <th width="10%"> Price</th>
                          <th width="100%">Image</th>
                      </tr>
                      {wines}
                  </table>

          </Col>
         </Row>
      </div>
    </div>
   </div>
 </>
    );
  }
}

export default GroupMessagesPage;