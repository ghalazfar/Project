import React, { Component } from 'react';
import { 
    Panel,
    PanelGroup,
    ListGroup,
    ListGroupItem,
    Thumbnail
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { searchQuery, categorySelect } from '../actions'
import tshirt from '../supports/img/tshirt.jpg';

class Search extends Component {
    state = {
        list: ''
    }

    componentWillMount() {
        const params = queryString.parse(this.props.location.search)
        this.props.searchQuery(params.q)
    }

    fnsort = (property, order) => {
        if(order == 'ascending') {
            return ((a, b) => {
                return a[property] > b[property]
            })
        }
        else if (order == 'descending') {
            return ((a, b) => {
                return a[property] < b[property]
            })
        }
    }
    
    selectSort = (property, order) => {
        var list = this.props.productData
        var newList = list.sort(this.fnsort(property, order))
        this.setState({ list: newList })
    }

    renderproduct = () => {
        if (this.props.productData != undefined) {
            if (this.props.productData.length == 0) {
                return (
                    <div>NOT FOUND!</div>
                )
            }
            return this.props.productData.map((data) => 
                <Link to={'/productdetail?id=' + data.idproduct} className="col-sm-3 col-xs-10">
                    <Thumbnail src={tshirt} alt="">
                        <p style={{ textAlign: "center" }}>{data.name}</p>
                        <p style={{fontWeight: "bold", textAlign: "center" }}><mark >IDR {(data.price)/1000}K</mark></p>
                    </Thumbnail>
                </Link>
            )            
        }
    }
    
    render() {
        return(
            <div className="container-fluid">
                <div className="col-sm-3 col-xs-12">
                    <PanelGroup accordion>
                        <Panel eventKey={1}>
                            <Panel.Heading>
                            <Panel.Title toggle onClick={() => this.props.categorySelect([1])}><Link to="/productlist?cat=1">Men</Link></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                            <ListGroup style={{ margin: "-16px" }}>
                                <ListGroupItem><Link to="/productlist?cat=1&catdetail=1" onClick={() => this.props.categorySelect([1,1])}>Outerwear</Link></ListGroupItem>
                                <ListGroupItem><Link to="/productlist?cat=1&catdetail=2" onClick={() => this.props.categorySelect([1,2])}>Tops</Link></ListGroupItem>
                                <ListGroupItem><Link to="/productlist?cat=1&catdetail=3" onClick={() => this.props.categorySelect([1,3])}>Bottoms</Link></ListGroupItem>
                                <ListGroupItem><Link to="/productlist?cat=1&catdetail=4" onClick={() => this.props.categorySelect([1,4])}>Shoes</Link></ListGroupItem>
                            </ListGroup>
                            </Panel.Body>
                        </Panel>
                        <Panel eventKey={2}>
                            <Panel.Heading>
                            <Panel.Title toggle onClick={() => this.props.categorySelect([2])}><Link to="/productlist?cat=2">Women</Link></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                            <ListGroup style={{ margin: "-16px" }}>
                                <ListGroupItem><Link to="/productlist?cat=2&catdetail=5" onClick={() => this.props.categorySelect([2,5])}>Outerwear</Link></ListGroupItem>
                                <ListGroupItem><Link to="/productlist?cat=2&catdetail=6" onClick={() => this.props.categorySelect([2,6])}>Tops</Link></ListGroupItem>
                                <ListGroupItem><Link to="/productlist?cat=2&catdetail=7" onClick={() => this.props.categorySelect([2,7])}>Bottoms</Link></ListGroupItem>
                                <ListGroupItem><Link to="/productlist?cat=2&catdetail=8" onClick={() => this.props.categorySelect([2,8])}>Shoes</Link></ListGroupItem>
                            </ListGroup>
                            </Panel.Body>
                        </Panel>
                        <Panel eventKey={3}>
                            <Panel.Heading>
                            <Panel.Title toggle onClick={() => this.props.categorySelect([3])}><Link to="/productlist?cat=1">Accessories</Link></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                            <ListGroup style={{ margin: "-16px" }}>
                                <ListGroupItem><Link to="/productlist?cat=3&catdetail=9" onClick={() => this.props.categorySelect([3,9])}>Rings</Link></ListGroupItem>
                                <ListGroupItem><Link to="/productlist?cat=3&catdetail=10" onClick={() => this.props.categorySelect([3,10])}>Necklaces</Link></ListGroupItem>
                                <ListGroupItem><Link to="/productlist?cat=3&catdetail=11" onClick={() => this.props.categorySelect([3,11])}>Hats</Link></ListGroupItem>
                                <ListGroupItem><Link to="/productlist?cat=3&catdetail=11" onClick={() => this.props.categorySelect([3,12])}>Bags</Link></ListGroupItem>
                            </ListGroup>
                            </Panel.Body>
                        </Panel>
                    </PanelGroup>
                </div>
                <div className="col-sm-9 col-xs-12">
                    <div className="form-inline" style={{ margin: "15px", marginTop: "0px"}}>
                        <label className="col-form-label"><span style={{ fontSize: "small" }}>Sort by:</span></label>
                        <select ref="sort" defaultValue={1} className="form-control input-sm" style={{ marginLeft: "20px"}}>
                            <option key={1} value={1} onClick={() => this.selectSort('price', 'ascending')}> Price low to high </option>
                            <option key={2} value={2} onClick={() => this.selectSort('price', 'descending')}> Price high to low </option>
                            <option key={3} value={3} onClick={() => this.selectSort('name', 'ascending')}> Name: A - Z </option>
                            <option key={4} value={4} onClick={() => this.selectSort('name', 'descending')}> Name: Z - A </option>   
                        </select>
                    </div>
                    <div className="col-xs-12">
                        {this.renderproduct()}
                    </div>                                      
                </div>
            </div>
        )
    }    
}

const mapStateToProps = (state) => {
    const { searchQuery } = state
    return { productData: searchQuery.productData };
}
export default connect(mapStateToProps, { searchQuery, categorySelect })(Search);
