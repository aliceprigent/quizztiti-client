import React, { Component } from "react";
import quizzHandler from "../../api/quizzHandler";

export class QuestionQuizz extends Component {
  state = {
    score: 0,
  };

  quizzAnswer = (answer) => {
    if (this.props.answered) {
      return;
    }
    if (this.props.quizz.answer === answer) {
      this.setState({ score: this.state.score + 1 }, () => {
        this.props.handleScore(this.state.score);
      });
    }
    this.props.handleAnswer(answer);
  };

  render() {
    console.log(this.props.quizz);
    const { propositions } = this.props.quizz;
    console.log(propositions);
    return (
      <div>
        <br />
        <h3 className="center proposition">{this.props.quizz.question}</h3>
        <br />
        <div>
          <section className="row center">
            <div>
              <p
                onClick={() => this.quizzAnswer(propositions[0])}
                className="proposition"
              >
                {propositions[0]}
              </p>
              <p
                onClick={() => this.quizzAnswer(propositions[1])}
                className="proposition"
              >
                {propositions[1]}
              </p>
            </div>
            <div>
              <p
                onClick={() => this.quizzAnswer(propositions[2])}
                className="proposition"
              >
                {propositions[2]}
              </p>
              <p
                onClick={() => this.quizzAnswer(propositions[3])}
                className="proposition"
              >
                {propositions[3]}
              </p>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default QuestionQuizz;
