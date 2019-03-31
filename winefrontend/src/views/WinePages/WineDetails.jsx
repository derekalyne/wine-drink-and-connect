import React from "react";
import "assets/scss/blk-design-system-react.scss";
import "assets/css/nucleo-icons.css";
import WineContext from "../Context/wine-context"
import ExamplesNavbar from "./ExamplesNavbar";

import {
    Button,
    Label,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";

class WineDetails extends React.Component {
    static contextType = WineContext;
    constructor(props) {
        super(props);
        this.state = {
            tableData: {data:[]},
            year:2000
        };
    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/wines/`;
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


    click = () =>{
        this.setState({ year: 3000});
        this.fetchData();
    };

    render() {
        var WineData = {
            name  : "Niscosia 2013 Vulka Branco (Ethnal)",
            winery : "Nicosia",
            year  : 2013,
            price : 100,
            pic   :"sp19-cs411-46.cs.illinois.edu:8000/static/wid136/0.jpg",
            des   :"nothing"};
        var wines = [WineData].map(o =>
            <tr>
                <img src={`http://${o.pic}`}/>

            </tr>
        );

        return (
            <>
                <ExamplesNavbar />
                <div className='wrapper'>
                    <div className="main">
                        <div className="wrapper" >
                            <br></br><br></br><br></br><br></br>
                            <img src={`http://${WineData.pic}`} ALIGN="left"/>
                            <br></br><br></br><br></br>
                            <pre>&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;{WineData.name}</pre>
                            <pre>&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;Whinery: {WineData.winery}</pre>
                            <pre>&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;year: {WineData.year}</pre>
                            <pre>&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;price: {WineData.year}</pre>
                            <pre>&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;description: {WineData.des}</pre>
                            <br CLEAR="left"></br>
                            <br></br><u ALIGN="left"><pre>location:</pre> </u>
                            <ul>
                                <li>country:</li>
                                <li>region:</li>
                                <li>province:</li>
                            </ul>
                            <p>Reviews: <button className="send-button" onClick={this.click}>wines</button></p>
                                <textarea name="text" cols="50" rows="3">Add Review...</textarea>
                            <p>Username:</p><textarea name="text" cols="25" rows="1">Add name...</textarea>
                            <p>Description:</p><textarea name="text" cols="25" rows="1">Add description...</textarea>
                            <p>rating:</p><textarea name="text" cols="25" rows="1">Add rating...</textarea>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}
export default  WineDetails