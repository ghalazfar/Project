import React, { Component } from 'react';
import { 
    Panel,
    PanelGroup,
    ListGroup,
    ListGroupItem
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onLogout, keepLogin } from '../actions';
import logo from '../supports/img/logo.png';

const cookies = new Cookies()

class Header extends Component {    
    render() {
        return(
            <div className="container-fluid">
                <div className="col-sm-3 col-xs-12">
                    <PanelGroup accordion id="accordion-example">
                        <Panel eventKey="1">
                            <Panel.Heading>
                            <Panel.Title toggle>Collapsible Group Item #1</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                            <ListGroup style={{ margin: "-16px" }}>
                                <ListGroupItem>Item 1</ListGroupItem>
                                <ListGroupItem>Item 2</ListGroupItem>
                                <ListGroupItem>&hellip;</ListGroupItem>
                            </ListGroup>
                            </Panel.Body>
                        </Panel>
                        <Panel eventKey="2">
                            <Panel.Heading>
                            <Panel.Title toggle>Collapsible Group Item #2</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                            <ListGroup style={{ margin: "-16px" }}>
                                <ListGroupItem>Item 1</ListGroupItem>
                                <ListGroupItem>Item 2</ListGroupItem>
                                <ListGroupItem>&hellip;</ListGroupItem>
                            </ListGroup>
                            </Panel.Body>
                        </Panel>
                        <Panel eventKey="3">
                            <Panel.Heading>
                            <Panel.Title toggle>Collapsible Group Item #3</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                            <ListGroup style={{ margin: "-16px" }}>
                                <ListGroupItem>Item 1</ListGroupItem>
                                <ListGroupItem>Item 2</ListGroupItem>
                                <ListGroupItem>&hellip;</ListGroupItem>
                            </ListGroup>
                            </Panel.Body>
                        </Panel>
                    </PanelGroup>
                </div>
            </div>
        )
    }    
}

const mapStateToProps = (state) => {
  const auth = state.auth;
  return { authGlobal: auth };
}
export default connect(mapStateToProps, { onLogout, keepLogin })(Header);
