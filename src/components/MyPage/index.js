import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Design from '../Design';
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
            <div>My designs</div>

            <div>
                <Grid container spacing={2}>
                {designInfo.map((val, idx) =>(
                    <Grid item xs={2}>
                        <Design design={designInfo[idx]} />
                        {/* <img src={'http://192.249.18.241:4000/' + designInfo[idx].screenCapture} height='200px'/> */}
                    </Grid>
                ))}
                </Grid>
            </div>

            <div>Liked</div>
            <div>
                <Grid container spacing={2}>
                {likedInfo.map((val, idx) =>(
                    <Grid item xs={2}>
                        <Design design={likedInfo[idx]} />
                    </Grid>
                ))}
                </Grid>
            </div>
        </div>
    );
}

export default withStyles(styles)(DesignsView);