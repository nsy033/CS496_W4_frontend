import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const ModeSelect = ({match}) => {
    return (
        <div>
            <div>
            <h2>Choose Item</h2>
            
            <Link to={`/productselector`}>
                <button >Make New Design</button>
            </Link>
            <Link to={`/mypage`}>
                <button >My Page</button>
            </Link>
            <Link to={`/designs`}>
                <button >Other designs</button>
            </Link>
            </div>
        </div>
        
    );
}

export default ModeSelect;