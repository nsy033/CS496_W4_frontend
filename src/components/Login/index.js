import React, { Component } from 'react';
import axios from 'axios';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            url:'',
            provider: '',
            //token:'',
            
        }
    }

    
   
    // Kakao Login
    responseKakao = (res) => {
        this.setState({
            id: res.profile.id,
            name: res.profile.properties.nickname,
            // token: res.response.access_token,
            url:'',
            provider: 'kakao'
        })
        // if(res.response.access_token != null){
        //     axios.get('http://192.249.18.222:4000/auth',
        //         {
        //         parmas: {
        //             Authorization: res.response.access_token,
        //           //받아오는 response객체의 access_token을 통해 유저 정보를 authorize한다.     
        //         }
        //     }
        //     )
        //     .then((res)=> {
        //         console.log(res.response.access_token);
        //         })
        // }
        
       
        // fetch(`${this.state.url}/auth`, {
        //     //백엔드에서 원하는 형태의 endpoint로 입력해서 fetch한다. 
        //     method: 'GET',
        //     headers: {
        //       Authorization: res.response.access_token,
        //       //받아오는 response객체의 access_token을 통해 유저 정보를 authorize한다. 
             
        //     },
        //   })
        //     .then((res) => res.json())
        //     .then((res) => localStorage.setItem('token', res.token), 
        //           //백엔드에서 요구하는 key 값(token)으로 저장해서 localStorage에 저장한다.
        //           //여기서 중요한것은 처음에 console.log(res)해서 들어오는 
        //           //access_token 값을 백엔드에 전달해줘서 백엔드에 저장 해두는 
        //           //절차가 있으므로 까먹지 말 것!

        //           alert('로그인 성공하였습니다'))
        //           //alert(this.state.url)
        //     // .then(axios({
        //     //     method: 'post',
        //     //     url: "http://localhost:4000/auth/login",
        //     //     data: {
        //     //       firstName: 'Fred',
        //     //       lastName: 'Flintstone'
        //     //     }
        //     //   });
  
        this.doSignUp();
    }

    // Login Fail
    responseFail = (err) => {
        console.error(err);
        alert("login fail");
    }

    doSignUp = () => {
        const { id, name, provider } = this.state;

        window.sessionStorage.setItem('id', id);
        window.sessionStorage.setItem('name', name);
        window.sessionStorage.setItem('provider', provider);
        //this.props.onLogin();
        this.props.history.push('/colorselector');
        alert('로그인성공')
}

    render() {
        return (
            <div>
                
            <Container>
              
                <KakaoButton
                    jsKey={'977fac8044cec0f3b8c41ec3e3ac3ce6'}
                    buttonText="Kakao"
                    onSuccess={this.responseKakao}
                    onFailure={this.responseFail}
                    getProfile={true}
                    
                />
                
            </Container>
            
            </div>
        );
    }
}

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
`

const KakaoButton = styled(KakaoLogin)`
    padding: 0;
    width: 190px;
    height: 44px;
    line-height: 44px;
    color: #783c00;
    background-color: #FFEB00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`

export default Login;