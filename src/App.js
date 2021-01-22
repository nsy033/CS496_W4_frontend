//import logo from './logo.svg';
import './App.css';
//import { Component } from 'react';
import ColorSelector from './components/ColorSelector';
import CustomizePage from './components/CustomizePage';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import BackgroundImage from './components/BackgroundImage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ColorSelector}/>
        <Route path="/customize/" component={CustomizePage}/>
        <Route path="/backgroundimage" component={BackgroundImage}/>
        <Route path="/customize/:myColor" component={CustomizePage}/>
        <Redirect to="/"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
