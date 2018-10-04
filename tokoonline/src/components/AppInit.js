import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProductList from './ProductList';
import Footer from './Footer';


class AppInit extends Component {
  render() {
    return (
        <div style={{ overflowX: "hidden" }}>
          <Header/>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/productlist" component={ProductList}/>
          <Footer/>
        </div>
    );
  }
}

export default AppInit;

