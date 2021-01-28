import React, { Component, Button } from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import axios from 'axios';
import { rgbToHex } from '@material-ui/core';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            url:'',
            email: '',
            provider: '',
            login:false,
            text:'LOGIN',
            show: true
        }
        // this.inandout = this.inandout.bind(this);
    }
    // Kakao Login
    responseKakao = (res) => {
        this.setState({
            id: res.profile.id,
            name: res.profile.properties.nickname,
            email: res.profile.kakao_account.email,
            provider: 'kakao'
        })
        this.doSignUp();
    }
    // Login Fail
    responseFail = (err) => {
        console.error(err);
        alert("login fail");
        this.setState({login:true});
        this.setState({text:"LOGIN"});
    }
    doSignUp = () => {
        const { id, name, provider, email } = this.state;
        window.sessionStorage.setItem('id', id);
        window.sessionStorage.setItem('name', name);
        window.sessionStorage.setItem('provider', provider);
        window.sessionStorage.setItem('email', email);
        //this.props.onLogin();
        axios.get("http://192.249.18.241:4000/user/login/"+String(email)).then(
            (res)=>{
                console.log(res.data);
                if(res.data.exist === false) {
                    const sendState = {
                        exist: true,
                        email: email,
                        liked: []
                    }
                    debugger;
                    axios.post('http://192.249.18.241:4000/user/add', sendState)
                    .then(response=>{console.log(response)})
                    .catch(error =>{
                        console.log(error)
                    })
                }
                debugger;
            }
        )
        .catch(function (error) {
            console.log(error);
        });
        // document.location.href = "/modeselect";
        // this.props.history.push('/modeselect');
        this.setState({show:false});
        console.log(this.state.text);
        this.setState({login:true});
        // alert('로그인성공');
    }
    render() {
        return (
            this.state.show?
            <div>
            <Container>
                <KakaoLogin
                    jsKey={'77c070f53ef6ae85556363c4e22dacfe'}
                    onSuccess={this.responseKakao}
                    onFailure={this.responseFail}
                    getProfile={true}
                    className="KakaoLogin"
                    style={{height:40, backgroundColor:"#00000000", border:0, outline:0}}
                >
                    <p  style={{fontSize:15.4, fontFamily:'Nanum Gothic', color: "#8E8992", fontWeight:500  }}>{this.state.text}</p>
                </KakaoLogin>
            </Container>
            </div>
            :null
        );
    }
}
const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
`
const KakaoButton = styled(KakaoLogin)`
    padding: 0;
    width: 0px;
    height: 4px;
    line-height: 44px;
    color: #783C00;
    background-color: #FFEB00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 1px;
    font-weight: bold;
    text-align: center;
`
export default Login;