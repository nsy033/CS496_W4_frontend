import React from 'react'
import './style.css'
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';
import image1 from './images/main_1.png';
import image2 from './images/main_2.png';
import image3 from './images/main_3.png';

const Intro = (props)=>{
    return(
        <div>
        <h1 className="empty"> hi </h1>
        <div  className="images" id="intro" >
            <div className="fade-container">
                <Fade >
                    <div className="each-fade">
                        <img src={image3} width= '1100'></img>
                    </div>
                    <div className="each-fade">
                        <img src={image2} width= '1100'></img>
                    </div>
                    <div className="each-fade">
                        <img src={image1} width= '1100'></img>
                    </div>
                </Fade>
            </div>
        </div>
        </div>
    )
}

export default Intro;