import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Footer from './Footer';

class AppInit extends Component {
  render() {
    return (
        <div style={{ overflow: "hidden" }}>
          <Header/>
          <Route exact path="/" component={HomePage}/>
          <Route path="/productlist" component={ProductList}/>
          <Route path="/productdetail" component={ProductDetail}/>
          <Route path="/cart" component={Cart}/>
          <Footer/>
        </div>
    );
  }
}

export default AppInit;

