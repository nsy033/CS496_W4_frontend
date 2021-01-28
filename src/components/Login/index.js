import React, { Component } from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            url:'',
            email: '',
            provider: ''
        }
    }
   
    // Kakao Login
    responseKakao = (res) => {
        this.setState({
            id: res.profile.id,
            name: res.profile.properties.nickname,
            // token: res.response.access_token,
            email: res.profile.kakao_account.email,
            url:'',
            provider: 'kakao'
        })
        this.doSignUp();
    }

    // Login Fail
    responseFail = (err) => {
        console.error(err);
        alert("login fail");
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
        alert('로그인성공')
    }

    render() {
        return (
            <div>
            <Container>
                <KakaoButton
                    jsKey={'77c070f53ef6ae85556363c4e22dacfe'}
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