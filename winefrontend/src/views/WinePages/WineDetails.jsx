import React from "react";
import "assets/scss/blk-design-system-react.scss";
import "assets/css/nucleo-icons.css";
import ExamplesNavbar from "./ExamplesNavbar";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import WineContext from "../Context/wine-context"


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
let ps = null;

class WineDetails extends React.Component {
    static contextType = WineContext;
    constructor(props) {
        super(props);
        this.state = {
            tabs: 1,
            wineObj: {  image1:"",
                        image2:"",
                        name:"",
                        price:"",
                        country:"",
                        designation:"",
                        province:"",
                        region:"",
                        variety:"",
                        winery:""},
            reviews: [{
                username:"",
                rating:"",
                rid:"",
                description:""
            }],
            submitRating:50,
            submitDescription:''          
        };
    }
  
    getWineData = () => {
        const url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/wines/?wid=` + this.context.wid;
        fetch(url,
            {method: "GET",})
                .then((e) => {
                    return e.json()
                }).catch( (e) => {
                    return console.error("Error:", e)
                }).then( (e) => {
                    let wineData = e.data;
                    if (wineData == null || wineData.length == 0) {
                        throw "No Wine with this Id"
                    }
                    this.setState({ wineObj: wineData[0]});
                    console.log("Success:", this.state.wineObj);
                })
    };

    getReviews = () => {
        const url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/reviews/wid/` + this.context.wid;
        fetch(url, {method: "GET",})
            .then((e) => {
                return e.json()
            }).catch((e) => {
                return console.error("Error:", e)
            }).then((e) => {
                let reviews = e.data;
                if (reviews == null) {
                    throw "Error in getting reviews for this wine"
                }
                this.setState({reviews: reviews});
                console.log("Success:", this.state.reviews);
            })
    };

    createReview = (reviewObj) => {
        if (reviewObj == null || reviewObj.rating == null || reviewObj.description == null) {
            console.log("ERROR!");
            return;
        }
        const url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/reviews/wid/`+ this.context.wid;

        let formData  = new FormData();
        formData.append("rating",reviewObj.rating);
        formData.append("wid",this.context.wid);
        formData.append("description",reviewObj.description);
        formData.append("username", this.context.username);
        console.log(formData)
        fetch(url, {method: "POST",
            body: formData,
            headers: {
                'X-CSRFToken': csrftoken,
            }})
            .then((e) => {
                if (e.status == 201) {
                    console.log("Successfully created review");
                    this.getReviews();
                } else {
                    // There is currently an internal server error, but it actually creates the review...
                    console.log("Error in creating review");
                }
            })
    };

    toggleTabs = (e, stateName, index) => {
      e.preventDefault();
      this.setState({
        [stateName]: index
      });
    };



 
    componentDidMount() {
        this.getReviews();
        this.getWineData();
     
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
      
 

    render() {
        

      const{wineObj,reviews} = this.state;
      var reviewsList = reviews.map((review,index) =>{
      if(index % 2 === 0){
          return(
        <div className="section">
        <Container>
          <Row className="justify-content-between">
            <Col md="5">
              <p style = {{fontSize:"large",marginTop:"50px"}}>
               {review.description}
              </p>
            </Col>
            <Col md="5">
              <h1 className="profile-title text-left">{review.username}</h1>
              <h5 className="text-on-back" style = {{fontSize:"200px"}}>{review.rating/10}</h5>
            </Col>
          </Row>
        </Container>
        </div>
          )
      }
      else{
          return(
            <div className="section">
            <Container>
              <Row className="justify-content-between">
              <Col md="5">
                  <h1 className="profile-title text-left">{review.username}</h1>
                  <h5 className="text-on-back" style = {{fontSize:"200px"}}>{review.rating/10}</h5>
                </Col>
                <Col md="5">
                  <p style = {{fontSize:"large",marginTop:"50px"}}>
                   {review.description}
                  </p>
                </Col>
              </Row>
            </Container>
            </div>
          )
      }
    }
      );
      return( <>
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
            
                <Col className="ml-auto mr-auto" lg="4" md="6">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid rounded-circle"
                        src={`http://${wineObj.image1}`}
                      />
                      <h4 className="title">{wineObj.name}</h4>
                    </CardHeader>
                    <CardBody>
              
                      <TabContent
                        className="tab-subcategories"
                        activeTab={"tab" + this.state.tabs}
                      >
                        <TabPane tabId="tab1">
                          <Table className="tablesorter" responsive>
                           
                            <tbody>
                              <tr>
                                <td>Price</td>
                                <td>${wineObj.price}</td>
                              </tr>
                              <tr>
                                <td>Designation</td>
                                <td>{wineObj.designation}</td>
                              </tr>
                              <tr>
                                <td>Variety</td>
                                <td>{wineObj.variety}</td>
                              </tr>
                              <tr>
                                <td>Province</td>
                                <td>{wineObj.province}</td>
                              </tr>
                              <tr>
                                <td>Winery</td>
                                <td>{wineObj.winery}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </TabPane>
                       
                      
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="6" md="6">
                  <h1 className="profile-title text-left" style={{fontSize:"50px"}}>{wineObj.region}</h1>
                  <h5 className="text-on-back">{wineObj.country}</h5>
                </Col>
              </Row>
            </Container>
          </div>
            {reviewsList}
          <section className="section">
            <Container>
            
                  <Card className="card-plain">
                    <CardHeader>
                      <h1 className="profile-title text-left">Review  {wineObj.name}</h1>
                      <h5 className="text-on-back"> {this.state.submitRating/10} </h5>
                    </CardHeader>
                    <CardBody>
                      <Form>
                            <label> Rating</label>
                              <Input
                              style = {{maxWidth:"400px"}}
                              type = "range"
                              value={this.state.submitRating}
                                           onChange={e => this.setState({submitRating: e.target.value})} />
                       
                              <label>Review </label>
                              <Input
                              style = {{border:"",height:"300px"}}
                              type = "textarea"
                              value={this.state.submitDescription}
                                           onChange={e => this.setState({submitDescription: e.target.value})} />
                     
                        <Button
                          className="btn-round float-right"
                          color="primary"
                          data-placement="right"
                          id="tooltip341148792"
                          type="button"
                          onClick = {() => {this.createReview({
                            rating:this.state.submitRating,
                            description:this.state.submitDescription
                          });
                          this.getReviews()
                        }
                        }
                        >
                          Submit
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          placement="right"
                          target="tooltip341148792"
                        >
                          Click to submit your review!
                        </UncontrolledTooltip>
                      </Form>
                    </CardBody>
                  </Card>
            
            </Container>
          </section>
          
        </div>
      </>
      )

    }
}
export default  WineDetails