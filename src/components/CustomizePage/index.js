import React, { Component } from 'react';
import BackgroundImage from '../BackgroundImage';
import './style.css';

const CustomizePage = ({location}) => {
  console.log(location.hash);
  
  return (
    <div>
      <button>send</button>
      <h1>CustomizePage</h1>
      <h2>The Color You Picked: {location.hash}</h2>
      <BackgroundImage></BackgroundImage>

      
    </div>
  );
}
    
export default CustomizePage;