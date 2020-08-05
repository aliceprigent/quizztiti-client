import React, { Component } from 'react'

export class EndQuizz extends Component {
    render() {
        return (
            <div className="column center">
            <div className="column endquizz">
            <h3>SCORE</h3>
            <div className="score-quizz">
            <p style={{marginTop: "3em", fontSize:"30px"}}>{this.props.score}</p>
            </div>
                
            </div>
            
            <a href="/dashboard"><button style={{width: "150px"}}className="btn">See dashboard</button></a>
            </div>
        )
    }
}

export default EndQuizz
