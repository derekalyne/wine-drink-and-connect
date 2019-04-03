import React from "react";
import ExamplesNavbar from "./ExamplesNavbar";
import { Link } from "react-router-dom";
import WineContext from "../Context/wine-context";
import {
    Button,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    NavLink,
    ButtonGroup
} from "reactstrap";

class WineTables extends React.Component {
    static contextType = WineContext;
    constructor(props) {
        super(props);
        this.state = {
            tableData: {data:[]},
            winesel:"",
            winery:"",
            wineYearl:"",
            wineYearh:"",
            pricel:"",
            priceh:"",
            page:1,
            pageprev:0,
            pagenext:0
        };
    }
    componentDidMount() {
    this.fetchData();
        this.setState({pagenext: this.state.page + 1});
        this.setState({pageprev: this.state.page - 1})


    }

    updatePage = (pageprev_new, page_new, pagenext_new) => {
        this.setState({pageprev: pageprev_new, page:page_new, pagenext:pagenext_new});
        return this.fetchData_page(page_new);
    };

    // this fetchdata is called when you change the page number
    fetchData_page = (page_new) => {

        var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/wines/?page=&winery=${this.state.winery}&year_gt=${this.state.wineYearl}&year_lt=${this.state.wineYearh}&variety&price_gt=${this.state.pricel}&price_lt=${this.state.priceh}&designation&name=${this.state.winesel}&page=${page_new}`;
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

    // this fetchdata is called when you first load/update the page
    fetchData = () => {

        var url = `http://sp19-cs411-46.cs.illinois.edu:8000/api/wines/?page=&winery=${this.state.winery}&year_gt=${this.state.wineYearl}&year_lt=${this.state.wineYearh}&variety&price_gt=${this.state.pricel}&price_lt=${this.state.priceh}&designation&name=${this.state.winesel}&page=${this.state.page}`;
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



    render() {

        var wines = this.state.tableData.data.map(o =>

            <tr key = {o.wid} align='center'>
                <NavLink tag={Link} to="wine-detail">
                <td width="25%" onClick={()=>this.context.updateWid(o.wid)} >{o.name}</td>
                </NavLink>
                <td width="25%">{o.winery}</td>
                {/*<td>{o.country}</td>*/}
                <td width="10%">{o.year}</td>
                <td width="10%">{o.price}</td>
                <img height='125px' src={`http://${o.image1}`}/>
            </tr>
        );

        return (
            <>
                <ExamplesNavbar />
                {/* search bar */}
                <div style={{margin: 20}} className='section section-basic' >

                    <div className='container-fluid' >
                        <Form className='form'>

                                <FormGroup controlId='wineQuery'>
                                    <Label>Wine selection:</Label>
                                    <Input defaultValue=""
                                           placeholder="Pinot Noir"
                                           type="text"
                                           name='winesel'
                                           value={this.state.winesel}
                                           onChange={e => this.setState({winesel: e.target.value})} />
                                </FormGroup>

                                <FormGroup controlId='wineWinery'>
                                    <Label>Wine winery:</Label>
                                    <Input defaultValue=""
                                           placeholder="Sweet Cheeks"
                                           type="text"
                                           name='winery'
                                           value={this.state.winery}
                                           onChange={e => this.setState({winery: e.target.value})}
                                           />
                                </FormGroup>

                                <FormGroup controlId='wineYear'>
                                    <Label> Wine year (low):</Label>
                                    <Input defaultValue=""
                                           placeholder="1997"
                                           type="text"
                                           name='wineYear'
                                           value={this.state.wineYear}
                                           onChange={e => this.setState({wineYearl: e.target.value})}
                                    />
                                </FormGroup>
                                <FormGroup controlId='wineYear'>
                                    <Label> Wine year (high):</Label>
                                    <Input defaultValue=""
                                       placeholder="1997"
                                       type="text"
                                       name='wineYear'
                                       value={this.state.wineYear}
                                       onChange={e => this.setState({wineYearh: e.target.value})}
                                    />
                            </FormGroup>

                                <FormGroup controlId='winePrice'>
                                    <Label> Wine price (low):</Label>
                                    <Input defaultValue=""
                                           placeholder="75"
                                           type="text"
                                           name='price'
                                           value={this.state.pricel}
                                           onChange={e => this.setState({pricel: e.target.value})}
                                    />
                                </FormGroup>
                                <FormGroup controlId='winePrice'>
                                    <Label> Wine price (high):</Label>
                                    <Input defaultValue=""
                                           placeholder="75"
                                       type="text"
                                       name='price'
                                       value={this.state.priceh}
                                       onChange={e => this.setState({priceh: e.target.value})}
                                />
                            </FormGroup>



                        </Form>
                        <Button type='button' onClick={ () => this.fetchData()}>Submit</Button>
                    </div>

                    {/* padding between top search bar and result*/}
                    <div style={{margin: 20}}> </div>

                    {/*result of query*/}
                    <div className='container-fluid' align='center'>
                        <table align='center'>
                            <tr align='center'>
                                <th width="25%"> Name</th>
                                <th width="25%"> Winery</th>
                                <th width="10%"> Year</th>
                                <th width="10%"> Price</th>
                                <th width="100%">Image</th>
                            </tr>
                            {wines}
                        </table>
                    </div>

                    <div style={{margin: 20}}> </div>

                    <div style={{margin: 20}} className='section section-basic' align="center" >
                        <p>Choose Page:</p>
                        <ButtonGroup>

                            <Button onClick={ () => this.updatePage((this.state.pageprev - 1), (this.state.pageprev), (this.state.page))} value={this.state.pageprev}>{this.state.pageprev}</Button>
                            <Button onClick={ () => this.updatePage((this.state.pageprev - 1), (this.state.pageprev), (this.state.page))} value={this.state.page}>{this.state.page}</Button>
                            <Button onClick={ () => this.updatePage((this.state.page), (this.state.page + 1), (this.state.pagenext + 1))} value={this.state.pagenext}>{this.state.pagenext}</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </>

        );
    }
}

export default WineTables;
