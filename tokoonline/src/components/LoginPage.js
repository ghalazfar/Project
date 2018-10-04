import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onLogin } from '../actions' //import actioncreator
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
// import '../supports/css/login.css';

const cookies = new Cookies()

class LoginPage extends Component {
    // state = {
    //     authStatus: ""        
    // }

    //untuk cookies
    componentWillReceiveProps(newProps) { 
        if(newProps.authGlobal.username !== ""){
            cookies.set('myCat', newProps.authGlobal.email, { path: '/'})
        }
    }

    onLoginClick = () => {
        // var check = false
        // var Username = ''
        // var Email = ''
        // var loggedIn = false
        // for (var index in this.props.usersGlobal){
        //     if (this.props.usersGlobal[index].Email == this.refs.email.value && this.props.usersGlobal[index].Password == this.refs.password.value){
        //         check = true;
        //         Username = this.props.usersGlobal[index].Username
        //         Email = this.props.usersGlobal[index].Email
        //         loggedIn = true
        //         break;
        //     }
        // }
        // if (check == true) {
        //     //jalur component ke globalstate (AuthReducer)
        //     this.props.onLoginSuccess({ Username, Email, loggedIn}) //sekarang isi payload di action yaitu var tiga ini yg dideclare di atas
        //     console.log("masuk")
        //     this.setState({ redirect: true })
        // }

        var email= this.refs.email.value
        var password= this.refs.password.value

        this.props.onLogin({ email, password })
        // this.setState({ authStatus: "Wrong Email or Password!" })
    }

    render() {
        console.log(this.props.authGlobal.email)
        if (this.props.authGlobal.email === "") {
            console.log(this.props.authGlobal.email)
            return (
                <div className="login-background">
                    <div className="container">
                        <div className="card card-container">
                            <img className="profile-img-card" src="https://assets.change.org/photos/8/ac/aq/ouaCAQdZspeVZCl-128x128-noPad.jpg" alt="" />
                            {/* <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" /> */}
                            <p id="profile-name" className="profile-name-card"></p>
                            <form className="form-signin">
                                <span id="reauth-email" className="reauth-email"></span>
                                <input type="email" ref="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
                                <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                                <div id="remember" className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me"/> Remember me
                                    </label>
                                </div>
                                <input type="button" className="btn btn-lg btn-primary btn-block btn-signin" value="Sign in" onClick={this.onLoginClick}/>
                                <h3 className="label label-danger">{this.props.authGlobal.error}</h3>
                            </form>
                            <a href="#" className="forgot-password">
                                Forgot the password?
                            </a>                         
                        </div>
                    </div>
                </div>
            );
        }
        return <Redirect to='/' />
    }
}

// jalur global state ke propnya component:
const mapStateToProps = (state) => {
    // state: global state yg sudah dibikin di reducers
    // const users = state.users; //state.users isinya di /reducers/index.js
    const auth = state.auth;
    // return { usersGlobal: users, authGlobal: auth }; //bikin props usersGlobal yg isinya state.users
    return { authGlobal: auth };
}

export default connect(mapStateToProps, { onLogin })(LoginPage);
// connect() nge-return sebuah function
// connect(mapStateToProps)(LoginPage) ngebuat LoginPage memiliki props yg direturn di atas (usersGlobal dan authGlobal)
// di connect ditambah { onLoginSuccess } untuk ngisi state di AuthReducer dengan payload