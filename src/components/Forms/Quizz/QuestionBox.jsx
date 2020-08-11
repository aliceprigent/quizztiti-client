import React, { Component } from "react";

export class QuestionBox extends Component {
  state = {
    refsArray: [],
  };

  questionChange = (event) => {
    const key = event.target.name;
    const ev = event.target;
    let refsCopy = [...this.state.refsArray];
    // console.log(event.target);
    if (event.target.ref) {
      const ref = event.target.ref;
      refsCopy.push(ref);
    }

    this.setState(
      {
        [key]: ev.value,
        refsArray: refsCopy,
      // },
      // () => {
      //   console.log(this.state);
      }
    );
    // console.log(this.state)
  };

  // }

  compilQuest = (event) => {
    console.log(this.props)
    event.preventDefault();
    let inputList = document.querySelectorAll("input.qbox");
    console.log(inputList);
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
      this.props.addCbk(this.state.newQuest);
      this.props.clearCbk(inputList);
    });

    console.log(updatedQuest);
  };

  render() {
    return (
      // <div className="question-box ">
      <form
        className="question-box center column"
        onChange={this.questionChange}
      >
        <label htmlFor="question">
          <h2> Question {this.props.questionNumber}/10</h2>
        </label>
        <input
          name="question"
          className="qbox question column"
          type="text"
          placeholder="What is your question?"
         
        />

        <label htmlFor="proposition" style={{ paddingTop: "2em" }}>
          <h3>Propositions</h3>
        </label>
        <div>
          <label htmlFor="proposition1">Proposition 1</label>
          <input
            type="text"
            name="proposition1"
            className="qbox proposition column q-input"
            placeholder="réponse 1"
          />
          <div className="right-answer row">
            <input
              type="radio"
              name="answer"
              id="radio1"
              value={this.state.proposition1}
              className="qbox"
            />
            <label htmlFor="radio1" style={{ fontStyle: "italic" }}>
              This is the right answer
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="proposition 2">Proposition 2</label>
          <input
            type="text"
            name="proposition2"
            className="qbox proposition column q-input"
            placeholder="réponse 2"
          />
           <div className="right-answer row">
          <input
            type="radio"
            name="answer"
            id="radio2"
            value={this.state.proposition2}
            className="qbox"
          />
          <label htmlFor="radio2" style={{ fontStyle: "italic" }}>
              This is the right answer
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="proposition 3">Proposition 3</label>
          <input
            type="text"
            name="proposition3"
            className="qbox proposition column q-input"
            placeholder="réponse 3"
          />
          <div className="right-answer row">
          <input
            type="radio"
            name="answer"
            id="radio3"
            value={this.state.proposition3}
            className="qbox"
          />
           <label htmlFor="radio3" style={{ fontStyle: "italic" }}>
              This is the right answer
            </label>
            </div>
        </div>
        <div>
          <label htmlFor="proposition4">Proposition 4 </label>

          <input
            type="text"
            name="proposition4"
            className="qbox proposition column q-input"
            placeholder="réponse 4"
          />
          <div className="right-answer row">
          <input
            type="radio"
            name="answer"
            id="radio4"
            value={this.state.proposition4}
            className="qbox"
          />
           <label htmlFor="radio4" style={{ fontStyle: "italic" }}>
              This is the right answer
            </label>
          </div>
        </div>

        <label htmlFor="funFact">FunFact</label>
        <input
          name="funFact"
          type="text"
          placeholder="lol"
          className="qbox q-input"
        />
        <button onClick={this.compilQuest} className=" btn validate center">
          Validate Question
        </button>
      </form>
      // </div>
    );
  }
}

export default QuestionBox;
