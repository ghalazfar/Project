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
    Modal
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { 
    onLogin, 
    onLogout,
    onRegister,
    categorySelect, 
    cookiesChecked
 } from '../actions';
import logo from '../supports/img/logo.png';

const cookies = new Cookies()

class Header extends Component {
    state = {
        showLogin: false,
        showRegister: false
    }
    
    componentWillReceiveProps(newProps) {
        if(newProps.authGlobal.email !== ""){
            cookies.set('loginCookies', newProps.authGlobal.email, { path: '/'})
        }
    }

    closeLogin = () => {
        this.setState({ showLogin: false })
    }

    openLogin = () => {
        this.setState({ showLogin: true })
    }

    closeRegister = () => {
        this.setState({ showRegister: false })
    }

    openRegister = () => {
        this.setState({ showLogin: false, showRegister: true })
    }

    onRegisterBackLink = () => {
        this.setState({ showLogin: true, showRegister: false })
    }

    onLoginClick = () => {
        var email= this.refs.emailLogin.value
        var password= this.refs.passwordLogin.value
        this.props.onLogin({ email, password })
        this.setState({ showLogin: false })
    }

    onRegisterClick = () => {
        this.props.onRegister({
            username: this.refs.usernameRegister.value,
            email: this.refs.emailRegister.value,
            password: this.refs.passwordRegister.value,
        })
        this.setState({ showRegister: false })
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
                    <Link to='/cart'>
                        <Button className="btn btn-success" style={{ marginLeft: "30px", padding: "0px", paddingRight: "40px"}}>
                        <span className="badge" style={{ fontWeight: "bold", fontSize: "large", marginLeft: "-16px"}}>24</span><span style={{ fontWeight: "bold", fontSize: "small", marginLeft: "20px", marginRight: "-10px"}}>CART</span>                  
                        </Button>
                    </Link>  
                </Navbar.Text>
            )
        }
        return (
            <Navbar.Text >
                <Navbar.Link href='#' onClick={this.openLogin} style={{ fontSize: "small", marginLeft: "113px"}}>Login</Navbar.Link>
                <Link to='/cart'>
                    <Button className="btn btn-success" style={{ marginLeft: "30px", padding: "0px", paddingRight: "40px"}}>
                        <span className="badge" style={{ fontWeight: "bold", fontSize: "large", marginLeft: "-16px" }}>0</span><span style={{ fontWeight: "bold", fontSize: "small", marginLeft: "20px", marginRight: "-10px"}}>CART</span>                  
                    </Button>
                </Link>
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
                        <input type="email" class="form-control" ref="emailLogin"/>
                    </div>
                    <div class="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" class="form-control" ref="passwordLogin"/>
                    </div>
                        <div>
                        <input type="button" className="btn btn-primary" style={{ fontWeight: "bold", paddingLeft: "30px", paddingRight: "30px" }} value="LOG IN" onClick={this.onLoginClick}/>
                        <a href='#' className="pull-right" style={{ fontSize: "x-small", fontWeight: "bold", textAlign: "right", marginTop: "15px" }}>FORGOT YOUR PASSWORD?</a>
                        </div>
                        <div>
                        <input type="checkbox" style={{ marginTop: "15px", marginBottom: "15px" }}/> Remember me
                        </div>
                        <input type="button" className="btn btn-primary btn-block" style={{ fontWeight: "bold" }} value="CREATE AN ACCOUNT" onClick={this.openRegister}/>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

    renderRegister = () => {
        return(
            <Modal show={this.state.showRegister} onHide={this.closeRegister}>
                <Modal.Body>
                    <img className="img-responsive" style={{ margin: "auto"}} alt="" src={logo}/>
                    <h3>Create an Account</h3>
                    <form>
                    <div class="form-group">
                        <label>Email address:</label>
                        <input type="email" class="form-control" ref="emailRegister"/>
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <input type="password" class="form-control" ref="passwordRegister"/>
                    </div>
                    <div class="form-group">
                        <label>Confirm your password:</label>
                        <input type="password" class="form-control" ref="passwordconfirmation"/>
                    </div>
                    <div class="form-group">
                        <label>Username:</label>
                        <input type="text" class="form-control" ref="usernameRegister"/>
                    </div>
                    <div>
                        <input type="checkbox" style={{ marginBottom: "15px" }}/> I accept the Terms of Use and I agree with the Privacy Policy.
                    </div>
                    <div>
                        <input type="button" className="btn btn-primary" style={{ fontWeight: "bold", paddingLeft: "30px", paddingRight: "30px" }} value="CREATE ACCOUNT" onClick={this.onRegisterClick}/>
                        <a href='#' className="pull-right" style={{ fontSize: "x-small", fontWeight: "bold", textAlign: "right", marginTop: "15px" }} onClick={this.onRegisterBackLink}>BACK</a>
                    </div>
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
                                        <MenuItem><Link to="/productlist?cat=1&catdetail=1" onClick={() => this.props.categorySelect([1,1])}>Outerwear</Link></MenuItem>
                                        <MenuItem><Link to="/productlist?cat=1&catdetail=2" onClick={() => this.props.categorySelect([1,2])}>Tops</Link></MenuItem>
                                        <MenuItem><Link to="/productlist?cat=1&catdetail=3" onClick={() => this.props.categorySelect([1,3])}>Bottoms</Link></MenuItem>
                                        <MenuItem><Link to="/productlist?cat=1&catdetail=4" onClick={() => this.props.categorySelect([1,4])}>Shoes</Link></MenuItem>
                                    </NavDropdown>
                                    <NavDropdown title="Women">
                                        <MenuItem><Link to="/productlist?cat=2&catdetail=5" onClick={() => this.props.categorySelect([2,5])}>Outerwear</Link></MenuItem>
                                        <MenuItem><Link to="/productlist?cat=2&catdetail=6" onClick={() => this.props.categorySelect([2,6])}>Tops</Link></MenuItem>
                                        <MenuItem><Link to="/productlist?cat=2&catdetail=7" onClick={() => this.props.categorySelect([2,7])}>Bottoms</Link></MenuItem>
                                        <MenuItem><Link to="/productlist?cat=2&catdetail=8" onClick={() => this.props.categorySelect([2,8])}>Shoes</Link></MenuItem>
                                    </NavDropdown>
                                    <NavDropdown title="Accessories">
                                        <MenuItem><Link to="/productlist?cat=3&catdetail=9" onClick={() => this.props.categorySelect([3,9])}>Rings</Link></MenuItem>
                                        <MenuItem><Link to="/productlist?cat=3&catdetail=10" onClick={() => this.props.categorySelect([3,10])}>Necklaces</Link></MenuItem>
                                        <MenuItem><Link to="/productlist?cat=3&catdetail=11" onClick={() => this.props.categorySelect([3,11])}>Hats</Link></MenuItem>
                                        <MenuItem><Link to="/productlist?cat=3&catdetail=12" onClick={() => this.props.categorySelect([3,12])}>Bags</Link></MenuItem>
                                    </NavDropdown>
                                    <NavItem>
                                        <Link to="">Placeholder</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="">Special Offers</Link>
                                    </NavItem>
                                </Nav>
                            </Navbar.Collapse>                   
                        </div>
                    </div>
                </Navbar>
                {this.renderLogin()}
                {this.renderRegister()}
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
  return { authGlobal: state.auth };
}
export default connect(mapStateToProps, { onLogin, onLogout, onRegister, categorySelect, cookiesChecked })(Header);
