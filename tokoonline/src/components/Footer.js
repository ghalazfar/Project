import React, { Component } from 'react';
import { 
    Panel
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
            <Panel style={{ marginTop: "50px", marginBottom: "0", borderBottom: "none" }}>
                <Panel.Body>
                    <div style={{ marginTop: "15px", marginBottom: "200px"}}>
                    <div className="col-sm-offset-4 col-sm-2 col-xs-12">
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
                    <div className="col-sm-2 col-xs-12">
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
                </Panel.Body>
            </Panel>
            
        )
    }    
}

const mapStateToProps = (state) => {
  const auth = state.auth;
  return { authGlobal: auth };
}
export default connect(mapStateToProps, { onLogout, keepLogin })(Footer);
