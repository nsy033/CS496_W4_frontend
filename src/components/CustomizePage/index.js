import React, { Component, useState, useEffect } from 'react';
import BackgroundImage from '../BackgroundImage';
import ColorSelector from 'react-color-selector';
import Draggable from 'react-draggable';
import axios from 'axios';
import './style.css';

const CustomizePage = ({location}) => {

  // var colorInfo = [];

  const [colorInfo, setColorInfo] = useState({});
  useEffect(()=>{
      console.log('axios get !');
      let umounted = false;
      axios.get("http://192.249.18.241:4000/testcrawling/all", {
        params: {
          myColor: location.hash
        }
        }).then(
        (res)=>{
          setColorInfo(res.data);
          console.log(colorInfo);
        }
    )
    .catch(error =>{
      console.log(error)
    })
    return ()=>{umounted= true}
  },[])

  console.log(location.hash);
  
  const [inputText, setInputText] = useState('');
    const onChangeInput = e => {
    setInputText(e.target.value);
  };

  const [inputText1, setInputText1] = useState('');
    const onChangeInput1 = e => {
    setInputText1(e.target.value);
  };

  const onReset = () => {
    setInputText("");
  };

  const [userImage, setUserImage] = useState('');


  const uploadHandler = (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    axios.post('http://192.249.18.241:4000/uploads', data)
    .then(response=>{
      console.log('get path from server: ' + response.data);
      setUserImage(response.data);
      })
    .catch(error =>{
      console.log(error)
    });
  }


  let [myColor, pickedColor] = useState('');  
  let picker_data = {
      col: 12,
      row: 12,
      width: 300,
      height: 250,
      view: 'both',
      theme: 'white',
      title: 'COLORS',
      cellControl: 4
  }

  var elements = [0,0,0,0,0,0], i=0;
  elements[0] = location.hash;
  for(i=0; i<colorInfo.length; i++) elements[i+1] = colorInfo[i];
  
  return (
    <div>
      <h1>CustomizePage</h1>
      <h2>The Color You Picked: {location.hash}</h2>
      <BackgroundImage colorInfo={elements}></BackgroundImage>

      <div id="text-part"> 
        <input id="text-input"
            type="text"
            value={inputText}
            placeholder="입력하세요"
            onChange={onChangeInput}
        /> 

        <button id="text-reset-btn" onClick={onReset}>Reset</button>
        <input id="text-size-input"
            type="number"
            value={inputText1}
            placeholder="글씨 크기"
            onChange={onChangeInput1}
        />
        <input type="file" id="image-input" onChange={uploadHandler}/>

        <Draggable>
          <h1 style = {{color: `${myColor}`, fontSize:Number(`${inputText1}`)}}>{inputText}</h1>
        </Draggable>
        <Draggable>
          <img src={'http://192.249.18.241:4000/' + userImage} alt=""></img>
        </Draggable>
      <ColorSelector id="text-colorSelector" pallet={picker_data} selectedColor={pickedColor} />
      
      </div>
    </div>
  );
}
    
export default CustomizePage;