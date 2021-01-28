import Header from '../Header';
import Intro from '../Intro';
import { Component } from 'react';
import { Route, Link, Router } from 'react-router-dom';
import './style.css';

class Mainpage extends Component {
    
    render() {
      
    document.body.style = 'background: #ffffff';
      return (
          <div  className="all">
            <Header  classname='header' />
            <Intro/>
            <img className="banner" src='./images/banner.png' height='80'/>
          </div>
      );
    }
  }
  
  export default Mainpage;