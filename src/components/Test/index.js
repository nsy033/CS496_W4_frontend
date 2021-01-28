import Draggable from 'react-draggable';
import React, { Component} from "react";
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import FontPicker from 'font-picker-react';
import textAdd from './addtext.png';
import './style.css';

class Test extends Component {
  state = {
    cats: [{name:"", age:"", hex:"", displayColorPicker:false}],
    activeFontFamily:'Open Sans',
    index: 0
  }

  handleClick = () => {
    let new_cats = [...this.state.cats]
    new_cats[this.state.index]["displayColorPicker"] = true
    this.setState({ cats: new_cats })
    console.log(this.state.cats);
    // this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };
  handleClose = () => {
    let new_cats = [...this.state.cats]
    new_cats[this.state.index]["displayColorPicker"] = false
    this.setState({ cats: new_cats })
    console.log(this.state.cats);
  };

  handleChange1 = (color) => {
    // this.setState({ hex: color.hex })
    let new_cats = [...this.state.cats]
    new_cats[this.state.index]["hex"] = color.hex
    this.setState({ cats: new_cats })
    console.log(this.state.cats);
  };

  handleChange = (e) => {
    if (["name", "age"].includes(e.target.className) ) {
      let cats = [...this.state.cats]
      cats[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ cats }, () => console.log(this.state.cats))

    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }

  addCat = (e) => {
    this.setState((prevState) => ({
      cats: [...prevState.cats, {name:"", age:"", hex:"", displayColorPicker:false}],
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
            width: '14px',
            borderRadius: '2px',
            background: `${this.state.cats[this.state.index].hex}`

          },
          swatch: {
            margin: '5px',
            padding: '8px',
            height: '14px',
            width: '14px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2'
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
      <div>
        <div style={{marginLeft: '260px', marginTop: '20px'}}>
          <FontPicker
            apiKey="AIzaSyCOLWBR5Ez1VrFwGteiS_pLh_DVeA5uEV8"
            activeFontFamily={this.state.activeFontFamily}
            onChange={(nextFont) =>
              this.setState({
                activeFontFamily: nextFont.family,
              })
            }
          />
        </div>

          
      <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
          <img className="addtext" src={textAdd} onClick={this.addCat}/>

        {/* <button onClick={this.addCat}>Text Add</button> */}

        {
          cats.map((val, idx)=> {
            let catId = `cat-${idx}`, ageId = `age-${idx}`, hexId = `hex-${idx}`
            return (
              <div key={idx}>
              <div style={{marginLeft: '260px', marginTop: '12px'}}>
                <div >
                  <label className="label_text" htmlFor={catId}>{`Text #${idx + 1}`}</label>
                  <br/>
                  <label className="label_text" htmlFor={ageId}>Font Size</label>
                </div>
                
                <div style={{marginLeft: '78px', marginTop: '-42px'}}>
                  <input
                    type="text"
                    name={catId}
                    data-id={idx}
                    id={catId}
                    value={cats[idx].name} 
                    className="name"
                  />
                    <br/>
                  <input
                    type="number"
                    name={ageId}
                    data-id={idx}
                    id={ageId}
                    value={cats[idx].age} 
                    className="age"
                  />
                </div>
                
            <div className="hex">
              <div style={ styles.swatch } onClick={ this.state.index=idx, this.handleClick } >
                {/* <div style={ styles.color } /> */}
                </div>
                { this.state.cats[idx].displayColorPicker ? 
                  <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker color={ cats[idx].hex } onChange={ this.state.index=idx, this.handleChange1 }
                      name={hexId} 
                      data-id={idx}
                      id={hexId}
                      value={cats[idx].hex}/>
                  </div>
                  : null }
              </div>
              <Draggable>
                <p style={{fontFamily: `${this.state.activeFontFamily}` ,color: `${this.state.cats[idx].hex}`, fontSize:Number(`${cats[idx].age}`)}}
                >{cats[idx].name}</p>
              </Draggable>
            </div>
            </div>
            )
          })
        }

      </form>
      </div>
    )
  }
}

export default Test
