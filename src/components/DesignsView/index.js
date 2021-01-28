import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Design from '../Design';
import './style.css';
import designs from './designs.png';
import high from './high.png';
import low from './low.png';
import popular from './popular.png';
import recent from './recent.png';
import Header from '../Header';

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

    const expensive = () => {
        axios.get("http://192.249.18.241:4000/design/expensive").then(
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
    const cheap = () => {
        axios.get("http://192.249.18.241:4000/design/cheap").then(
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
    
    document.body.style = 'background: #ffffff';
    return (
        <div>
            <Header style={{zIndex: 50}}/>
            <div style={{marginLeft:'50px', paddingTop:'50px'}} > <img src={designs} height='80px' /> </div>

            <div style={{marginLeft:'1120px', marginTop:'-50px', marginBottom:'20px'}}>
                <img style={{marginLeft:'5px'}} src={popular} onClick={openPopular} height='26px'/>
                <img style={{marginLeft:'5px'}} src={recent} onClick={closePopular} height='26px'/>
                <img style={{marginLeft:'5px'}} src={high} onClick={expensive} height='26px'/>
                <img style={{marginLeft:'5px'}} src={low} onClick={cheap} height='26px'/>
            </div>

            <div  style={{marginLeft:'50px', paddingBottom:'50px'}}>
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
    );
}
export default withStyles(styles)(DesignsView);
