import React, { Component } from "react";

export class QuestionBox extends Component {
  render() {
    return (
      <div className="question-box ">
        <label htmlFor="question">Question</label>
        <input name="question" className="question column" type="text" />

        <label htmlFor="proposition">Propositions</label>

        <label htmlFor="proposition 1">Proposition 1</label>
        <input type="text" name="proposition 1" className="proposition column q-input"/>
        <label htmlFor="proposition 2">Proposition 2</label>
        <input type="text" name="proposition 2" className="proposition column q-input"/>
        <label htmlFor="proposition 3">Proposition 3</label>
        <input type="text" name="proposition 3" className="proposition column q-input"/>
        <label htmlFor="proposition 4">Proposition 4</label>
        <input type="text" name="proposition 4" className="proposition column q-input"/>
<div className="checkbox-container row">
<label htmlFor="rightAnswer">Right Answer</label>
        <input type="checkbox" name="proposition 1" id="prop1" />
        <label htmlFor="prop1">Proposition 1</label>
        <input type="checkbox" name="proposition 2" id="prop2" />
        <label htmlFor="prop2">Proposition 2</label>
        <input type="checkbox" name="proposition 3" id="prop3" />
        <label htmlFor="prop3">Proposition 3</label>
        <input type="checkbox" name="proposition 4" id="prop4" />
        <label htmlFor="prop4">Proposition 4</label>
</div>
        {/* <ol>
          <li>
            <input name="proposition" type="text" />
          </li>
          <li>
            <input name="proposition" type="text" />
          </li>
          <li>
            <input name="proposition" type="text" />
          </li>
          <li>
            <input name="proposition" type="text" />
          </li>
        </ol> */}
        {/* <label htmlFor="answer">The right answer is :</label> */}
        <label htmlFor="funFact"></label>
        <input name="funFact" type="text" />
      </div>
    );
  }
}

export default QuestionBox;
