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
import { categorySelect } from '../actions'
import tshirt from '../supports/img/tshirt.jpg';

class ProductList extends Component {
    componentWillMount() {
        const params = queryString.parse(this.props.location.search)
        if (params.catdetail == undefined ) {
            this.props.categorySelect([params.cat])
        }
        else {
            this.props.categorySelect([params.cat, params.catdetail]) 
        }
    }

    renderproduct = () => {
        if (this.props.productData != undefined) {
            return this.props.productData.map((data) => 
                <div className="col-sm-3 col-xs-10">
                    <Thumbnail href='#' src={tshirt} alt="">
                        <p style={{ textAlign: "center" }}>{data.name}</p>
                        <p style={{fontWeight: "bold", textAlign: "center" }}><mark >{data.price} IDR</mark></p>
                    </Thumbnail>
                </div>
            )
        }
    }
    
    render() {
        return(
            <div className="container-fluid">
                <div className="col-sm-3 col-xs-12">
                    <PanelGroup accordion activeKey={this.props.selectedCategory[0]}>
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
                    {this.renderproduct()}                   
                </div>
            </div>
        )
    }    
}

const mapStateToProps = (props) => {
    const { selectedCategory } = props
    return { selectedCategory: selectedCategory.selectedCategory, productData: selectedCategory.productData };
}
export default connect(mapStateToProps, { categorySelect })(ProductList);
