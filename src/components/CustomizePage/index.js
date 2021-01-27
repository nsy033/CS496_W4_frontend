import React, { useState, useEffect } from 'react';
import BackgroundImage from '../BackgroundImage';
import Draggable from 'react-draggable';
import axios from 'axios';
import './style.css';
import Test from '../Test';
import Pendraw from '../Pendraw';
import { useScreenshot } from "use-screenshot-hook";
import DesignCapture from '../DesignCapture';

const CustomizePage = ({location}) => {
  
  console.log(location.hash);
  const color_code = location.hash.substring(0,7);
  const item_num = location.hash.substring(8);

  const [colorInfo, setColorInfo] = useState({});
  useEffect(()=>{
      console.log('axios get !');
      axios.get("http://192.249.18.241:4000/testcrawling/all", {
        params: {
          myColor: color_code
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
  },[])
  
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
  elements[0] = color_code;
  for(i=0; i<colorInfo.length; i++) elements[i+1] = colorInfo[i];
  const { image, takeScreenshot } = useScreenshot();
  let[mode, setMode] = useState(true);
  useEffect(()=>{
        if(image != null) setMode(false);
    },[image])

  return (
    mode?
    <div>
      <h1 className="c_page_title">{window.sessionStorage.getItem('name')}님의 디자인</h1>
      <BackgroundImage className = "behind_image" colorInfo={elements} item_id={item_num}></BackgroundImage>
      <Pendraw className="back" ></Pendraw>
      <Test></Test>
      <Draggable>
        <h1 style = {{color: `${myColor}`, fontSize:Number(`${inputText1}`)}}>{inputText}</h1>
      </Draggable>
      <Draggable>
        <img src={'http://192.249.18.241:4000/' + userImage} alt=""></img>
      </Draggable>
      
      <input type="file" id="image-input" onChange={uploadHandler}/>

      <button onClick={() => takeScreenshot()}>screenshot</button>
    </div>
    :
    <div>
      <img src={image}/>
      <DesignCapture />
      <button onClick={() => setMode(true)}>go back</button>
    </div>
  );
}

export default CustomizePage;