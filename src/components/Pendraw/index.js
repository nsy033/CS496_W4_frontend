import React from 'react';
import './style.css';

const styles = {
    canvas : {
        border:'1px solid #333',
        margin:'20px 0px',
        zIndex:1
    },

    maindiv : {
        padding:'10px',
        margin:'auto',
        width:'800px',
        marginTop:'auto',
        marginBottom:'auto',
        marginLeft:'650px'
    },

    button : {
        border:'0px',
        margin:'2px',
        height:'40px',
        minWidth:'40px',
    },

    colorSwatches : {        
        red : {'backgroundColor' : '#cb1313'},    
        orange : {'backgroundColor' : '#f67d11'},
        yellow : {'backgroundColor' : '#ffcc00'},
        green : {'backgroundColor' : '#30b229'},
        blue : {'backgroundColor' : '#0d64e7'},
        purple : {'backgroundColor' : '#8916c5'},
        black : {'backgroundColor' : 'black'}
    }
}

//simple draw component made in react
class Pendraw extends React.Component {

    componentDidMount() {
        this.reset()
    }

    drawing(e) { //if the pen is down in the canvas, draw/erase

        if(this.state.pen === 'down') {

            this.ctx.beginPath()
            this.ctx.lineWidth = this.state.lineWidth
            this.ctx.lineCap = 'round';


            if(this.state.mode === 'draw') {
                this.ctx.strokeStyle = this.state.penColor
            }

            if(this.state.mode === 'erase') {
                this.ctx.strokeStyle = '#ffffff'
            }

            this.ctx.moveTo(this.state.penCoords[0], this.state.penCoords[1]) //move to old position
            this.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY) //draw to new position
            this.ctx.stroke();

            this.setState({ //save new position 
                penCoords:[e.nativeEvent.offsetX, e.nativeEvent.offsetY]
            })
        }
    }

    penDown(e) { //mouse is down on the canvas
        this.setState({
            pen:'down',
            penCoords:[e.nativeEvent.offsetX, e.nativeEvent.offsetY]
        })
    }

    penUp() { //mouse is up on the canvas
        this.setState({
            pen:'up'
        })
    }


    setColor(c){ //a color button was clicked
        this.setState({
            penColor : c
        })
    }

    reset() { //clears it to all white, resets state to original
        this.setState({
            mode: 'draw',
            pen : 'up',
            lineWidth : 10,
            penColor : 'black'
        })

        this.ctx = this.refs.canvas.getContext('2d')
        this.ctx.fillStyle="#00000000"
        this.ctx.fillRect(0,0,800,600)
        this.ctx.lineWidth = 10
    }

    render() {
        return (
            <div style={styles.maindiv}>
               
                <canvas ref="canvas" width="600px" height="600px" style={{marginTop:'60px'}}
                    onMouseMove={(e)=>this.drawing(e)} 
                    onMouseDown={(e)=>this.penDown(e)} 
                    onMouseUp={(e)=>this.penUp(e)}>
                </canvas>
                <div className="buttons">
                    <button className='draw_text' style={Object.assign({}, styles.colorSwatches.red, styles.button)} onClick={()=>this.setColor('#cb1313')}></button>
                    <button className='draw_text' style={Object.assign({}, styles.colorSwatches.orange, styles.button)} onClick={()=>this.setColor('#f67d11')}></button>
                    <button className='draw_text' style={Object.assign({}, styles.colorSwatches.yellow, styles.button)} onClick={()=>this.setColor('#ffcc00')}></button>
                    <button className='draw_text' style={Object.assign({}, styles.colorSwatches.green, styles.button)} onClick={()=>this.setColor('#30b229')}></button>
                    <button className='draw_text' style={Object.assign({}, styles.colorSwatches.blue, styles.button)} onClick={()=>this.setColor('#0d64e7')}></button>
                    <button className='draw_text' style={Object.assign({}, styles.colorSwatches.purple, styles.button)} onClick={()=>this.setColor('#8916c5')}></button>
                    <button className='draw_text' style={Object.assign({}, styles.colorSwatches.black, styles.button)} onClick={()=>this.setColor('black')}></button>
                </div>
            </div>
        )
    }
}

//ReactDOM.render(<DrawApp />, document.getElementById('da'))

export default Pendraw;