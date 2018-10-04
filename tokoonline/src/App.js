import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProductList from './components/ProductList';
import Footer from './components/Footer';


class App extends Component {
  render() {
    return (
        <div className="App" style={{ overflowX: "hidden" }}>
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

export default App;

