
import React, { Component } from "react";
import quizzHandler from "../../../api/quizzHandler";
import QuestionBox from "../../Forms/Quizz/QuestionBox";
export class FormCreateQuizz extends Component {
  state = {
    questionNb: 1,
    // incrémenter le compte dès qu'on appuie sur add question
    quizzTotal: [],
    //  push une question dès qu'on appuie sur add question
    fields: {},
    errors: "",
    
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

  handleImage = (event) => {
    this.setState({
      image: event.target.files[0],
      tmpImage: URL.createObjectURL(event.target.files[0]),
    });
  };

  addQuestion = (newQuest) => {
    let copy = [...this.state.quizzTotal];
    copy.push(newQuest);
    this.setState(
      {
        questionNb: this.state.questionNb + 1,
        quizzTotal: copy,
      }
      // ,this.clearInput()
      // () => console.log("step1", this.state.quizzTotal)
    );
  };

  clearInput=()=>{
this.inputTitle.value=""
  }

  handleValidation = (event) => {
    if (this.state.quizzTotal.length < 10) {
      this.setState({
        formIsValid: false,
        errors:"Your quizz must have 10 questions to be valid",        
      })
    }else{
      this.setState({formIsValid:true})
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit:", this.state);
this.handleValidation()
    if (this.state.formIsValid===true) {
      
     
      var newQuizzData = {
        title: this.state.title,
        thema: this.state.thema,
        status: this.state.status,
        image: this.state.image,
        quizzTotal: this.state.quizzTotal,
      };

      function buildFormData(formData, data, parentKey) {
        if (
          data &&
          typeof data === "object" &&
          !(data instanceof Date) &&
          !(data instanceof File)
        ) {
          Object.keys(data).forEach((key) => {
            buildFormData(
              formData,
              data[key],
              parentKey ? `${parentKey}[${key}]` : key
            );
          });
        } else {
          const value = data == null ? "" : data;

          formData.append(parentKey, value);
        }
      }

      function jsonToFormData(data) {
        const formData = new FormData();
        buildFormData(formData, data);
        return formData;
      }

      var quizzFormData = jsonToFormData(newQuizzData);

      quizzHandler
        .createQuizz(quizzFormData)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div>
        <form className="quizz-form column" onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
          <label htmlFor="thema" className="quizz-label">
            Topic
          </label>
          <select
            name="thema"
            className="quizz-select"
            onChange={this.handleChange}
          >
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
          <select
            name="status"
            className="quizz-status"
            onChange={this.handleChange}
          >
            <option value=""></option>
            <option value="Public" defaultValue>
              Public
            </option>

            <option value="Private">Private</option>
          </select>

          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="quizz-image"
            onChange={this.handleImage}
          />
          <img
            src={this.state.tmpImage}
            alt="Your chosen"
            style={{ display: !this.state.tmpImage && "none" }}
          />
          <div className="form-validation">
            <button className="btn">Submit</button> <br/>
            <span style={{ color: "red" }}>
              {this.state.errors}
            </span>
          </div>
        </form>

        <div id="question-container">
          <QuestionBox
            changeCbk={this.handleChange}
            questionNumber={this.state.questionNb}
            addCbk={this.addQuestion}
            clearCbk={this.clearInput}
          />
        </div>
      </div>
    );
  }
}

export default FormCreateQuizz;