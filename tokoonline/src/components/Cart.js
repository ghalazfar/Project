import React, { Component } from 'react';
import { 
    Panel,
    Button
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
import { API_URL_1 } from '../supports/api-url/apiurl';
import tshirt from '../supports/img/tshirt.jpg';

class Cart extends Component {
    state = {
        cartData: ''
    }
    
    componentWillMount() {
        axios.post(API_URL_1 + '/getcart', {
            iduser: this.props.auth.iduser
        }).then(res => {
        this.setState({ cartData: res.data })
        })
    }
    
    render() {
        console.log(this.state.cartData)
        return(
            <div>
                <div className="container-fluid">
                <Link to='/' className="col-sm-offset-2 col-sm-8 col-xs-12">
                    <Button style={{ padding: "0px", paddingLeft: "5px", paddingRight: "5px", marginBottom: "20px" }} bsSize="xsmall">
                            <span style={{ fontSize: "xsmall" }}>CONTINUE SHOPPING</span>
                    </Button>
                </Link>
                </div>    
                <Panel>
                    <Panel.Body style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                        <div className="col-sm-offset-2 col-sm-4 hidden-xs">
                            <p style={{ fontSize: "small", fontWeight: "bold" }}>PRODUCT</p>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <p className="col-sm-3 hidden-xs" style={{ fontSize: "small", fontWeight: "bold" }}>QTY</p>
                            <p className="col-sm-3 hidden-xs" style={{ fontSize: "small", fontWeight: "bold" }}>AVAILABILITY</p>
                            <p className="col-sm-3 hidden-xs" style={{ fontSize: "small", fontWeight: "bold" }}>PRICE</p>
                            <p className="col-sm-3 hidden-xs" style={{ fontSize: "small", fontWeight: "bold" }}>TOTAL</p>
                        </div>
                        <div className="col-sm-offset-2 col-sm-8 col-xs-12" style={{ padding: "0" }}>
                            <div style={{ marginTop: "15px", marginBottom: "15px" }} className="col-sm-6" >
                                <img className="col-xs-4" src={tshirt} style={{ width: "100px"}}/>
                                <p className="col-sm-8" style={{ fontSize: "small", fontWeight: "bold" }}>DESCRIPTION</p>
                            </div>
                            <div style={{ marginTop: "15px", marginBottom: "15px" }} className="col-sm-6 col-xs-12">
                                <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>QTY</p>
                                <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>AVAILABILITY</p>
                                <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>PRICE</p>
                                <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>TOTAL</p>
                                <form className="col-sm-3 col-xs-3">
                                    <input type="number" defaultValue="1" className="form-control input-sm" ref="quantity"/>
                                </form>
                                <p className="col-sm-3 col-xs-3" style={{ fontSize: "x-small", fontWeight: "bold" }}>In Stock</p>                               
                                <p className="col-sm-3 col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>IDR 100K</p>
                                <p className="col-sm-3 col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>IDR 100K</p>
                            </div>
                        </div>
                        <div className="col-sm-offset-2 col-sm-8 col-xs-12" style={{ padding: "0", marginTop: "15px", marginBottom: "15px" }}>
                            <div style={{ marginTop: "15px", marginBottom: "15px" }} className="col-sm-6" >
                                <img className="col-xs-4" src={tshirt} style={{ width: "100px"}}/>
                                <p className="col-sm-8" style={{ fontSize: "small", fontWeight: "bold" }}>DESCRIPTION</p>
                            </div>
                            <div style={{ marginTop: "15px", marginBottom: "15px" }} className="col-sm-6 col-xs-12">
                                <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>QTY</p>
                                <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>AVAILABILITY</p>
                                <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>PRICE</p>
                                <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>TOTAL</p>
                                <form className="col-sm-3 col-xs-3">
                                    <input type="number" defaultValue="1" className="form-control input-sm" ref="quantity"/>
                                </form>
                                <p className="col-sm-3 col-xs-3" style={{ fontSize: "x-small", fontWeight: "bold" }}>In Stock</p>                               
                                <p className="col-sm-3 col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>IDR 100K</p>
                                <p className="col-sm-3 col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>IDR 100K</p>
                            </div>
                        </div>
                    </Panel.Body>
                </Panel>
                <div className="container">
                <div className="col-sm-offset-8 col-sm-3 col-xs-12">
                    <p style={{ fontSize: "small" }}><span className="col-xs-6">Subtotal</span><span className="col-xs-6" style={{ textAlign: "right"}}>IDR 200K</span></p>                               
                    <p style={{ fontSize: "small" }}><span className="col-xs-6">Shipping</span><span className="col-xs-6" style={{ textAlign: "right"}}>IDR 50K</span></p>   
                    <p style={{ fontSize: "small", fontWeight: "bold" }}><span className="col-xs-6">Subtotal</span><span className="col-xs-6" style={{ textAlign: "right"}}>IDR 250K</span></p>   
                    <Button block style={{ padding: "0px" }} bsStyle="success" bsSize="xsmall">
                        <span style={{ fontWeight: "bold", fontSize: "large" }}>CHECKOUT</span>
                    </Button>
                </div>  </div>              
            </div>
        )
    }    
}

const mapStateToProps = (state) => {
    return { auth: state.auth }
}
export default connect(mapStateToProps)(Cart);