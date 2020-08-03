import React, { Component } from 'react'

export class AnswerQuizz extends Component {

    render() {
        return (
            <div>
                {this.props.userAnswer === this.props.quizz.answer ? <h4 style={{color: "green"}}>Good answer !</h4> : <h4 style={{color: "red"}}>Wrong answer...</h4>}
                <p>Answer : {this.props.quizz.answer}</p>
                <br />
                <p>{this.props.quizz.funFact}</p>
            </div>
        )
    }
}

export default AnswerQuizz
