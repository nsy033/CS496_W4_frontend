import React, { useState, useEffect} from 'react';
import ColorSelector from 'react-color-selector';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

    return (
        <div>
            <div>
            <h2>Choose Your Color</h2>
            <ColorSelector pallet={picker_data} selectedColor={pickedColor} />
            <p>{myColor}</p>
            <Link to={`/customize/${myColor}`}>
                <button >Go to Next Page</button>
            </Link>
            </div>
            
        </div>
        
    );
}

export default ColorPick;