import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const ProductSelector = ({match}) => {
    return (
        <div>
            <div>
            <h2>Choose Item</h2>
            
            <Link to={`/colorselector/${0}`}>
                <button >mtm</button>
            </Link>
            <Link to={`/colorselector/${1}`}>
                <button >bag</button>
            </Link>
            <Link to={`/colorselector/${2}`}>
                <button >phone</button>
            </Link>
            <Link to={`/colorselector/${3}`}>
                <button >socks</button>
            </Link>
            </div>
        </div>
        
    );
}

export default ProductSelector;