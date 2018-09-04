import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AlbumList from './components/AlbumList';
import MovieList from './components/MovieList';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MovieManage from './components/MovieManage';


class App extends Component {
  render() {
    return (
        <div className="App">
          <Header/>            
          <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/albumlist" component={AlbumList}/>
          <Route path="/movielist" component={MovieList}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/moviemanage" component={MovieManage}/>
          </div>  
        </div>
    );
  }
}

export default App;

