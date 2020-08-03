import React, { Component } from "react";
import quizzHandler from "../../../api/quizzHandler";
import QuestionBox from "../../Forms/Quizz/QuestionBox";

export class FormCreateQuizz extends Component {
  state = {
   title:"",
   thema:"",
   status:"",
    quizz: [],
  };

  handleChange = (event) => {
    const key = event.target.name;
    let value;
    event.target.type === "select"
      ? (value = event.target.selected)
      : (value = event.target.value);
    this.setState({ [key]: value });
    console.log(this.state);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    // quizzHandler
    //   .createQuizz(this.state)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  addQuestion = (event) => {
    this.state.quizz.length < 11 &&
      this.setState({
        quizz: [
          ...this.state.quizz,
          <QuestionBox
            index={this.state.quizz.length}
            key={this.state.quizz.length}
            
          />,
        ],
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
          />
          <label htmlFor="thema" className="quizz-label">
            Topic
          </label>
          <select name="thema" className="quizz-select">
            <option value="" defaultValue></option>
            <option value="Nature">Nature</option>
            <option value="General Culture">General Culture</option>
            <option value="Health and Beauty">Health and Beauty</option>
            <option value="Celebrity">Celebrity</option>
            <option value="Society">Society</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
          <label htmlFor="quizzTotal">Quizz total</label>
          <div id="question-container">
            {this.state.quizz.map((child) => child)}
          </div>
          ;
          <span className="addQuestion" onClick={this.addQuestion}>
            Add a question
          </span>
          <label htmlFor="status" className="status">
            Topic
          </label>
          <select name="status" className="quizz-status">
            <option value="" defaultValue></option>
            <option value="Public">Public</option>

            <option value="Private">Private</option>
          </select>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default FormCreateQuizz;
