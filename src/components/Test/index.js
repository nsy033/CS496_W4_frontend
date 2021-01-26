import Draggable from 'react-draggable';
import React from "react"
import { ChromePicker } from 'react-color'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class Test extends React.Component {
  state = {
    cats: [{name:"", age:"", hex:""}],
    displayColorPicker:false,
  }

  
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange1 = (color) => {
    this.setState({ hex: color.hex })
  };

handleChange = (e) => {
    if (["name", "age","hex"].includes(e.target.className) ) {
      let cats = [...this.state.cats]
      cats[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ cats }, () => console.log(this.state.cats))
      
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }

addCat = (e) => {
    this.setState((prevState) => ({
      cats: [...prevState.cats, {name:"", age:"", hex:""}],
    }));
  }
  
handleSubmit = (e) => { e.preventDefault() }




render() {
    let {cats} = this.state
    const styles = reactCSS({
        'default': {
          color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `${this.state.hex}`
            
          },
          swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
        },
      });
  


    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
        
        
        <button onClick={this.addCat}>Text Add</button>
        {
          cats.map((val, idx)=> {
            let catId = `cat-${idx}`, ageId = `age-${idx}`, hexId = `hex-${idx}`
            return (
              <div key={idx}>
                <label htmlFor={catId}>{`Text1 #${idx + 1}`}</label>
                
                <input
                  type="text"
                  name={catId}
                  data-id={idx}
                  id={catId}
                  value={cats[idx].name} 
                  className="name"
                />
                <label htmlFor={ageId}>Text Size</label>
                <input
                  type="number"
                  name={ageId}
                  data-id={idx}
                  id={ageId}
                  value={cats[idx].age} 
                  className="age"
                />
                
                <div>
                    <div style={ styles.swatch } onClick={ this.handleClick } >
                    <div style={ styles.color } />
                    </div>
                    { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker color={ cats[idx].hex } onChange={ this.handleChange1 }
                     
                     name={hexId}
                     data-id={idx}
                     id={hexId}
                     value={cats[idx].hex} 
                     className="hex"  />
                    </div> : null }

                </div>
                
                <Draggable>
                    <h1 style={{color: `${this.state.hex}`, fontSize:Number(`${cats[idx].age}`)}}
                        
                    >{cats[idx].name}</h1>
                </Draggable>
                
              </div>
            )
          })
        }
       
      </form>
    )
  }
}
export default Test



// import React from 'react'
// import reactCSS from 'reactcss'
// import { SketchPicker } from 'react-color'

// class Test extends React.Component {
//   state = {
//     displayColorPicker: false,
//     color: {
//       r: '241',
//       g: '112',
//       b: '19',
//       a: '1',
//     },
//   };

//   handleClick = () => {
//     this.setState({ displayColorPicker: !this.state.displayColorPicker })
//   };

//   handleClose = () => {
//     this.setState({ displayColorPicker: false })
//   };

//   handleChange = (color) => {
//     this.setState({ color: color.rgb })
//   };

//   render() {

    // const styles = reactCSS({
    //   'default': {
    //     color: {
    //       width: '36px',
    //       height: '14px',
    //       borderRadius: '2px',
    //       background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
    //     },
    //     swatch: {
    //       padding: '5px',
    //       background: '#fff',
    //       borderRadius: '1px',
    //       boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    //       display: 'inline-block',
    //       cursor: 'pointer',
    //     },
    //     popover: {
    //       position: 'absolute',
    //       zIndex: '2',
    //     },
    //     cover: {
    //       position: 'fixed',
    //       top: '0px',
    //       right: '0px',
    //       bottom: '0px',
    //       left: '0px',
    //     },
    //   },
    // });

//     return (
    //   <div>
    //     <div style={ styles.swatch } onClick={ this.handleClick }>
    //       <div style={ styles.color } />
    //     </div>
    //     { this.state.displayColorPicker ? <div style={ styles.popover }>
    //       <div style={ styles.cover } onClick={ this.handleClose }/>
    //       <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
    //     </div> : null }

    //   </div>
//     )
//   }
// }

// export default Test