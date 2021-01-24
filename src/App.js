//import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import ColorSelector from './components/ColorSelector';
import CustomizePage from './components/CustomizePage';
import Login from './components/Login';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import BackgroundImage from './components/BackgroundImage';



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
        <Route path="/" exact component={Login}/>
        <Route path="/customize/" component={CustomizePage}/>
        <Route path="/backgroundimage" component={BackgroundImage}/>
        <Route path="/customize/:myColor" component={CustomizePage}/>
        <Route path="/colorselector" component={ColorSelector}/>
        {/* <Route path="/login/" component={Login}/> */}
        
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
    );
  }
}


// function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/" exact component={ColorSelector}/>
//         <Route path="/customize/" component={CustomizePage}/>
//         <Route path="/backgroundimage" component={BackgroundImage}/>
//         <Route path="/customize/:myColor" component={CustomizePage}/>
//         <Route path="/login/" component={Login}/>
        
//         <Redirect to="/" />
//       </Switch>
//     </BrowserRouter>
//   );
// }

export default App;

// import axios from "axios";
// import React, { useState, useEffect} from 'react';
// const App = () => {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     const getData = async () => {
//       const datas = await axios.get("http://192.249.18.222:4000/testcrawling/all");
//       setData(datas.data);
//     };
//     getData();
//   }, []);
//   useEffect(() => {
//     console.log(data);
//   }, [data]);
//   if (data === null) {
//     return <div>Load..</div>;
//   } else {
//     console.log(data);
//     return (
//       <div>
//         {data.map((ele) => (
//           <>
//             <div>
//               현재 {ele.text}의 현황 : 
//             </div>
//             <br />
//           </>
//         ))}
//       </div>
//     );
//   }
// };
// export default App;