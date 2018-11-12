import React, { Component } from 'react';
import { 
    Button,
    Jumbotron
 } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { showLogin, getUserTransaction } from '../actions';

class MyAccount extends Component {
    renderAdmin = () => {
        if (this.props.auth.status == 'admin') {
            return (
                <Link to="/admin">
                    <Jumbotron className="col-xs-12">
                    <h2>Administration</h2>
                    </Jumbotron>
                </Link>   
            )
        }
    }

    render() {
        console.log(this.props.auth.status)
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
                {this.renderAdmin()}            
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth, loginform: state.loginform }
}
export default connect(mapStateToProps, { showLogin, getUserTransaction })(MyAccount);
  
