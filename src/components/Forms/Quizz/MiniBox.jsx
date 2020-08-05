import React, { Component } from "react";
import { Link } from "react-router-dom";

export class MiniBox extends Component {
  render() {
    console.log(this.props.question);
    return (
      <div className="mini-question-container">
       
        
        <h3>Question {this.props.question.index}/10 : {this.props.question.question}</h3>
          <ol>
              <li>{this.props.question.propositions[0]}</li>
              <li>{this.props.question.propositions[1]}</li>
              <li>{this.props.question.propositions[2]}</li>
              <li>{this.props.question.propositions[3]}</li>
          </ol>

          <p>Right Answer : {this.props.question.answer}</p>
          <p>FunFact : {this.props.question.funFact}</p>
          
         <Link to={`/question/${this.props.question._id}`} question={this.props.question}>
         <button> Edit Question</button></Link> 
               
      </div>
    );
  }
}

export default MiniBox;
