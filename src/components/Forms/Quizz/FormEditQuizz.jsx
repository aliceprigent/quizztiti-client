import React, { Component } from "react";
import QuestionBox from "../../Forms/Quizz/QuestionBox";
import quizzHandler from "../../../api/quizzHandler";
import MiniBox from "./MiniBox";

export class FormEditQuizz extends Component {
  state = {
    image:""
  };

  componentDidMount() {
    const quizzId = this.props.match.params.id;
    console.log(quizzId);
    quizzHandler
      .getOneQuizz(quizzId)
      .then((data) => {
        console.log(data.quizzTotal);
        this.setState(
          {
            title: data.title,
            thema: data.thema,
            status: data.status,
            image: data.image,
            quizzTotal: data.quizzTotal,
          },
          () => {
            console.log(this.state.quizzTotal);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    const key = event.target.name;
    let value;

    event.target.type === "select"
      ? (value = event.target.selected)
      : (value = event.target.value);

    this.setState({ [key]: value });
    console.log(this.state);
  };

  handleImage = (event) => {
    this.setState({
      image: event.target.files[0],
      tmpImage: URL.createObjectURL(event.target.files[0]),
    },()=>{console.log(this.state.image)});
  };

  handleSubmit = (event) => {
    // const quizzId = this.props.match.params.id;
    event.preventDefault();
    console.log("submit:", this.state);
          var updQuizzData = {
        title: this.state.title,
        thema: this.state.thema,
        status: this.state.status,
        image: this.state.image,
      }

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

      var updquizzFormData = jsonToFormData(updQuizzData);

      quizzHandler
        .updateQuizz(this.props.match.params.id,updquizzFormData)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  

  render() {
    if (this.state === null) {
      return <div>...Loading</div>;
    }

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
            defaultValue={this.state.title}
            onChange={this.handleChange}
          />
          <label htmlFor="thema" className="quizz-label">
            Topic
          </label>
          <select
            name="thema"
            className="quizz-select"
            onChange={this.handleChange}
            // defaultValue={this.state.thema}
            value={this.state.thema}
          >
            <option value=""></option>
            <option value="Nature">Nature</option>
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
            value={this.state.status}
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
            id="quizz-image-label"
            onChange={this.handleImage}
          />
          <img
            className="quizz-image"
            src={this.state.tmpImage ? this.state.tmpImage : this.state.image}
            alt="Your chosen"
          />

          <div className="form-validation">
            <button className="btn">Submit</button> <br />
            <span style={{ color: "red" }}>{this.state.errors}</span>
          </div>
        </form>
        <div className="edit-question mini-box">
          {this.state.quizzTotal &&
            this.state.quizzTotal.map((question) => {
              return <MiniBox question={question} key={question._id} />;
            })}
        </div>
      </div>
    );
  }
}

export default FormEditQuizz;
