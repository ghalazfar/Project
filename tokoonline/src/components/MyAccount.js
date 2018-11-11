import React, { Component } from 'react';
import { 
    Button,
    Jumbotron
 } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux';
import queryString from 'query-string';
import { showLogin, getUserTransaction } from '../actions';
import tshirt from '../supports/img/tshirt.jpg';
import { API_URL_1 } from '../supports/api-url/apiurl';
import loadinggif from '../supports/img/loading.gif';

class MyAccount extends Component {
    render() {
        if (this.props.auth.email == ""){
            return <Redirect to='/' />
        }
        return(
            <div className="container">
                <Jumbotron className="col-xs-12">
                <h2 className="col-sm-9 col-xs-12">Welcome {this.props.auth.username}</h2>
                <Button className="col-sm-3 col-xs-12" >EDIT ACCOUNT INFORMATION</Button>
                </Jumbotron>
                <Link to="/orders">
                    <Jumbotron className="col-sm-5 col-xs-12">
                    <h2>Order History</h2>
                    </Jumbotron>
                </Link>
                <div className="col-sm-2 hidden-xs"></div>
                <Link to="/address">
                    <Jumbotron className="col-sm-5 col-xs-12">
                    <h2>Shipping Adrresses</h2>
                    </Jumbotron>
                </Link>
                <Link to="/admin">
                    <Jumbotron className="col-xs-12">
                    <h2>Administration</h2>
                    </Jumbotron>
                </Link>               
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth, loginform: state.loginform }
}
export default connect(mapStateToProps, { showLogin, getUserTransaction })(MyAccount);
  
