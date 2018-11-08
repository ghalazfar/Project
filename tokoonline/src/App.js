import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'
import './App.css';
import AppInit from './components/AppInit';
import { keepLogin, cookiesChecked, getUserTransaction } from './actions'
import loadinggif from './supports/img/loading.gif';

const cookies = new Cookies()

class App extends Component {
  componentWillMount() {
    const loginCookies = cookies.get('loginCookies')
    if(loginCookies !== undefined) {
      this.props.keepLogin(loginCookies)
    }
    else {
        this.props.cookiesChecked()
    }
  }

  componentWillReceiveProps(newProps) { 
    if(newProps.auth.email === ""){
      cookies.remove('loginCookies')
    }
  }

  render() {
    console.log(this.props.transaction)
    if (this.props.auth.cookiesChecked){
      return (
        <AppInit className="App"/>
      );
    }
    return (
      <div className="App" style={{ display: "table", position: "absolute", width: "100%", height: "100%", left: "0", top: "0", backgroundColor: "white", overflowX: "hidden" }}>
        <div style={{ display: "table-cell", verticalAlign: "middle" }}>
          <img className="center" style={{ width: "150px" }} src={loadinggif}/>
        </div>        
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth }
}
export default withRouter(connect(mapStateToProps, { keepLogin, cookiesChecked, getUserTransaction })(App));

