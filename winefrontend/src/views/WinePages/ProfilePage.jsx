import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import WineContext from "../Context/wine-context"

import { VictoryPie, VictoryLabel, VictoryTooltip,VictoryChart,VictoryTheme,VictoryLine,VictoryLegend,VictoryScatter } from "victory"


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
  static contextType = WineContext;

  constructor(props) {
    super(props);
    this.state = {
      tabs: 1,
      userinfo: {
        name: '',
        age: '',
        gender: ''
      },
      name: '',
      password: '',
      gender: '',
      age: '',
      reviews: [],
      update_flg: false
    };
  }


  getReviews = () => {
    const url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/reviews/username/` + this.context.username + `?top=10`;
    fetch(url, { method: "GET", })
      .then((e) => {
        return e.json()
      }).catch((e) => {
        return console.error("Error:", e)
      }).then((e) => {
        let reviews = e.data;
        if (reviews == null) {
          throw "Error in getting reviews for this wine"
        }
        this.setState({ reviews: reviews });
        console.log("Success:", this.state.reviews);
      })
  };

  UpdateUserInfo = () => {
    var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/drinkers/${this.context.username}`;
    var formData = new FormData();
    formData.append("username", this.context.username)
    formData.append("name", this.state.name)
    formData.append("password", this.state.password)
    formData.append("gender", this.state.gender)
    formData.append("password", this.state.password)
    formData.append("age", this.state.age)
    fetch(url,
      {
        method: "PUT",
        body: formData,
        headers: {
          'X-CSRFToken': csrftoken
        },
      }).then((e) => {
        console.log(e);
        return e.json()
      })
      .catch((e) => { return console.error("Error:", e) })
      .then(e => {
        this.setState({ message: "Success! You can now update your personal info!" });
        this.GetUserInfo();
        return console.log("Success:", e)
      });

  }

  GetUserInfo = () => {
    var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/drinkers/${this.context.username}`;

    fetch(url,
      {
        method: "GET"
      }).then((e) => {
        console.log(e);
        return e.json()
      })
      .catch((e) => { return console.error("Error:", e) })
      .then(e => {
        this.setState({ userinfo: e });
        return console.log("Success:", e)
      });
  }


  updateReview = (index) => {
    var reviewObj = this.state.reviews[index]
    if (reviewObj == null || reviewObj.rating == null || reviewObj.description == null || reviewObj.rid == null) {
      console.log("ERROR!");
      return;
    }

    let formData = new FormData();
    formData.append("rating", reviewObj.rating);
    formData.append("description", reviewObj.description);
    formData.append("username", reviewObj.username);
    formData.append("wid", reviewObj.wid);
    formData.append("rid", reviewObj.rid);

    const url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/reviews/rid/` + reviewObj.rid;
    fetch(url, {
      method: "PUT",
      body: formData,
      headers: {
        'X-CSRFToken': csrftoken
      }
    })
      .then((e) => {
        if (e.status == 200) {
          console.log("Successfully updated review");
          this.getReviews();
        } else {
          console.log("Error in updating review");
        }
      })
  };

  deleteReview = (rid) => {
    if (rid == null) {
      console.log("ERROR!");
      return;
    }
    const url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/reviews/rid/` + rid;
    fetch(url, {
      method: "DELETE",
      headers: {
        'X-CSRFToken': csrftoken
      }
    })
      .then((e) => {
        if (e.status == 200) {
          console.log("Successfully deleted review");
          this.getReviews();
        } else {
          console.log("Error in deleting review");
        }
      })
  };

  componentDidMount() {
    this.GetUserInfo();
    this.getReviews()
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

    const { reviews } = this.state;

    var winerydata = reviews.map(x => {
      var data = { "x": x.winery || "Unknown", "y": reviews.filter(y => y.winery === x.winery).length / reviews.length }
      return data
    })

    var varietydata = reviews.map(x => {
      var data = { "x": x.variety || "Unknown", "y": reviews.filter(y => y.variety === x.variety).length / reviews.length }
      return data
    })

    var designationdata = reviews.map(x => {
      var data = { "x": x.designation || "Unknown", "y": reviews.filter(y => y.designation === x.designation).length / reviews.length }
      return data
    })


    var priceLineChart = (
      <svg width={1000} height={300} >
        <VictoryChart
          width={800} 
          standalone={false}
          scale={{ x: "time" }}
        >
          <VictoryLegend x={500} y={50}
            title="Price vs Age"
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
            data={[
              { name: "x : Age", symbol: { fill: "tomato", type: "star" } },
              { name: "y: Price", symbol: { fill: "orange" } }
             
            ]}
          />
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" }
            }}
            x ={d=>new Date(d.year, 1, 1)}
            y={d=>d.price || 100}
            data={reviews}
          />

          <VictoryScatter
              style={{ data: { fill: "#c43a31" } }}
              size={7}
              x ={d=>new Date(d.year, 1, 1)}
              y={d=>d.price || 100}
              labels={(d) => ` ${d.name} \n $${d.price}`}
              labelComponent={
                <VictoryTooltip
                  style={{ fontSize: 10 }}
                  orientation="right"
                />
              }
              data={reviews}
            />

        </VictoryChart>

      </svg>
    )


    var winerypieChart = (
      <svg width={500} height={500} >
        <VictoryPie
          standalone={false}
          width={400} height={400}
          data={winerydata}
          labels={(d) => ` ${d.x} \n     ${d.y * 100}%`}
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 20 }}
              orientation="right"
            />
          }
          innerRadius={68} labelRadius={100}
          style={{ labels: { fontSize: 20, fill: "white" } }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20, fill: "white" }}
          x={200} y={200}
          text="Winery"
        />
      </svg>
    )

    var varietypieChart = (
      <svg width={500} height={500} >
        <VictoryPie
          standalone={false}
          width={400} height={400}
          data={varietydata}
          innerRadius={68} labelRadius={100}
          labels={(d) => ` ${d.x}  \n    ${d.y * 100}%`}
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 20 }}
              orientation="right"
            />
          }
          style={{ labels: { fontSize: 20, fill: "white" } }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20, fill: "white" }}
          x={200} y={200}
          text="Variety"
        />
      </svg>
    )


    var designationpieChart = (
      <svg width={500} height={500} >
        <VictoryPie
          standalone={false}
          width={400} height={400}
          data={designationdata}
          labels={(d) => ` ${d.x}  \n    ${d.y * 100}%`}
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 20 }}
              orientation="right"
            />
          }
          innerRadius={68} labelRadius={100}
          style={{ labels: { fontSize: 20, fill: "white" } }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20, fill: "white" }}
          x={200} y={200}
          text="Designation"
        />
      </svg>
    )

    var reviewsList = reviews.map((review, index) => {
      if (this.state.update_flg)
        return (
          <div className="section" key={review.rid}>
            <Container>
              <label onClick={() => { this.deleteReview(review.rid); this.getReviews() }}
                style={{
                  cursor: "pointer",
                  width: "50px",
                  height: "50px",
                  borderStyle: "solid",
                  textAlign: "center",
                  fontSize: "30px"
                }} >X</label>

              <Row className="justify-content-between">
                <Col>
                  <img
                    alt="..."
                    className="img-center img-fluid rounded-circle"
                    style={{ height: "300px", marginTop: "30px" }}
                    src={`http://${review.image1}`}
                  />
                </Col>
                <Col md="5">

                  <p style={{ fontSize: "large", marginTop: "50px", textAlign: "center" }}>
                    {review.description}
                  </p>

                </Col>
                <Col md="5">
                  <h1 className="profile-title text-left">{review.name}</h1>
                  <h5 className="text-on-back" style={{ fontSize: "200px" }}>{review.rating / 10}</h5>
                </Col>
              </Row>
              <Row>
                <Col md="5">
                  <Input value={review.description}
                    onChange={e => {
                      let reviewsCopy = JSON.parse(JSON.stringify(this.state.reviews))
                      reviewsCopy[index].description = e.target.value
                      this.setState({
                        reviews: reviewsCopy
                      })
                    }} />
                </Col>
                <Col md="5">
                  <Input value={review.rating}
                    type="range"
                    onChange={e => {
                      let reviewsCopy = JSON.parse(JSON.stringify(this.state.reviews))
                      reviewsCopy[index].rating = e.target.value
                      this.setState({
                        reviews: reviewsCopy
                      })
                    }} />
                </Col>
                <Col>
                  <Button
                    className="btn-round float-right"
                    type="button"
                    onClick={() => { this.updateReview(index); this.getReviews(); this.setState({ update_flg: false }) }}
                  >
                    Submit
                        </Button>
                </Col>


              </Row>
              <label onClick={() => this.setState({ update_flg: true })}
                style={{ cursor: "pointer", position: "relative", left: "100%" }} >Update this review</label>
            </Container>
          </div>
        );

      else
        return (
          <div className="section" key={review.rid}>
            <Container>
              <label onClick={() => { this.deleteReview(review.rid); this.getReviews() }} style={{
                cursor: "pointer",
                width: "50px",
                height: "50px",
                borderStyle: "solid",
                textAlign: "center",
                fontSize: "30px"
              }} >X</label>
              <Row className="justify-content-between">
                <Col>
                  <img
                    alt="..."
                    className="img-center img-fluid rounded-circle"
                    style={{ height: "300px", marginTop: "30px" }}
                    src={`http://${review.image1}`}
                  />
                </Col>
                <Col md="5">

                  <p style={{ fontSize: "large", marginTop: "50px", textAlign: "center" }}>
                    {review.description}
                  </p>

                </Col>
                <Col md="5">
                  <h1 className="profile-title text-left">{review.name}</h1>
                  <h5 className="text-on-back" style={{ fontSize: "200px" }}>{review.rating / 10}</h5>
                </Col>
              </Row>
              <label onClick={() => this.setState({ update_flg: true })}
                style={{ cursor: "pointer", position: "relative", left: "100%" }} >Update this review</label>
            </Container>
          </div>
        );

    });


    var wines = reviews.map(review =>
      <tr>
        <td>{review.name}</td>
      </tr>);

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
                  <h1 className="profile-title text-left" style={{ fontSize: "150px" }}>{this.state.userinfo.name}</h1>
                  <h5 className="text-on-back">01</h5>

                </Col>
                <Col className="ml-auto mr-auto" lg="4" md="6">
                  <Card className="card-coin card-plain" style={{ background: "#344675d9" }}>
                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid rounded-circle"
                        src={require("assets/img/wine3.jpg")}
                      />
                      <h4 className="title">Personal Profile</h4>
                    </CardHeader>
                    <CardBody >
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
                            Favorite Wines
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
                              {wines}
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


          <section className="section">
            <Container>
              <Col lg="6" md="6">
                <h1 className="profile-title text-left">Wine Collection Analysis</h1>
                <h5 className="text-on-back">02</h5>
              </Col>
            </Container>
          </section>
          <Row>
            <div style={{ margin: "auto", textAlign: "center" }}>
              {winerypieChart}
              {varietypieChart}
              {designationpieChart}
            </div>
          </Row>
          <Row>
          <div style={{ margin: "auto", textAlign: "center", backgroundColor:"honeyDew" }}>
            {priceLineChart}
            </div>
          </Row>

          <section className="section">
            <Container>
              <Col lg="6" md="6">
                <h1 className="profile-title text-left">Wine Reviews</h1>
                <h5 className="text-on-back">03</h5>
              </Col>
            </Container>
          </section>
          {reviewsList}
          <section className="section">
            <Container>
              <Row>
                <Col md="6">
                  <Card className="card-plain">
                    <CardHeader>
                      <h1 className="profile-title text-left">Update your Info</h1>
                      <h5 className="text-on-back">04</h5>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>Your Name</label>
                              <Input value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })} />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Password</label>
                              <Input
                                type="password"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>Age</label>
                              <Input value={this.state.age}
                                onChange={e => this.setState({ age: e.target.value })} />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Gender</label>
                              <Input value={this.state.gender}
                                onChange={e => this.setState({ gender: e.target.value })} />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Button
                          className="btn-round float-right"
                          color="primary"
                          data-placement="right"
                          id="tooltip341148792"
                          type="button"
                          onClick={this.UpdateUserInfo}
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
