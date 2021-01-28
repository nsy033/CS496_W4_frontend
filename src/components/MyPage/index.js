import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Design from '../Design';
import mydesigns from './mydesigns.png';
import liked from './liked.png';
import Header from '../Header';
import logout_btn from './logout.png';
import './style.css';

const styles = theme => ({
  root: {
    padding: theme.spacing(5),
    background: '#eeeeee'
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
});

function DesignsView (props) {
    const [designInfo, setDesignInfo] = useState([]);
    const [likedInfo, setLikedInfo] = useState([]);

    const logout = event => {
       window.sessionStorage.clear();
       window.location.href='/';
    };

    useEffect( async()=>{
        // axios.get("http://192.249.18.241:4000/design/all").then(
            console.log(window.sessionStorage.getItem('name'));
            await axios.get("http://192.249.18.241:4000/design/mypage/"+String(window.sessionStorage.getItem('name'))).then(
            (res)=> {
                // designInfo=res.data;
                setDesignInfo(res.data);
                console.log(res.data);
                console.log('design ',designInfo);
                // debugger;
            }
        )
        .catch(function (error) {
            console.log(error);
        })
        .then(
            axios.get("http://192.249.18.241:4000/user/check/"+String(window.sessionStorage.getItem('email'))).then(
            (res)=>{
                setLikedInfo(res.data.liked);
                // likedInfo=res.data;
                console.log(res.data.liked);
                console.log('liked ', likedInfo);
                // debugger;
                }
            )
            .catch(function (error) {
                console.log(error);
            })
        );
    },[]);

    document.body.style = 'background: #ffffff';
    return (
        <div>
            <Header style={{zIndex: 50}}/>
            <div style={{marginLeft:'50px', paddingTop:'50px'}} > <img src={mydesigns} height='80px' /> </div>
            <div>
                <div  style={{marginLeft:'50px', paddingBottom:'5px'}}>
                    <Grid container spacing={0.5}>
                    {designInfo.map((val, idx) =>(
                        <Grid item xs={3}>
                            <Design design={designInfo[idx]} />
                            {/* <img src={'http://192.249.18.241:4000/' + designInfo[idx].screenCapture} height='200px'/> */}
                        </Grid>
                    ))}
                    </Grid>
                </div>
            </div>

            <div style={{marginLeft:'50px', paddingTop:'10px'}} > <img src={liked} height='80px' /> </div>
            <div>
                <div  style={{marginLeft:'50px', paddingBottom:'50px'}}>
                    <Grid container spacing={0.5}>
                    {likedInfo.map((val, idx) =>(
                        <Grid item xs={3}>
                            <Design design={likedInfo[idx]} />
                            {/* <img src={'http://192.249.18.241:4000/' + designInfo[idx].screenCapture} height='200px'/> */}
                        </Grid>
                    ))}
                    </Grid>
                </div>
            </div>
            {window.sessionStorage.getItem('id') != null?
                <img className="logout_btn" src={logout_btn} onClick={logout} height='75px'/>
                    : null
            }
        </div>
    );
}

export default withStyles(styles)(DesignsView);