import React, { Component } from 'react'

export class AnswerQuizz extends Component {

    render() {
        return (
            <div classname="column center" style={{textAlign:"left"}}>

<div className="column center" style={{paddingTop:"20px"}}>
                {this.props.userAnswer === this.props.quizz.answer ? <h4 style={{color: "green"}}>Good answer !</h4> : <h4 style={{color: "red"}}>Wrong answer...</h4>}
                <p><b>Answer</b> : {this.props.quizz.answer}</p>
                <br />
               
                <p style={{width:"50%"}}>{this.props.quizz.funFact}</p>
                </div>
      
            </div>
        )
    }
}

export default AnswerQuizz
