import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";

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

const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States"
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States"
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States"
  }
];

let ps = null;

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: 1,
      userinfo:{
        name:'',
        age:'',
        gender:''
      },
      name:'',
      password:'',
      gender:'',
      age:''
    };
  }

  UpdateUserInfo = () =>{
    var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/drinkers/ZoeVaughan`;
    var formData  = new FormData();
    formData.append("username","ZoeVaughan")
    formData.append("name",this.state.name)
    formData.append("password",this.state.password)
    formData.append("gender",this.state.gender)
    formData.append("password",this.state.password)
    formData.append("age",this.state.age)
    fetch(url,
        {
            method: "PUT",
            body: formData,
            headers: {
              'X-CSRFToken': csrftoken
            },
        }).then( (e) => {
            console.log(e);
            return e.json()
        })
        .catch( (e) => { return console.error("Error:", e) })
        .then(e => {
            this.setState({ message: "Success! You can now update your personal info!" });
            this.GetUserInfo();
            return console.log("Success:", e)
        });
      
  }

  GetUserInfo = () =>{
    var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/drinkers/ZoeVaughan`;
  
    fetch(url,
        {
            method: "GET"
        }).then( (e) => {
            console.log(e);
            return e.json()
        })
        .catch( (e) => { return console.error("Error:", e) })
        .then(e => {
            this.setState({ userinfo: e });
            return console.log("Success:", e)
        });
  }



  componentDidMount() {
    this.GetUserInfo()
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    document.body.classList.toggle("profile-page");
  }
  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };
  render() {
    return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="dots"
              src={require("assets/img/dots.png")}
            />
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png")}
            />
            <Container className="align-items-center">
              <Row>
                <Col lg="6" md="6">
                  <h1 className="profile-title text-left" style={{fontSize:"150px"}}>{this.state.userinfo.name}</h1>
                  <h5 className="text-on-back">01</h5>
                 
                </Col>
                <Col className="ml-auto mr-auto" lg="4" md="6">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid rounded-circle"
                        src={require("assets/img/wine3.jpg")}
                      />
                      <h4 className="title">Personal Profile</h4>
                    </CardHeader>
                    <CardBody>
                      <Nav
                        className="nav-tabs-primary justify-content-center"
                        tabs
                      >
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.tabs === 1
                            })}
                            onClick={e => this.toggleTabs(e, "tabs", 1)}
                            href="#pablo"
                          >
                            Basic Info
                          </NavLink>
                        </NavItem>
                       
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.tabs === 3
                            })}
                            onClick={e => this.toggleTabs(e, "tabs", 3)}
                            href="#pablo"
                          >
                            Favorite Wine
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent
                        className="tab-subcategories"
                        activeTab={"tab" + this.state.tabs}
                      >
                        <TabPane tabId="tab1">
                          <Table className="tablesorter" responsive>
                           
                            <tbody>
                              <tr>
                                <td>Name</td>
                                <td>{this.state.userinfo.name}</td>
                              </tr>
                              <tr>
                                <td>Age</td>
                                <td>{this.state.userinfo.age}</td>
                              </tr>
                              <tr>
                                <td>Gender</td>
                                <td>{this.state.userinfo.gender}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </TabPane>
                       
                        <TabPane tabId="tab3">
                          <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                              <tr>
                                <th className="header">Your favorite wine collections</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Point Noir</td>
                              </tr>
                              <tr>
                                <td>Rose</td>
                              </tr>
                              <tr>
                                <td>Cola</td>
                              </tr>
                            </tbody>
                          </Table>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="section">
            <Container>
              <Row className="justify-content-between">
                <Col md="6">
                  <Row className="justify-content-between align-items-center">
                    <UncontrolledCarousel items={carouselItems} />
                  </Row>
                </Col>
                <Col md="5">
                  <h1 className="profile-title text-left">Placeholder for user's favorite wine review</h1>
                  <h5 className="text-on-back">02</h5>
                  <p className="profile-description text-left">
                    This wine is so good I want to cry. Shut up and buy me some more.
                  </p>
                 
                </Col>
              </Row>
            </Container>
          </div>
          <section className="section">
            <Container>
              <Row>
                <Col md="6">
                  <Card className="card-plain">
                    <CardHeader>
                      <h1 className="profile-title text-left">Update your Info</h1>
                      <h5 className="text-on-back">03</h5>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>Your Name</label>
                              <Input  value={this.state.name}
                                           onChange={e => this.setState({name: e.target.value})} />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Password</label>
                              <Input
                                type="password"
                                value={this.state.password}
                                           onChange={e => this.setState({password: e.target.value})}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>Age</label>
                              <Input value={this.state.age}
                                           onChange={e => this.setState({age: e.target.value})} />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Gender</label>
                              <Input value={this.state.gender}
                                           onChange={e => this.setState({gender: e.target.value})} />
                            </FormGroup>
                          </Col>
                        </Row>
                      
                        <Button
                          className="btn-round float-right"
                          color="primary"
                          data-placement="right"
                          id="tooltip341148792"
                          type="button"
                          onClick = {this.UpdateUserInfo}
                        >
                          Update
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          placement="right"
                          target="tooltip341148792"
                        >
                          Click to update your info!
                        </UncontrolledTooltip>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                
              </Row>
            </Container>
          </section>
          
        </div>
      </>
    );
  }
}

export default ProfilePage;
