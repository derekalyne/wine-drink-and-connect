import React from "react";
import "assets/scss/blk-design-system-react.scss";
import "assets/css/nucleo-icons.css";
import PageHeader from 'components/PageHeader/PageHeader.jsx'
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
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
    ButtonGroup
} from "reactstrap";

class Tables extends React.Component {
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

            <tr key = {o.wid}>
                <td width="25%">{o.name}</td>
                <td width="25%">{o.winery}</td>
                {/*<td>{o.country}</td>*/}
                <td width="10%">{o.year}</td>
                <td width="10%">{o.price}</td>
                <img width="100%" src={`http://${o.image1}`}/>
            </tr>
        );

        return (
            <>
                <IndexNavbar />
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
                    <div style={{margin: 20}}></div>

                    {/*result of query*/}
                    <div className='container-fluid'>
                        <table>
                            <tr>
                                <th width="25%"> Name</th>
                                <th width="25%"> Winery</th>
                                <th width="10%"> Year</th>
                                <th width="10%"> Price</th>
                                <th width="100%">Image</th>
                            </tr>
                            {wines}
                        </table>
                    </div>

                    {/*now we want to display pagination*/}
                    <div style={{margin: 20}} className='section section-basic' >

                        <div className='container-fluid' >
                            <Form className='pagination'>

                                <FormGroup controlId='wineQuery'>
                                    <Label>Page:</Label>
                                    <Input defaultValue=""
                                           placeholder="enter a number"
                                           type="text"
                                           name='currPage'
                                           value={this.state.page}
                                           onChange={e => this.setState({page: e.target.value})} />
                                </FormGroup>

                            </Form>
                            <Button type='button' onClick={ () => this.fetchData()}>Submit</Button>
                            {/*<ButtonGroup>*/}

                                {/*<Button onClick={this.setState({pageprev: this.state.page}).then(() => this.fetchData())}>{this.state.pageprev}</Button>*/}
                                {/*<Button onClick={ () => this.fetchData()}*/}
                                        {/*value={this.state.page}>{this.state.page}</Button>*/}
                                {/*<Button onClick={ () => this.fetchData()} >{this.state.pagenext}</Button>*/}
                            {/*</ButtonGroup>*/}
                        </div>
                    </div>
                </div>


            </>

        );
    }
}

export default Tables;
