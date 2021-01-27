import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './style.css';
import Modal from 'react-modal';
import axios from 'axios';


function Design({design}){
    const [modalState, setModalState] = useState(false);
    const openModal = () => {
        setModalState(true);
    };
    const closeModal = event => {
        event.preventDefault();
        setModalState(false);
    };
    const [likeInfo, setlikeInfo] = useState(design.like);
    const likeHandler = event => {
      event.preventDefault();
      console.log('like handler');
      axios.post('http://192.249.18.222:4000/design/update/'+design._id, {like:design.like+1})
      .then(response=>{console.log(response)},
        setlikeInfo(design.like+1),
        
      )
      .catch(error => {
        console.log(error)
      })
  };

  return(
      <div className="applier">
        
        <Grid item xs={10}>
          <Paper onClick={openModal}>
            <img src={'http://192.249.18.222:4000/' + design.screenCapture} height='200px'/>
            <div> {design.user_name}님의 디자인 </div>
            <div> 판매가 {design.price}원 </div>
            <div> Like {design.like}</div>
          </Paper>
        </Grid>
        <Modal isOpen={modalState} onRequestClose={closeModal} contentLabel="Example Modal">
        <div className="title-wrapper">
            <div className="blank">    </div>
            <img src={'http://192.249.18.222:4000/' + design.screenCapture} height='600px'/>
            <div> {design.user_name}님의 디자인 </div>
            <div> 판매가 {design.price}원 </div>
            <div> Like {likeInfo}</div>
            <button onClick={likeHandler}>LIKE</button>
            <button onClick={closeModal}>CLOSE</button>
        </div>
        </Modal>
      </div>
  )
}

export default Design;

