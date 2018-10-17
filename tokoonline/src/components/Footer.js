import React, { Component } from 'react';
import { 
    Nav, 
    Navbar, 
    NavItem, 
    NavDropdown, 
    MenuItem, 
    FormGroup, 
    FormControl, 
    Button, 
    InputGroup, 
    SplitButton
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onLogout, keepLogin } from '../actions';
import logo from '../supports/img/logo.png';

const cookies = new Cookies()

class Footer extends Component {
    render() {
        return(
            <div className="container-fluid" style={{marginLeft: "-15px", marginRight: "-15px", paddingBottom:"75px" }}>
                <hr/>
                <div className="col-sm-offset-4 col-sm-2 col-xs-12" style={{ marginTop: "30px"}}>
                <div style={{fontWeight: "bold", textAlign: "left"}}>
                ACCOUNT
                </div>
                <br/>
                <div style={{textAlign: "left"}}>
                MY ACCOUNT
                </div>
                <div style={{textAlign: "left"}}>
                PERSONAL DATA
                </div>
                <div style={{textAlign: "left"}}>
                MY ORDERS
                </div>
                </div>
                <div className="col-sm-2 col-xs-12" style={{ marginTop: "30px"}}>
                <div style={{fontWeight: "bold", textAlign: "left"}}>
                ORDER & RETURNS
                </div>
                <br/>
                <div style={{textAlign: "left"}}>
                FAQ
                </div>
                <div style={{textAlign: "left"}}>
                CONTACT US
                </div>
                </div>
            </div>
        )
    }    
}

const mapStateToProps = (state) => {
  const auth = state.auth;
  return { authGlobal: auth };
}
export default connect(mapStateToProps, { onLogout, keepLogin })(Footer);
