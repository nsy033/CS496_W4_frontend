import React, { Component } from 'react';
import './style.css';

const CustomizePage = ({location}) => {
  console.log(location.hash);
  
  function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";}
    else {
      return "rgb(" + r + ", " + g + ", " + b + ")";}
}

  return (
    <div>
      <h1>CustomizePage</h1>
      <h2>The Color You Picked: {location.hash}</h2>
      <h2>RGBA: {hexToRGB(location.hash, 1)}</h2>
    </div>
  );
}
    
export default CustomizePage;