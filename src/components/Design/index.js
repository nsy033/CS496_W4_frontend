import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './style.css';
import Modal from 'react-modal';

function Design({design}){
    const [modalState, setModalState] = useState(false);
    const [comment, setComment] = useState('');
    const [pass,setPass] = useState(false);
    const openModal = () => {
        setModalState(true);
    };
    const closeModal = event => {
        event.preventDefault();
        setModalState(false);
    };
    useEffect(()=>{
        setComment(comment)
    },[comment])

  return(
      <div className="applier">
        <Grid item xs={10}>
          <Paper onClick={openModal}>
            <img src={'http://192.249.18.241:4000/' + design.screenCapture} height='200px'/>
            <div> {design.user_name}님의 디자인 </div>
            <div> 판매가 {design.price}원 </div>
          </Paper>
        </Grid>
        <Modal isOpen={modalState} onRequestClose={closeModal} contentLabel="Example Modal">
        <div className="title-wrapper">
            <div className="blank">    </div>
            <img src={'http://192.249.18.241:4000/' + design.screenCapture} height='600px'/>
            <div> {design.user_name}님의 디자인 </div>
            <div> 판매가 {design.price}원 </div>
            <img className = 'button-close' src = "/images/close_circle.png" width="35px"height='35px' onClick={closeModal}></img>
        </div>
        </Modal>
      </div>
  )
}

export default Design;