import React, { Component } from "react";
import quizzHandler from "../api/quizzHandler.js";

export class FormCreateQuizz extends Component {
  state = {};

  render() {
    return (
      <div>
        <form className="quizz-form">
          <label htmlFor="title" className="quizz-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="quizz-input"
            placeholder="Short description of your quizz"
            maxlength="120"
          />

          <label htmlFor="thema" className="quizz-label">
            Thema
          </label>
          <select name="thema" className="quizz-select">
            <option value="Nature">Nature</option>
            <option value="General Culture">General Culture</option>
            <option value="Health and Beauty">Health and Beauty</option>
            <option value="Celebrity">Celebrity</option>
            <option value="Society">Society</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
          
          <label htmlFor="quizzTotal"></label>

          
        </form>
      </div>
    );
  }
}

export default FormCreateQuizz;
