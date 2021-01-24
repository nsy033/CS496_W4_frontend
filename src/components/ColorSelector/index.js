import React, { useState} from 'react';
import ColorSelector from 'react-color-selector';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';



import './style.css';


const ColorPick = ({match}) => {
 

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

    const [inputText, setInputText] = useState("");
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

  

    return (
        <div>
             <div>
               {/* <h2>여기 {window.localStorage.getItem('name')} </h2> */}
               <h2>{window.sessionStorage.getItem('name')}</h2>
                <h2>Choose Your Color</h2>
                <ColorSelector pallet={picker_data} selectedColor={pickedColor} />
                <p>{myColor}</p>
                <Link to={`/customize/${myColor}`}>
                    <button>Go to Next Page</button>
                </Link>
              </div>
              <div> 
                <input
                    type="text"
                    value={inputText}
                    placeholder="입력하세요"
                    onChange={onChangeInput}
                /> 

                <button onClick={onReset}>Reset</button>
                <input 
                    type="number"
                    value={inputText1}
                    placeholder="글씨 크기"
                    onChange={onChangeInput1}
                    
                />
                <Draggable>
                    <h1 style = {{color: `${myColor}`, fontSize:Number(`${inputText1}`)}}>{inputText}</h1>
                </Draggable>
                

            
            </div>
        </div>
    );

}


export default ColorPick;