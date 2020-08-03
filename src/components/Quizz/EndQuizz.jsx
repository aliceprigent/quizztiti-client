import React, { Component } from 'react'

export class EndQuizz extends Component {
    render() {
        return (
            <div className="column center">
            <div className="column endquizz">
            <h3>Score</h3>
            <p style={{marginTop: "10px"}}>{this.props.score}</p>
           

            
                
            </div>
            <button style={{width: "150px"}}className="btn">See dashboard</button>
            </div>
        )
    }
}

export default EndQuizz
