import React, { Component } from 'react';
import { 
    Panel,
    PanelGroup,
    ListGroup,
    ListGroupItem,
    Thumbnail,
    Button
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import tshirt from '../supports/img/tshirt.jpg';

class Cart extends Component {
    
    render() {
        return(
            <div className="container-fluid">
                <div className="col-sm-offset-2 col-sm-8 col-xs-12">
                        <Link to='/'>
                            <Button style={{ padding: "0px", paddingLeft: "5px", paddingRight: "5px", marginBottom: "20px" }} bsSize="xsmall">
                                    <span style={{ fontSize: "xsmall" }}>CONTINUE SHOPPING</span>
                            </Button>
                        </Link>    
                </div>
                <div className="col-xs-12" >
                    <Panel style={{ marginRight: "-30px", marginLeft: "-30px" }}>
                        <Panel.Body >
                            <div className="col-sm-offset-2 col-sm-8 col-xs-12">
                                <div>
                                    <img src={tshirt} style={{ width: "75px"}}/>
                                </div>                            
                            </div>
                        </Panel.Body>
                    </Panel>
                </div>
            </div>
        )
    }    
}

export default Cart;
