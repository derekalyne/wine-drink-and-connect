import React from "react";
import classnames from "classnames";
import  winepic  from 'assets/img/wine4.jpg';
import WineContext from "../Context/wine-context"


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
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

class RegisterPage extends React.Component {
  static contextType = WineContext;
  state = {
    squares1to6: "",
    squares7and8: "",
    Password: "",
    Username: "",
    message:"",
  };
  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor
    );
  }


  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    });
  };


  login = () =>{
    var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/login/`;
    var formData  = new FormData();
    formData.append("username",this.state.Username)
    formData.append("password",this.state.Password)
    fetch(url,
        {
            method: "POST",
            body: formData,
            headers: {
              'X-CSRFToken': csrftoken
            },
        }).then( (e) => {
            console.log(e);
            if(e.status == 200){
              this.setState({ message: "Success! You are logged in! You can access your profile by clicking your name on the top right corner!" });
              this.context.updateUsername(this.state.Username);
              
            }
            else{
              this.setState({ message: "Your combination is not correct, please try again." });

            }
            return e.json()
        })
      
       
  }

  register = () =>{
    var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/drinkers/`;
    var formData  = new FormData();
    formData.append("username",this.state.Username)
    formData.append("password",this.state.Password)
    fetch(url,
        {
            method: "POST",
            body: formData,
            headers: {
              'X-CSRFToken': csrftoken
            },
        }).then( (e) => {
            console.log(e);
            if(e.status == 201){
              this.setState({ message: "Success! You can now update your personal info!" });
            }else{
              this.setState({ message: "Please try another Username. Thank you!" });
            }
            return e.json()
        })
      
  }


  render() {

    const buttonGroup = {
      justifyContent: 'space-around',
      display: 'flex'
    };

    return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h4">Wine!</CardTitle>
                      </CardHeader>
                      <p style = {{textAlign : "center"}}>{this.state.message}</p>
                      <CardBody>
                        <Form className="form">
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Username"
                              type="text"
                              onFocus={e =>
                                this.setState({ fullNameFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ fullNameFocus: false })
                              }
                              value={this.state.Username}
                              onChange={e => this.setState({Username: e.target.value})}
                            />
                          </InputGroup>
                          
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              onFocus={e =>
                                this.setState({ passwordFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ passwordFocus: false })
                              }
                              value={this.state.Password}
                              onChange={e => this.setState({Password: e.target.value})}
                            />
                          </InputGroup>
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <div style = {buttonGroup}>
                        <Button className="btn-round" color="primary" size="lg" onClick = {this.login}>
                          Log In
                        </Button>
                        <Button className="btn-round" color="primary" size="lg" onClick = {this.register}>
                          Register
                        </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                >
                <img src={winepic}/>
                </div>
               
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
               
                
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />
              </Container>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RegisterPage;
