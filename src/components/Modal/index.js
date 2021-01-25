import React from 'react';
import './style.css';
import { Component } from 'react';

class Modal extends Component {
  render() {
    return (
          this.props.isOpen === true ?
          <div className="modal">
            <img className="modal_image" src={this.props.image}/>
            <button onClick={this.props.close}>close</button>
          </div>
          :
          null
    );
  }
}
export default Modal;