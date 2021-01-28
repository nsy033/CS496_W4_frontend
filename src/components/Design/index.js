import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from 'react-modal';
import axios from 'axios';
import './style.css';

function Design({design}){

    const [modalState, setModalState] = useState(false);

    const openModal = () => {
        setModalState(true);
    };
    const closeModal = event => {
        event.preventDefault();
        setModalState(false);
    };

    const likeHandler = event => {
        event.preventDefault();
        axios.get('http://192.249.18.241:4000/user/check/'+String(window.sessionStorage.getItem('email')))
        .then(response=>{
          // console.log(response.data.liked);
          var flag = true, i=0;
          for(i=0; i<response.data.liked.length; i++) {
            if(response.data.liked[i]._id === design._id){
              // console.log('Already liked');
              alert('Already liked');
              flag=false;
              break;
            }
          }
          if(flag) {
            console.log('Add new design to liked list');
            const new_list = response.data.liked.concat(design);
            axios.post('http://192.249.18.241:4000/user/like/'+String(window.sessionStorage.getItem('email')), {liked: new_list})
            .then(response=>{console.log(response)})
            .catch(error =>{
              console.log(error)
            })
          }
        })
        .catch(error =>{
          console.log(error)
        })
        // setModalState(false);
    };

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
              <button onClick={likeHandler}> LIKE </button>
              <button onClick={closeModal}> CLOSE </button>
          </div>
        </Modal>
      </div>
  )
}

export default Design;