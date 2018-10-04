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
import { onLogout, keepLogin, categorySelect } from '../actions';
import logo from '../supports/img/logo.png';

const cookies = new Cookies()

class Header extends Component {
    state = {
        selectedCategory: ""
    }

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
                <Navbar.Text style={{marginTop: "21px"}}>
                    <Link to='/myaccount'style={{ fontSize: "small" }} >MY ACCOUNT</Link>
                    <Navbar.Link href='/logout' onClick={this.onLogOutClick} style={{ fontSize: "small", marginLeft: "20px" }} >Logout</Navbar.Link>
                    <Button className="btn btn-success" style={{ marginLeft: "20px"}}>
                        <span class="badge">24</span>  <span style={{ fontWeight: "bold", fontSize: "small" }}>CART</span>                  
                    </Button>  
                </Navbar.Text>
            )
        }
        return (
            <Navbar.Text >
                <Navbar.Link style={{ fontSize: "small", marginLeft: "115px"}} href='/login'><Link to="/login">Login</Link></Navbar.Link>
                <Button className="btn btn-success" style={{ marginLeft: "20px"}}>
                    <span class="badge">0</span>  <span style={{ fontWeight: "bold", fontSize: "small"}}>CART</span>                  
                </Button>
            </Navbar.Text>
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
                        <div style={{ marginTop: "8px" }} className="col-lg-6 col-lg-push-1 col-md-5 col-md-push-1 col-sm-8 col-xs-12">
                            <FormGroup>
                                <InputGroup>
                                <FormControl type="text" placeholder="Search items..." />
                                <InputGroup.Button>
                                    <Button>SEARCH</Button>
                                </InputGroup.Button>                      
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div className="container" >
                            <Nav pullRight style={{marginTop: "-13px"}} className="col-lg-4 col-lg-push-1 col-md-4 col-md-push-1 col-sm-8 col-xs-12">
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
export default connect(mapStateToProps, { onLogout, keepLogin, categorySelect })(Header);
