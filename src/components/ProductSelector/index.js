import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Grid from '@material-ui/core/Grid';
import Header from '../Header';

const ProductSelector = ({match}) => {
    document.body.style = 'background: #cfd6df';
    return (
            <div className="back">
            <Header  classname='header' />
            {/* <h2>Choose Item</h2> */}
            <Grid  style={{marginLeft: 90, marginTop:230}} container spacing={2}>
            <div style={{margin:10}}>
                <Link to={`/colorselector/${0}`}>
                    <img 
                        src = {'http://192.249.18.241:4000/uploads/mtm_default.png'}
                        onMouseOver={e => 
                            e.target.src = 'http://192.249.18.241:4000/uploads/mtm_create.png'
                        }
                        onMouseOut={e => 
                            e.target.src = 'http://192.249.18.241:4000/uploads/mtm_default.png'
                        }
                        width='300'>
                    </img>
                </Link>
            </div>
            <div style={{margin: 10}}>
                <Link to={`/colorselector/${1}`}>
                    <img 
                        src = {'http://192.249.18.241:4000/uploads/bag_default.png'}
                        onMouseOver={e => 
                            e.target.src = 'http://192.249.18.241:4000/uploads/bag_create.png'
                        }
                        onMouseOut={e => 
                            e.target.src = 'http://192.249.18.241:4000/uploads/bag_default.png'
                        }
                        width='300'>
                    </img>
                </Link>
            </div>
            <div style={{margin: 10}}>
                <Link to={`/colorselector/${2}`}>
                    <img 
                        src = {'http://192.249.18.241:4000/uploads/phone_default.png'}
                        onMouseOver={e => 
                            e.target.src = 'http://192.249.18.241:4000/uploads/phone_create.png'
                        }
                        onMouseOut={e => 
                            e.target.src = 'http://192.249.18.241:4000/uploads/phone_default.png'
                        }
                        width='300'>
                    </img>
                </Link>
            </div>
            <div style={{margin: 10}}>
                <Link to={`/colorselector/${3}`}>
                    <img 
                        src = {'http://192.249.18.241:4000/uploads/socks_default.png'}
                        onMouseOver={e => 
                            e.target.src = 'http://192.249.18.241:4000/uploads/socks_create.png'
                        }
                        onMouseOut={e => 
                            e.target.src = 'http://192.249.18.241:4000/uploads/socks_default.png'
                        }
                        width='300'>
                    </img>
                </Link>
            </div>
            </Grid>
            
            </div>
        
    );
}

export default ProductSelector;