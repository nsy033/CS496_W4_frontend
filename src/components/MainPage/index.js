import Header from '../Header';
import Intro from '../Intro';
import { Component } from 'react';
import { Route, Link, Router } from 'react-router-dom';
import './style.css';

class Mainpage extends Component {
    
    render() {
      return (
          <div  className="all">
            <Header changeState={this.props.changeState} classname='header' />
            <Intro/>
          </div>
      );
    }
  }
  
  export default Mainpage;