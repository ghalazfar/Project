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
    Modal,
    ControlLabel
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogin, onLogout, keepLogin, categorySelect, cookiesChecked } from '../actions';
import logo from '../supports/img/logo.png';

class Header extends Component {
    state = {
        selectedCategory: "",
        showLogin: false
    }
    
    componentWillReceiveProps(newProps) { 
        if(newProps.authGlobal.email !== ""){
            this.setState({ showLogin: false })
        }
    }

    onLoginClick = () => {
        var email= this.refs.email.value
        var password= this.refs.password.value
        this.props.onLogin({ email, password })
    }

    closeLogin = () => {
        this.setState({ showLogin: false })
    }

    openLogin = () => {
        this.setState({ showLogin: true })
    }

    onLoginClick = () => {
        var email= this.refs.email.value
        var password= this.refs.password.value
        this.props.onLogin({ email, password })
    }

    onLogOutClick = () => {
        this.props.onLogout();
    }

    AccountBar = () => {
        if(this.props.authGlobal.email != "") {
            return (
                <Navbar.Text style={{marginTop: "20px"}}>
                    <Link to='/myaccount'style={{ fontSize: "small" }} >MY ACCOUNT</Link>
                    <Navbar.Link href='#' onClick={this.onLogOutClick} style={{ fontSize: "small", marginLeft: "20px" }} >Logout</Navbar.Link>
                    <Button className="btn btn-success" style={{ marginLeft: "30px", padding: "0px", paddingRight: "40px"}}>
                    <span className="badge" style={{ fontWeight: "bold", fontSize: "large", marginLeft: "-16px"}}>24</span><span style={{ fontWeight: "bold", fontSize: "small", marginLeft: "20px", marginRight: "-10px"}}>CART</span>                  
                    </Button>  
                </Navbar.Text>
            )
        }
        return (
            <Navbar.Text >
                <Navbar.Link href='#' onClick={this.openLogin} style={{ fontSize: "small", marginLeft: "113px"}}>Login</Navbar.Link>
                <Button className="btn btn-success" style={{ marginLeft: "30px", padding: "0px", paddingRight: "40px"}}>
                    <span className="badge" style={{ fontWeight: "bold", fontSize: "large", marginLeft: "-16px"}}>0</span><span style={{ fontWeight: "bold", fontSize: "small", marginLeft: "20px", marginRight: "-10px"}}>CART</span>                  
                </Button>
            </Navbar.Text>
        )
    }

    renderLogin = () => {
        return(
            <Modal show={this.state.showLogin} onHide={this.closeLogin}>
                <Modal.Body>
                    <img className="img-responsive" style={{ margin: "auto"}} alt="" src={logo}/>
                    <h3>Log in to your account</h3>
                    <form>
                    <div class="form-group">
                        <label for="email">Email address:</label>
                        <input type="email" class="form-control" ref="email"/>
                    </div>
                    <div class="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" class="form-control" ref="password"/>
                    </div>
                        <div>
                        <input type="button" className="btn btn-primary" style={{ fontWeight: "bold", paddingLeft: "30px", paddingRight: "30px" }} value="LOG IN" onClick={this.onLoginClick}/>
                        <a href='#' className="pull-right" style={{ fontSize: "x-small", fontWeight: "bold", textAlign: "right", marginTop: "15px" }}>FORGOT YOUR PASSWORD?</a>
                        </div>
                        <div>
                        <input type="checkbox" style={{ marginTop: "15px", marginBottom: "15px" }}/> Remember me
                        </div>
                        <input type="button" className="btn btn-primary btn-block" style={{ fontWeight: "bold" }} value="CREATE AN ACCOUNT" />
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

    renderNavbar() {
        return(
            <div fluid={true} staticTop={true}>
                <Navbar collapseOnSelect>
                    <div >
                        <Navbar.Header style={{ marginTop: "8px" }}>
                        <Link to="/"><div className="col-sm-12 col-xs-8">              
                            <img className="img-responsive" alt="" src={logo}/>
                        </div>
                        </Link>
                            <Navbar.Toggle style={{ bottom: "8px"}} />                            
                        </Navbar.Header>
                        <div style={{ marginTop: "8px" }} className="col-lg-6 col-lg-push-1 col-md-4 col-md-push-1 col-sm-8 col-xs-12">
                            <FormGroup>
                                <InputGroup>
                                <FormControl type="text" placeholder="Search items..." />
                                <InputGroup.Button>
                                    <Button style={{ fontWeight: "bold"}}>SEARCH</Button>
                                </InputGroup.Button>                      
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div className="container" >
                            <Nav pullRight style={{marginTop: "-3px", marginLeft: "7px"}} className="col-lg-4 col-lg-push-1 col-md-5 col-md-push-1 col-sm-8 col-xs-12">
                                {this.AccountBar()}                                
                            </Nav>                                
                        </div>                        
                        <div className="col-lg-7 col-lg-push-3 col-md-8 col-md-push-3 col-xs-12">
                            <Navbar.Collapse>
                                <Nav>
                                    <NavDropdown title="Men">
                                        <MenuItem><Link to="/">Outerwear</Link></MenuItem>
                                        <MenuItem>Tops</MenuItem>
                                        <MenuItem>Bottom</MenuItem>
                                        <MenuItem>Shoes</MenuItem>
                                    </NavDropdown>
                                    <NavDropdown eventKey={3} title="Women" id="basic-nav-dropdown">
                                        <MenuItem eventKey={3.1}>Action</MenuItem>
                                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                    </NavDropdown>
                                    <NavDropdown eventKey={3} title="Accessories" id="basic-nav-dropdown">
                                        <MenuItem eventKey={3.1}>Action</MenuItem>
                                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                    </NavDropdown>
                                    <NavDropdown eventKey={3} title="Placeholder" id="basic-nav-dropdown">
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
                {this.renderLogin()}
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
  return { authGlobal: state.auth, selectedCategory: state.selectedCategory };
}
export default connect(mapStateToProps, { onLogin, onLogout, keepLogin, categorySelect, cookiesChecked })(Header);
