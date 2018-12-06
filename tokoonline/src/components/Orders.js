import React, { Component } from 'react';
import { 
    Panel,
    Button,
    Tabs,
    Tab
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { IconContext } from "react-icons";
import { MdAdd, MdRemove, MdClear } from 'react-icons/md'
import { API_URL_1 } from '../supports/api-url/apiurl';
import tshirt from '../supports/img/tshirt.jpg';
import { getUserTransaction } from '../actions';

class Orders extends Component {  

    renderOnProcessItem = () => {
        var dataOnProcess = this.props.onProcess
        for (var i in dataOnProcess) {
            if (dataOnProcess[i].quantity <= 1) {
                dataOnProcess[i].disabled = true
            }
            else {
                dataOnProcess[i].disabled = false
            }
        }

        return dataOnProcess.map((data) => 
            <div className="col-sm-offset-2 col-sm-8 col-xs-12" style={{ padding: "0" }}>
                <div style={{ marginTop: "15px", marginBottom: "15px", padding: "0" }} className="col-sm-5 col-xs-11" >
                    <Link to={"/productdetail?id="+data.idproduct}><img className="col-xs-4" src={data.thumbnail} style={{ width: "100px"}}/></Link>
                    <span className="col-sm-8" style={{ fontSize: "small", fontWeight: "bold" }}>{data.name}</span>
                    <span className="col-sm-8" style={{ fontSize: "small" }}>Size: <span style={{ fontWeight: "bold" }}>{data.size}</span></span>
                    <span className="col-sm-8" style={{ fontSize: "small" }}>Color: <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>{data.color}</span></span>
                </div>
                <div style={{ marginTop: "15px", marginBottom: "15px", padding: "0" }} className="col-sm-6 col-xs-12">
                    <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>QTY</p>
                    <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>PAYMENT</p>
                    <p className="hidden-sm hidden-md hidden-lg col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>DATE</p>
                    <div className="col-sm-3 col-xs-3">
                            <span style={{ fontSize: "small" }}>{data.quantity}</span>
                    </div>
                    <p className="col-sm-3 col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>{data.payment}</p>                               
                    <p className="col-sm-3 col-xs-3" style={{ fontSize: "small", fontWeight: "bold" }}>{data.date.replace('T', ' ').replace('.000Z', '')}</p>
                </div>
            </div>
        )
    }
    
    renderOnProcess = () => {
        if (this.props.onProcess.length > 0) {
            return (
                <div>
                    <div className="col-sm-offset-2 col-sm-8 col-xs-12" style={{ padding: "0" }}>
                    <div className="col-sm-5 hidden-xs" style={{ padding: "0" }}>
                        <p style={{ fontSize: "small", fontWeight: "bold" }}>PRODUCT</p>
                    </div>
                    <div className="col-sm-6 col-xs-12" style={{ padding: "0" }}>
                        <p className="col-sm-3 hidden-xs" style={{ fontSize: "small", fontWeight: "bold" }}>QTY</p>
                        <p className="col-sm-3 hidden-xs" style={{ fontSize: "small", fontWeight: "bold" }}>PAYMENT</p>
                        <p className="col-sm-3 hidden-xs" style={{ fontSize: "small", fontWeight: "bold" }}>DATE</p>
                    </div>
                    </div>
                    {this.renderOnProcessItem()}
                </div>
            )
        }
        else {
            return (
                <div>Empty</div>
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
                    <Tabs defaultActiveKey={1} justified animation={false} >
                        <Tab eventKey={1} title="On Process">
                        <Panel style={{ marginTop: "-1px" }}>
                                <Panel.Body>
                                    {this.renderOnProcess()}
                                </Panel.Body>
                            </Panel>
                        </Tab>
                        <Tab eventKey={2} title="Delivered">
                            Empty
                        </Tab>
                    </Tabs>
                    
                    </Panel.Body>
                </Panel>           
            </div>
        )
    }    
}

const mapStateToProps = (state) => {
    return { auth: state.auth, onProcess: state.transaction.onProcess, delivered: state.transaction.delivered}
}
export default connect(mapStateToProps,{ getUserTransaction })(Orders);