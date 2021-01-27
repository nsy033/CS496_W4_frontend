import React from 'react'

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
    
    },

    button : {
        border:'0px',
        margin:'1px',
        height:'50px',
        minWidth:'75px'
    },

    colorSwatches : {        
        red : {'backgroundColor' : 'red'},    
        orange : {'backgroundColor' : 'orange'},
        yellow : {'backgroundColor' : 'yellow'},
        green : {'backgroundColor' : 'green'},
        blue : {'backgroundColor' : 'blue'},
        purple : {'backgroundColor' : 'purple'},
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
               
                <canvas ref="canvas" width="600px" height="600px" 
                    onMouseMove={(e)=>this.drawing(e)} 
                    onMouseDown={(e)=>this.penDown(e)} 
                    onMouseUp={(e)=>this.penUp(e)}>
                </canvas>
                <div>
                    <button style={Object.assign({}, styles.colorSwatches.red, styles.button)} onClick={()=>this.setColor('red')}>Red</button>
                    <button style={Object.assign({}, styles.colorSwatches.orange, styles.button)} onClick={()=>this.setColor('orange')}>Orange</button>
                    <button style={Object.assign({}, styles.colorSwatches.yellow, styles.button)} onClick={()=>this.setColor('yellow')}>Yellow</button>
                    <button style={Object.assign({}, styles.colorSwatches.green, styles.button)} onClick={()=>this.setColor('green')}>Green</button>
                    <button style={Object.assign({}, styles.colorSwatches.blue, styles.button)} onClick={()=>this.setColor('blue')}>Blue</button>
                    <button style={Object.assign({}, styles.colorSwatches.purple, styles.button)} onClick={()=>this.setColor('purple')}>Purple</button>
                    <button style={Object.assign({}, styles.colorSwatches.black, styles.button)} onClick={()=>this.setColor('black')}>Black</button>
                </div>
            </div>
        )
    }
}

//ReactDOM.render(<DrawApp />, document.getElementById('da'))

export default Pendraw;