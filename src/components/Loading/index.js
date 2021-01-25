import React from 'react';
import './style.css';
import { Component } from 'react';

class Loading extends Component {
  render() {
    return (
          this.props.isOpen === true ?
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
          :
          null
    );
  }
}
export default Loading;