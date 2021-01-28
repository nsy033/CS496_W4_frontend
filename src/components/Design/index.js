import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from 'react-modal';
import axios from 'axios';
import red from './heart_red.png';
import black from './heart_blank.png';
import close from './close_btn.png';
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
    
    const [likeInfo, setlikeInfo] = useState(design.like);

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
            
            console.log('like handler');
            var tmp=1;
            if(design.like >0) tmp = design.like+1;
            axios.post('http://192.249.18.241:4000/design/update/'+design._id, {like: tmp})
            .then(response=>{console.log(response)},
              setlikeInfo(design.like+1),
              alert('Liked')
            )
            .catch(error => {
              console.log(error)
            })
          }
        })
        .catch(error =>{
          console.log(error)
        })

          // setModalState(false);
    };

    const [likedInfo, setLikedInfo] = useState([]);
    useEffect(()=>{
      axios
      .get("http://192.249.18.241:4000/user/check/"+String(window.sessionStorage.getItem('email'))).then(
        (res)=>{
            setLikedInfo(res.data.liked);
            // likedInfo=res.data;
            console.log(res.data.liked);
            // console.log('liked ', likedInfo);
            // debugger;
            }
      )
      .catch(function (error) {
          console.log(error);
      })
    }, []);

    const checkfun = design_id => {
      var i=0;
      for(i=0; i<likedInfo.length; i++){
        if(likedInfo[i]._id === design_id) return true;
      }
    }


  return(
      <div className="applier">
        <Grid item xs={10}>
          <Paper  onClick={openModal}>
            <img src={'http://192.249.18.241:4000/' + design.screenCapture} height='260px' style={{display: 'block', margin: '0px auto', paddingTop:'10px'}}/>
            <div className="title_move"> {design.title}</div>
            <div className="name_move">
              <div> 판매가</div>
              <div> Like</div>
            </div>
            <div className="details_move">
              <div> {design.price}원 </div>
              {design.like>0? 
                <div> {design.like}</div>
                :
                <div> 0</div>
              }
            </div>
            {checkfun(design._id) ?
              <img className='heart' src={red} height='30px'/>
              :
              <img className='heart' src={black} height='30px'/>
            }
            
          </Paper>
        </Grid>
        <div className="modal_including">
        
          <Modal className="modalPopup" isOpen={modalState} onRequestClose={closeModal} contentLabel="Example Modal" >
                <img className='modal_close_btn' src={close} onClick={closeModal} height='28px'/>
            <div className="title-wrapper">
                <div className="blank">    </div>
                <img src={'http://192.249.18.241:4000/' + design.screenCapture} height='550px' style={{marginTop:'20px', marginLeft:'30px'}}/>
                <div className="wrapper" >
                  <div className="title_move"> {design.title}</div>
                  <div className="name_move">
                    <div> 판매가</div>
                    <div> Like</div>
                  </div>
                  <div className="details_move">
                    <div> {design.price}원 </div>
                    {design.like>0? 
                      <div> {design.like}</div>
                      :
                      <div> 0</div>
                    }
                  </div>
                  {checkfun(design._id) ?
                    <img className='heart' src={red} height='30px' onClick={likeHandler}/>
                    :
                    <img className='heart' src={black} height='30px' onClick={likeHandler}/>
                  }
                </div>
                {/* <button onClick={closeModal}> CLOSE </button> */}
            </div>
          </Modal>
          </div>
      </div>
  )
}

export default Design;