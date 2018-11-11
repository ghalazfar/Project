import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Footer from './Footer';
import Search from './Search';
import MyAccount from './MyAccount';
import Profile from './Profile';
import Orders from './Orders';
import Address from './Address';
import Admin from './Admin';
import Error404 from './Error404';

class AppInit extends Component {
  render() {
    return (
        <div style={{ overflow: "hidden" }}>
          <Header/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/productlist" component={ProductList}/>
            <Route path="/productdetail" component={ProductDetail}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/search" component={Search}/>
            <Route path="/myaccount" component={MyAccount}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/address" component={Address}/>
            <Route path="/admin" component={Admin}/>
            <Route component={Error404}/>
          </Switch>
          <Footer/>
        </div>
    );
  }
}

export default AppInit;

