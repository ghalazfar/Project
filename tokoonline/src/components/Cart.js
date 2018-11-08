import React, { Component } from 'react';
import { 
    Panel,
    Button
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { IconContext } from "react-icons";
import { MdAdd, MdRemove, MdClear } from 'react-icons/md'
import { API_URL_1 } from '../supports/api-url/apiurl';
import tshirt from '../supports/img/tshirt.jpg';
import { getUserTransaction } from '../actions';

class Cart extends Component {
    updateQuantity = (type, idtransaction, price) => {
        axios.put(API_URL_1 + '/cartquantity', {
            type: type,
            idtransaction: idtransaction,
            price: price
        }).then(res => {
            console.log(res)
            this.props.getUserTransaction(this.props.auth.iduser)
        }).catch((err) => {
            console.log(err)
        })
    }

    deleteItem = (idtransaction) => {
        axios.put(API_URL_1 + '/deletecart', {
            idtransaction: idtransaction
        }).then(res => {
            console.log(res)
            this.props.getUserTransaction(this.props.auth.iduser)
        }).catch((err) => {
            console.log(err)
        })
    }

    checkOut = (iduser) => {
        axios.put(API_URL_1 + '/checkout', {
            iduser: iduser
        }).then(res => {
            console.log(res)
            this.props.getUserTransaction(this.props.auth.iduser)
        }).catch((err) => {
            console.log(err)
        })
    }

    renderCartItem = () => {
        var dataCart = this.props.onCart
        for (var i in dataCart) {
            if (dataCart[i].quantity <= 1) {
                dataCart[i].disabled = true
            }
            else {
                dataCart[i].disabled = false
            }
        }

        return dataCart.map((data) => 
            <div className="col-sm-offset-2 col-sm-8 col-xs-12" style={{ padding: "0" }}>
                <div style={{ marginTop: "15px", marginBottom: "15px", padding: "0" }} className="col-sm-5 col-xs-11" >
                    <img className="col-xs-4" src={tshirt} style={{ width: "100px"}}/>
                    <span className="col-sm-8" style={{ fontSize: "small", fontWeight: "bold" }}>{data.name}</span>
                    <span className="col-sm-8" style={{ fontSize: "small" }}>Size: <span style={{ fontWeight: "bold" }}>{data.size}</span></span>
                    <span className="col-sm-8" style={{ fontSize: "small" }}>Color: <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>{data.color}</span></span>
                </div>
                <div style={{ padding: "0" }} className="hidden-sm hidden-md hidden-lg col-xs-1">
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                        <Button bsSize="xsmall" onClick={() => this.deleteItem(data.idtransaction)}><MdClear/></Button>
                    </IconContext.Provider>
                </div>
                <div style={{ marginTop: "15px", marginBottom: "15px", padding: "0" }} className="col-sm-6 col-xs-12">
                    <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>QTY</p>
                    <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>AVAILABILITY</p>
                    <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>PRICE</p>
                    <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>TOTAL</p>
                    <div className="col-sm-3 col-xs-3">
                        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                            <Button style={{ marginRight: "2px" }} disabled={data.disabled} bsSize="xsmall" onClick={() => this.updateQuantity('remove', data.idtransaction, data.price)}><MdRemove/></Button><span style={{ fontSize: "x-small" }}>{data.quantity}</span><Button style={{ marginLeft: "2px" }} bsSize="xsmall" onClick={() => this.updateQuantity('add', data.idtransaction, data.price)}><MdAdd/></Button>
                        </IconContext.Provider>
                    </div>
                    <p className="col-sm-3 col-xs-3" style={{ fontSize: "x-small", fontWeight: "bold" }}>In Stock</p>                               
                    <p className="col-sm-3 col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>IDR {data.price}</p>
                    <p className="col-sm-3 col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>IDR {data.price*data.quantity}</p>
                </div>
                <div style={{ padding: "0" }} className="col-sm-1 hidden-xs">
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                        <Button bsSize="xsmall" onClick={() => this.deleteItem(data.idtransaction)}><MdClear/></Button>
                    </IconContext.Provider>
                </div>
            </div>
        )
    }
    
    renderCart = () => {
        if (this.props.onCart.length > 0) {
            return (
                <div>
                    <div className="col-sm-offset-2 col-sm-8 col-xs-12" style={{ padding: "0" }}>
                    <div className="col-sm-5 hidden-xs" style={{ padding: "0" }}>
                        <p style={{ fontSize: "small", fontWeight: "bold" }}>PRODUCT</p>
                    </div>
                    <div className="col-sm-6 col-xs-12" style={{ padding: "0" }}>
                        <p className="col-sm-3 hidden-xs" style={{ fontSize: "small", fontWeight: "bold" }}>QTY</p>
                        <p className="col-sm-3 hidden-xs" style={{ fontSize: "small", fontWeight: "bold" }}>AVAILABILITY</p>
                        <p className="col-sm-3 hidden-xs" style={{ fontSize: "small", fontWeight: "bold" }}>PRICE</p>
                        <p className="col-sm-3 hidden-xs" style={{ fontSize: "small", fontWeight: "bold" }}>TOTAL</p>
                    </div>
                    </div>
                    {this.renderCartItem()}
                </div>
            )
        }
        else {
            return (
                <div>YOUR CART IS EMPTY</div>
            )
        }
    }

    renderCheckout = () => {
        var totalPayment = 0
        for (var i in this.props.onCart) {
            totalPayment += this.props.onCart[i].payment
        }
        if (this.props.onCart.length > 0){
            return (
                <div className="col-sm-offset-8 col-sm-3 col-xs-12">
                    <p style={{ fontSize: "small" }}><span className="col-xs-6">Subtotal</span><span className="col-xs-6" style={{ textAlign: "right"}}>IDR {totalPayment}</span></p>                               
                    <p style={{ fontSize: "small" }}><span className="col-xs-6">Shipping</span><span className="col-xs-6" style={{ textAlign: "right"}}>IDR 50K</span></p>   
                    <p style={{ fontSize: "small", fontWeight: "bold" }}><span className="col-xs-6">Subtotal</span><span className="col-xs-6" style={{ textAlign: "right"}}>IDR 250K</span></p>   
                    <Button block style={{ padding: "0px" }} bsStyle="success" bsSize="xsmall" onClick={() => this.checkOut(this.props.auth.iduser)}>
                        <span style={{ fontWeight: "bold", fontSize: "large" }}>CHECKOUT</span>
                    </Button>
                </div>
            )
        }
    }

    render() {
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
                        {this.renderCart()}
                    </Panel.Body>
                </Panel>
                <div className="container">
                    {this.renderCheckout()}
                </div>              
            </div>
        )
    }    
}

const mapStateToProps = (state) => {
    return { auth: state.auth, onCart: state.transaction.onCart}
}
export default connect(mapStateToProps,{ getUserTransaction })(Cart);