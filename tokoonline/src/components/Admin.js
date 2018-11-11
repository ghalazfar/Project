import React, { Component } from 'react';
import { 
    Panel,
    Thumbnail,
    Button,
    ButtonToolbar,
    ToggleButtonGroup,
    ToggleButton,
    Tooltip,
    Tabs,
    Tab
 } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux';
import queryString from 'query-string';
import { showLogin, getUserTransaction } from '../actions';
import tshirt from '../supports/img/tshirt.jpg';
import { API_URL_1 } from '../supports/api-url/apiurl';
import loadinggif from '../supports/img/loading.gif';

class Admin extends Component {
    state = {
        productList: [],
        userList: [],
        transactionList: []     
    }
    
    componentWillMount(){
        axios.get(API_URL_1 + '/admin'
        ).then(res => {      
        this.setState({ productList: res.data.productList, userList: res.data.userList, transactionList: res.data.transactionList })      
      })
    }

    render() {
        console.log(this.state)
        if (this.props.auth.status == 'admin') {
            return(
                <div className="container">
                    <Tabs defaultActiveKey={1} justified animation={false} >
                        <Tab eventKey={1} title="Description">
                        <Panel style={{ marginTop: "-1px" }}>
                                <Panel.Body>
                                    tes
                                </Panel.Body>
                            </Panel>
                        </Tab>
                        <Tab eventKey={2} title="Size Chart">
                            Tab 2 content
                        </Tab>
                    </Tabs>
                </div>
            )
        }
        return <Redirect to='/' />
    }    
}

const mapStateToProps = (state) => {
    return { auth: state.auth, loginform: state.loginform }
}
export default connect(mapStateToProps, { showLogin, getUserTransaction })(Admin);
  
