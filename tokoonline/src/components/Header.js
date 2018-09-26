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

class Header extends Component {
    componentWillMount() { 
        const cookiesNya = cookies.get('myCat')
        if(cookiesNya !== undefined) {
            this.props.keepLogin(cookiesNya)
        }
    }

    onLogOutClick = () => {
        this.props.onLogout();
    }

    componentWillReceiveProps(newProps) { 
        if(newProps.authGlobal.username === ""){
            cookies.remove('myCat')
        }
    }

    AccountBar = () => {
        if(this.props.authGlobal.email != "") {
            return (
                <SplitButton title="MY ACCOUNT">
                    <MenuItem eventKey={1.1}>Personal data</MenuItem>
                    <MenuItem eventKey={1.2}>Payment Setting</MenuItem>
                    <MenuItem eventKey={1.3}>My orders</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={1.4} onSelect={this.onLogOutClick}>Logout</MenuItem>
                </SplitButton>
            )
        }
        return (
            <Link to="/login"><Button>Login</Button></Link>
        )
    }

    renderNavbar() {
        return(
            <div className="container-fluid" style={{marginLeft: "-15px", marginRight: "-15px" }}>
                <Navbar collapseOnSelect>
                    <div style={{marginTop: "15px", marginBottom: "15px" }}>
                        <Navbar.Header>
                        <div className="col-sm-12 col-xs-8">              
                            <img className="img-responsive" alt="" src={logo}/>
                        </div>
                            <Navbar.Toggle style={{ position: "relative", bottom: "10px"}} />
                        </Navbar.Header>
                        <div className="col-lg-5 col-lg-push-2 col-md-5 col-md-push-1 col-sm-8 col-xs-12">
                            <FormGroup>
                                <InputGroup>
                                <FormControl type="text" placeholder="Search items..." />
                                <InputGroup.Button>
                                    <Button>SEARCH</Button>
                                </InputGroup.Button>                      
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div style={{marginRight: "75px"}}>
                            <Nav pullRight className="col-lg-1 col-lg-push-0 col-md-push-1 col-sm-2 col-sm-push-0 col-xs-6 col-xs-push-2">
                                <Button className="btn btn-success">
                                    <span class="badge">24</span>  CART                  
                                </Button>                                
                            </Nav>
                            <Nav pullRight className="col-lg-1 col-lg-push-0 col-md-push-1 col-sm-2 col-sm-push-0 col-xs-6 col-xs-push-4">
                                {this.AccountBar()}
                            </Nav>                                
                        </div>                        
                        <div className="col-lg-7 col-lg-push-3 col-md-8 col-md-push-3 col-xs-12">
                            <Navbar.Collapse>
                                <Nav>
                                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                        <MenuItem eventKey={3.1}>Action</MenuItem>
                                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                    </NavDropdown>
                                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                        <MenuItem eventKey={3.1}>Action</MenuItem>
                                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                    </NavDropdown>
                                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                        <MenuItem eventKey={3.1}>Action</MenuItem>
                                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                    </NavDropdown>
                                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                        <MenuItem eventKey={3.1}>Action</MenuItem>
                                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                    </NavDropdown>
                                    <NavItem eventKey={1}>
                                        <Link to="">Special Offers</Link>
                                    </NavItem>
                                </Nav>
                            </Navbar.Collapse>                   
                        </div>
                    </div>
                </Navbar>
            </div>  
        )
    }
    render() {
        return(
            this.renderNavbar()
        )
    }    
}

const mapStateToProps = (state) => {
  const auth = state.auth;
  return { authGlobal: auth };
}
export default connect(mapStateToProps, { onLogout, keepLogin })(Header);
