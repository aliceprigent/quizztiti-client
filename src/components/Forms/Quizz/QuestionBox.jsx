import React, { Component } from "react";

export class QuestionBox extends Component {
  state = {
    refsArray:[]
  };
  

  questionChange = (event) => {
    const key = event.target.name;
    const ev = event.target;
    let refsCopy = [...this.state.refsArray]; 
    console.log (event.target)  
    if (event.target.ref)
    {
      const ref=event.target.ref
refsCopy.push(ref)}
   
    this.setState({ 
      [key]: ev.value,
       refsArray:refsCopy
    },()=>{console.log(this.state)});
    // console.log(this.state)
  };

  // }

  

  compilQuest = (event) => {
    event.preventDefault();
    let inputList=document.querySelectorAll('input')
console.log(inputList)
    let updatedQuest;
    // console.log(this.state)
//   let inputList=[]
// inputList.push(this.inputTitle,this.inputprop1,this.inputprop2,this.inputprop3,this.inputprop4,this.inputFunFact)
    updatedQuest = {
      index: this.props.questionNumber,
      question: this.state.question,
      propositions: [
        this.state.proposition1,
        this.state.proposition2,
        this.state.proposition3,
        this.state.proposition4,
      ],
      answer: this.state.answer,
      funFact: this.state.funFact,
    };
    this.setState({ newQuest: updatedQuest }, () => {
      this.props.addCbk(this.state.newQuest);this.props.clearCbk(inputList)
    });

    console.log(updatedQuest);
  };

  render() {
    return (
      // <div className="question-box ">
        <form className="question-box center column" onChange={this.questionChange}>
          <label htmlFor="question">
<h2> Question {this.props.questionNumber}/10</h2>
          </label>
          <input
            name="question"
            className="question column"
            type="text"
            defaultValue="What is your question?"
            ref={(el) => (this.inputTitle = el)}
          />

          <label htmlFor="proposition" style={{paddingTop:"2em"}}><h3>Propositions</h3>
          </label>
          <div>
            <label htmlFor="proposition1">
             Proposition 1</label>
              <input
                type="text"
                name="proposition1"
                className="proposition column q-input"
                defaultValue="réponse 1"
                
              />
              <input
                type="radio"
                name="answer"
                id="proposition1"
                value={this.state.proposition1}
               
              />
            
          </div>
          <div>
            <label htmlFor="proposition 2">Proposition 2
            </label>
              <input
                type="text"
                name="proposition2"
                className="proposition column q-input"
                defaultValue="réponse 2"
               
              />
              <input
                type="radio"
                name="answer"
                id="proposition2"
                value={this.state.proposition2}
                
              />
            
          </div>

          <div>
            <label htmlFor="proposition 3">Proposition 3
            </label>
              <input
                type="text"
                name="proposition3"
                className="proposition column q-input"
                defaultValue="réponse 3"
                
              />
              <input
                type="radio"
                name="answer"
                id="proposition3"
                value={this.state.proposition3}
              />
           
          </div>
          <div>
            <label htmlFor="proposition4">Proposition 4 </label>
              
              <input
                type="text"
                name="proposition4"
                className="proposition column q-input"
                defaultValue="réponse 4"
                
              />
              <input
                type="radio"
                name="answer"
                id="proposition4"
                value={this.state.proposition4}
              />
           
          </div>

          <label htmlFor="funFact">FunFact</label>
          <input name="funFact" type="text" defaultValue="lol" className="q-input" />
          <button onClick={this.compilQuest} className="btn validate center">Validate Question</button>
        </form>
      // </div>
    );
  }
}

export default QuestionBox;
