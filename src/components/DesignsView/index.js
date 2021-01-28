import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Design from '../Design';
import './style.css';
const styles = theme => ({
  root: {
    padding: theme.spacing(5),
    background: '#EEEEEE'
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
});
function DesignsView (props) {
    const [designInfo, setDesignInfo] = useState([]);
    // const [popularState, setpopularState] = useState(false);
    const openPopular = () => {
        // setpopularState(true);
        axios.get("http://192.249.18.241:4000/design/popular").then(
            (res)=>{
                setDesignInfo(res.data);
                console.log(res.data);
                console.log(designInfo);
            }
        )
        .catch(function (error) {
            console.log(error);
        });
    };
    const closePopular = () => {
        // setpopularState(false);
        axios.get("http://192.249.18.241:4000/design/all").then(
            (res)=>{
                setDesignInfo(res.data);
                console.log(res.data);
                console.log(designInfo);
            }
        )
        .catch(function (error) {
            console.log(error);
        });
    };
    useEffect(()=>{
        axios.get("http://192.249.18.241:4000/design/all").then(
            (res)=>{
                setDesignInfo(res.data);
                console.log(res.data);
                console.log(designInfo);
            }
        )
        .catch(function (error) {
            console.log(error);
        });
    },[]);
    return (
        <div>
            <div>DesignsView</div>
            <button onClick={openPopular}>조회순</button>
            <button onClick={closePopular}>시간순</button>
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
        </div>
    );
}
export default withStyles(styles)(DesignsView);
