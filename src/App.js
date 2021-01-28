//import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainPage from './components/MainPage';
import ModeSelect from './components/ModeSelect';
import ProductSelector from './components/ProductSelector';
import ColorSelector from './components/ColorSelector';
import CustomizePage from './components/CustomizePage';
import Login from './components/Login';
import Test from './components/Test';
import DesignCapture from './components/DesignCapture';
import Pendraw from './components/Pendraw';
import DesignsView from './components/DesignsView';
import Mypage from './components/MyPage';


class App extends Component{
  constructor(props){
    super(props)
    this.state={
      logged:false,
      onLogin:this.onLogin,
      onLogout: this.onLogout
    }
  }
  onLogin = ()=> {
    this.setState({
      logged:true
    });

   
  }

  onLogout = () => {
    this.setState({
      logged:false
    });
    const provider = window.sessionStorage.getItem('provider');   
    if(provider === 'kakao'){
      window.Kakao.Auth.logout(function() {
        console.log("Kakao logout");
      });
    }
    //SessionStorage Clear
    window.sessionStorage.clear();
  }

  
  componentDidMount() {
    const id = window.sessionStorage.getItem('id');
    if(id) {
      this.onLogin();
    }
    else {
      this.onLogout();
    }
  }


  render(){
    const { logged, onLogout} = this.state;

    return(
      <BrowserRouter>

      <Switch>
      
        <Route path="/" exact component={MainPage}/>
        <Route path="/modeselect" component={ModeSelect}/>
        <Route path="/productselector" component={ProductSelector}/>
        <Route path="/colorselector/:item" component={ColorSelector}/>
        <Route path="/customize/" component={CustomizePage}/>
        <Route path="/customize/:myColor" component={CustomizePage}/>
        <Route path="/customize/:myColor/:item" component={CustomizePage}/>
        <Route path="/test" component={Test}/>
        <Route path="/pendraw" component={Pendraw}/>
        <Route path="/mypage" component={Mypage}/>
        <Route path="/designs" component={DesignsView}/>
        {/* <Route path="/login/" component={Login}/> */}
        
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
    );
  }
}

export default App;