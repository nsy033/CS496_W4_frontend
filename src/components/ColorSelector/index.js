import React, { useState } from 'react';
import ColorSelector from 'react-color-selector';
import CustomizePage from '../CustomizePage';
import { Route, Link } from 'react-router-dom';
import './style.css';

const ColorPick = ({match}) => {

    let[myColor, pickedColor] = useState('');
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
            <h2>Choose Your Color</h2>
            <ColorSelector pallet={picker_data} selectedColor={pickedColor} />
            <p>{myColor}</p>
            <Link to={`/customize/${myColor}`}>
                <button>Go to Next Page</button>
            </Link>
        </div>
    );
}

export default ColorPick;