import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import { Component } from 'react';
import styled from 'styled-components';
import Login from '../Login';

class Header extends Component {
    render () {

        const Wrapper = styled.div`
        height: 50px;
        width: 100%;
        /* 색상 */
        background: rgba(251, 250, 252, 0.9);
        box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);
    
    `;

        return(
            <Wrapper className="header">
            <div>
                {/* <img className = 'logo' src = "/images/logo.png" height='40px'></img> */}
                <div className="headerMenu">
                        <a><Link to={`/`}>MAIN</Link></a>
                        <a><Link to={`/productselector`}>CUSTOMIZE</Link></a>
                        <a><Link to={`/designs`}>BOARD</Link></a>
                        <a><Link to={`/mypage`}>MYPAGE</Link></a>
                        {/* <a><Link to={`/designs`}>LOGIN</Link></a> */}
                        {/* <a><Login/></a> */}
                </div>
            </div>

            </Wrapper>
        )
    }
}
export default Header;