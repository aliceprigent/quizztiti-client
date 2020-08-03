import React, { Component } from "react";

export class QuestionBox extends Component {
  state = {
    // newQuest:""
  };

  questionChange = (event) => {
    const key = event.target.name;
    const ev = event.target;
    this.setState({ [key]: ev.value });
    // console.log(this.state)
  };

  
  // }
  compilQuest = (event) => {
    event.preventDefault();
    let updatedQuest;
    // console.log(this.state)
    updatedQuest={
    index:this.props.questionNumber,
    question:this.state.question,
    propositions:[
      this.state.proposition1,
      this.state.proposition2,
      this.state.proposition3,
      this.state.proposition4
    ],
    answer:this.state.answer,
    funFact:this.state.funFact
    }
this.setState({newQuest:updatedQuest}, ()=>{
  this.props.addCbk(this.state.newQuest);
});

    console.log (updatedQuest)
  };

  render() {
    return (
      <div className="question-box ">
        <form className="question-box" onChange={this.questionChange}>
          <label htmlFor="question">Question {this.props.questionNumber}/10</label>
          <input name="question" className="question column" type="text" defaultValue="question 1" />

          <label htmlFor="proposition">Propositions</label>
          <div>
            <label htmlFor="proposition1">
            <h2>Proposition 1</h2>
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
            </label>
          </div>
          <div>
            <label htmlFor="proposition 2">
              <h2>Proposition 2</h2>
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
            </label>
          </div>

          <div>
            <label htmlFor="proposition 3">
              <h2>Proposition 3</h2>
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
            </label>
          </div>
          <div>
            <label htmlFor="proposition4">
              <h2>Proposition 4</h2>
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
            </label>
          </div>

          <label htmlFor="funFact">FunFact</label>
          <input name="funFact" type="text"  defaultValue="lol"/>
          <button onClick={this.compilQuest}>Validate Question</button>
        </form>
      </div>
    );
  }
}

export default QuestionBox;
