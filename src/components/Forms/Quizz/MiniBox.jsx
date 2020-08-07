import React, { Component } from "react";
import { Link } from "react-router-dom";

export class MiniBox extends Component {
  render() {
    // console.log(this.props.question);
    return (
      <div className=""style={{margin:"20px", width:"50%"}}>
       
        
        <h3>Question {this.props.question.index}/10 : {this.props.question.question}</h3>
          <ol>
              <li>{this.props.question.propositions[0]}</li>
              <li>{this.props.question.propositions[1]}</li>
              <li>{this.props.question.propositions[2]}</li>
              <li>{this.props.question.propositions[3]}</li>
          </ol>

          <p> <span style={{fontFamily:"'Rubik', sans-serif", marginTop:"5px"}}>Right Answer</span> : {this.props.question.answer}</p>
          <p><span style={{fontFamily:"'Rubik', sans-serif"}}>FunFact</span> : {this.props.question.funFact}</p>
          
         <Link to={`/question/${this.props.question._id}`} question={this.props.question}>
         <button className="btn" style={{margin:"10px", width:"150px", backgroundColor:"var(--grey)", color:"black"}}> Edit Question</button></Link> 
               
      </div>
    );
  }
}

export default MiniBox;
