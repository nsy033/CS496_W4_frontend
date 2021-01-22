//import logo from './logo.svg';
import './App.css';
//import { Component } from 'react';
import ColorPick from './components/ColorPick';
import CustomizePage from './components/CustomizePage';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ColorPick}/>
        <Route path="/customize" exact component={CustomizePage}/>
        <Redirect to="/"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
