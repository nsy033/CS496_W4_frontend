import React, { Component } from "react";
import ReactDOM from "react-dom";
import Popup from "reactjs-popup";
import ScreenCapture from "../ScreenCapture";
import axios from 'axios';
import "./style.css";

class DesignCapture extends Component {
  state = {
    screenCapture: "",
    open: false,
    title: "",
    price: "",
    checked: false
  };

  handleScreenCapture = screenCapture => {
    this.setState(
      {
        screenCapture
      },
      () => {
        screenCapture && this.openModal();
      }
    );
  };

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false, screenCapture: "" });
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  checkboxHandler =(e)=>{
    this.setState({ checked: !this.state.checked });
  }

  convertBase64ToFile = (image) => {
    const byteString = atob(image.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([ab], {
      type: 'image/png',
    });
    return newBlob;
  };

  handleSave = () => {
    console.log(this.state.title, this.state.price, this.state.screenCapture);

    var imageFile = this.convertBase64ToFile(this.state.screenCapture);

    var sendState = {
      screenCapture: "",
      title: this.state.title,
      price: this.state.price
    }

    const data = new FormData();
    data.append('file', imageFile);
    debugger;
    axios.post('http://192.249.18.241:4000/uploads', data)
    .then(response=>{
      sendState = {
        screenCapture: response.data,
        title: this.state.title,
        price: this.state.price,
        private: this.state.checked,
        user_name: window.sessionStorage.getItem('name')
      }

      debugger;
      axios.post('http://192.249.18.241:4000/design/add', sendState)
      .then(response=>{console.log(response)})
      .catch(error =>{
        console.log(error)
      })
    })
    .catch(error =>{
      console.log(error);
    })
    this.closeModal();
    console.log("design saved in db");
  };;

  render() {
    const { screenCapture } = this.state;
    console.log(screenCapture);
    
    return (
      <ScreenCapture src={this.props.src} onEndCapture={this.handleScreenCapture}>
        {({ onStartCapture }) => (
          <>
            <header>
              <button onClick={onStartCapture}>Capture</button>
            </header>
              <img src={this.props.src} />
              {/* <TestImage src = {this.props.src}/> */}
            <Popup open={this.state.open} modal closeOnDocumentClick>
              <div className="modal">
                <div className="modal__header">
                  <button onClick={this.closeModal}>&times;</button>
                </div>
                <div className="modal__body">
                  <div>
                    <label>Title</label>
                    <input
                      type="text"
                      onChange={this.handleOnChange}
                      name="title"
                      value={this.state.title}
                    />
                  </div><div>
                    <label>Price</label>
                    <input
                      type="text"
                      onChange={this.handleOnChange}
                      name="price"
                      value={this.state.price}
                    />
                  </div><div>
                    <label>Private Repository</label>
                    <input
                      type="checkbox"
                      checked= {this.state.checked === true}
                      onChange={this.checkboxHandler}
                    />
                  </div>
                  <div className="image__container">
                    {screenCapture && (
                      <img src={screenCapture} alt="screen capture" />
                    )}
                  </div>
                </div>
                <div className="modal__footer">
                  <button onClick={this.handleSave}>Save</button>
                  <button onClick={this.closeModal}>Cancel</button>
                </div>
                {/* {screenCapture && <img src={screenCapture} alt="screen capture" />} */}
              </div>
            </Popup>
          </>
        )}
      </ScreenCapture>
    );
  }
}

ReactDOM.render(<DesignCapture />, document.getElementById("root"));

export default DesignCapture;