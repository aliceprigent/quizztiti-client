import React, { Component } from "react";
import quizzHandler from "../../../api/quizzHandler";
import QuestionBox from "../../Forms/Quizz/QuestionBox";

export class FormCreateQuizz extends Component {
  state = {
    questionNb: 1,
    // incrémenter le compte dès qu'on appuie sur add question
    quizzTotal: [],
    //  push une question dès qu'on appuie sur add question
  };

  handleChange = (event) => {
    const key = event.target.name;
    let value;
    if (key === "title" || key === "thema" || key === "status") {
      event.target.type === "select"
        ? (value = event.target.selected)
        : (value = event.target.value);
      this.setState({ [key]: value });
      console.log(this.state);
    }
  };

  addQuestion = (newQuest) => {
    let copy = [...this.state.quizzTotal];
    copy.push(newQuest);
    this.setState(
      {
        questionNb: this.state.questionNb + 1,
        quizzTotal: copy,
      },
      () => console.log("step1", this.state.quizzTotal)
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);

    quizzHandler
      .createQuizz(this.state)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <form
          className="quizz-form column"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="title" className="quizz-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="title quizz-input"
            placeholder="Short description of your quizz"
            maxLength="120"
            defaultValue="mon 1er quizz"
          />
          <label htmlFor="thema" className="quizz-label">
            Topic
          </label>
          <select name="thema" className="quizz-select">
            <option value=""></option>
            <option value="Nature" defaultValue>
              Nature
            </option>
            <option value="General Culture">General Culture</option>
            <option value="Health and Beauty">Health and Beauty</option>
            <option value="Celebrity">Celebrity</option>
            <option value="Society">Society</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
          <label htmlFor="status" className="status">
            Status
          </label>
          <select name="status" className="quizz-status">
            <option value=""></option>
            <option value="Public" defaultValue>
              Public
            </option>

            <option value="Private">Private</option>
          </select>

          <label htmlFor="image"></label>
          <input type="file" name="image" id="quizz-image" />

          <button className="btn">Submit</button>
        </form>

        <div id="question-container">
          <QuestionBox
            changeCbk={this.handleChange}
            questionNumber={this.state.questionNb}
            addCbk={this.addQuestion}
          />
        </div>
      </div>
    );
  }
}

export default FormCreateQuizz;
