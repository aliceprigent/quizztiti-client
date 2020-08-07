import React, { Component } from "react";
import quizzHandler from "../../../api/quizzHandler";
import QuestionBox from "../../Forms/Quizz/QuestionBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class FormCreateQuizz extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    // this.handleClick=this.fileInput.bind(this)
  }

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
  // pour cleaner les inputs apres submit une question
  clearInput = (inputArray) => {
    inputArray.forEach((input) => {
      if (input.type === "text") {
        input.value = ""
      } else {
        input.checked= false
      }
    });
  };

  handleValidation = (event) => {
    if (this.state.quizzTotal.length < 10) {
      this.setState({
        formIsValid: false,
        errors: "Your quizz must have 10 questions to be valid",
      });
    } else {
      this.setState({ formIsValid: true });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit:", this.state);
    // this.handleValidation()
    if (this.state.quizzTotal.length < 10) {
      this.setState({
        errors: "Your quizz must have 10 questions to be valid",
      });
    } else {
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
          this.props.history.push("/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleClick = () => {
    this.fileInput.current.click();
  };

  render() {
    return (
      <div className="global-quizz-form row center">
        <form
          className="quizz-form column center space-around"
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="title" className="quizz-label">
            <h2> Quizz Title</h2>
          </label>
          <input
            type="text"
            name="title"
            className="title quizz-input"
            placeholder="Short description of your quizz"
            maxLength="120"
            placeholder="Super quizz name"
            onChange={this.handleChange}
          />
          <label htmlFor="thema" className="quizz-label">
            Category
          </label>
          <select
            name="thema"
            className="quizz-select"
            onChange={this.handleChange}
          >
            <option value="Select a Category">Select a Category</option>
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
            <option value="Select a Status">Select a Status</option>
            <option value="Public" defaultValue>
              Public
            </option>
            <option value="Private">Private</option>
          </select>
          <div className="img-download center column ">
            <label htmlFor="image">Customize your quizz picture</label>
            <FontAwesomeIcon
              icon="images"
              size="4x"
              className="icon"
              onClick={this.handleClick}
            />
            <input
              type="file"
              name="image"
              id="quizz-image"
              onChange={this.handleImage}
              ref={this.fileInput}
              style={{ display: "none" }}
            />
          </div>
          <img
            src={this.state.tmpImage}
            alt="Your chosen"
            style={{ display: !this.state.tmpImage && "none" }}
            className="quizz-image"
          />

          <div className="form-validation">
            <button
              className="btn"
              style={{
                display:
                  this.state.quizzTotal.length === 10 ? "initial" : "none",
              }}
            >
              Submit
            </button>{" "}
            <br />
            <span style={{ color: "red" }}>{this.state.errors}</span>
          </div>
        </form>
        <div
          id="question-container"
          className="question-box"
          style={{
            display: this.state.quizzTotal.length === 10 ? "none" : "flow",
          }}
        >
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
